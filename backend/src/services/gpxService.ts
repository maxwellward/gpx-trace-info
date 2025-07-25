import { sql } from '../db';
import queue from '../queue';
import { calculateDistanceAndElevation } from '../utils/geospatial';
import osmService from './osmService';
import convert from 'xml-js';

export type TrkPtElement = {
	type: 'element';
	name: 'trkpt';
	attributes: {
		lat: string;
		lon: string;
	};
	elements: [
		{
			type: 'element';
			name: 'ele';
			elements: [{ type: 'text'; text: string }];
		},
		{
			type: 'element';
			name: 'time';
			elements: [{ type: 'text'; text: string }];
		}
	];
};

type Visibility = 'public' | 'private' | 'trackable' | 'identifiable';

export interface OsmTraceMetadata {
	id: number;
	name: string;
	uid: number;
	user: string;
	visibility: string;
	pending: boolean;
	timestamp: Date;
	lat: number;
	lon: number;
	description: string;
	tags: string[];
	token?: string;
}

interface TraceMetadataExtended {
	id: number;
	user_id: number;
	filename: string;
	description: string;
	distance: number; // meters
	elevation_gain: number; // meters
	average_speed: number; // m/s
	duration: number; // seconds
	points: number;
	start_point: { lat: number; lon: number };
	end_point: { lat: number; lon: number };
	visibility: Visibility;
	uploaded_at: Date;
	geom: string;
}

interface LightTrace {
	id: number;
	filename: string;
	description: string;
	distance: number;
	points: number;
	visibility: Visibility;
	uploaded_at: Date;
}

export class GpxService {
	async processGpxFile(traceMeta: OsmTraceMetadata) {
		try {
			if (!traceMeta.token) throw new Error('Token missing from trace metadata');
			const xml = await osmService.getGpxTraceData(traceMeta.id, traceMeta.token);
			const json = convert.xml2json(xml);

			const parsed = JSON.parse(json);
			const trkseg = parsed.elements
				?.find((el: any) => el.name === 'gpx')
				?.elements?.find((el: any) => el.name === 'trk')
				?.elements?.find((el: any) => el.name === 'trkseg');

			const points: TrkPtElement[] = trkseg.elements;

			// Both in meters
			const { distance, elevationGain, lineString } = calculateDistanceAndElevation(points);

			const startLoc = { lat: Number(points[0].attributes.lat), lon: Number(points[0].attributes.lon) };
			const endLoc = { lat: Number(points[points.length - 1].attributes.lat), lon: Number(points[points.length - 1].attributes.lon) };

			const startTime = new Date(points[0].elements[1].elements[0].text);
			const endTime = new Date(points[points.length - 1].elements[1].elements[0].text);
			const duration = (endTime.getTime() - startTime.getTime()) / 1000; // duration in seconds
			const averageSpeed = distance / duration;

			const newMeta: TraceMetadataExtended = {
				id: traceMeta.id,
				user_id: traceMeta.uid,
				filename: traceMeta.name,
				description: traceMeta.description,
				distance,
				elevation_gain: elevationGain,
				average_speed: averageSpeed,
				duration,
				points: points.length,
				start_point: startLoc,
				end_point: endLoc,
				visibility: traceMeta.visibility as Visibility,
				uploaded_at: traceMeta.timestamp,
				geom: lineString,
			};

			await sql`
				INSERT INTO gpx_files (
				id,
				user_id,
				filename,
				description,
				distance,
				elevation_gain,
				average_speed,
				duration,
				points,
				start_point,
				end_point,
				visibility,
				uploaded_at,
				geom
				) VALUES (
				${newMeta.id},
				${newMeta.user_id},
				${newMeta.filename},
				${newMeta.description},
				${newMeta.distance},
				${newMeta.elevation_gain},
				${newMeta.average_speed},
				${newMeta.duration},
				${newMeta.points},
				ST_SetSRID(ST_Point(${newMeta.start_point.lon}, ${newMeta.start_point.lat}), 4326),
				ST_SetSRID(ST_Point(${newMeta.end_point.lon}, ${newMeta.end_point.lat}), 4326),
				${newMeta.visibility},
				${newMeta.uploaded_at},
				ST_GeomFromText(${newMeta.geom}, 4326)
				)
				ON CONFLICT (id) DO UPDATE SET
				user_id = EXCLUDED.user_id,
				filename = EXCLUDED.filename,
				description = EXCLUDED.description,
				distance = EXCLUDED.distance,
				elevation_gain = EXCLUDED.elevation_gain,
				average_speed = EXCLUDED.average_speed,
				duration = EXCLUDED.duration,
				points = EXCLUDED.points,
				start_point = EXCLUDED.start_point,
				end_point = EXCLUDED.end_point,
				visibility = EXCLUDED.visibility,
				uploaded_at = EXCLUDED.uploaded_at
			`;

			return;
		} catch (error) {
			console.error(error);
		}
	}

	async syncGpxTraces(token: string) {
		const { traces } = await osmService.getGpxTraces(token);

		traces.forEach((traceMeta: OsmTraceMetadata) => {
			queue.add('download', { ...traceMeta, token });
		});
	}

	async getGpxTraces(uid: number): Promise<LightTrace[]> {
		const result = await sql`
			SELECT id, filename, description, distance, points, visibility, uploaded_at 
			FROM gpx_files 
			WHERE user_id = ${uid}
		`;

		return result.map((row) => ({
			id: row.id,
			filename: row.filename,
			description: row.description,
			distance: row.distance,
			points: row.points,
			visibility: row.visibility as Visibility,
			uploaded_at: row.uploaded_at,
		}));
	}

	async getGpxTrace(uid: number, tid: number): Promise<TraceMetadataExtended> {
		const result = await sql`
			SELECT 
				id,
				user_id,
				filename,
				description,
				distance,
				elevation_gain,
				average_speed,
				duration,
				points,
				ST_X(start_point) as start_lon,
				ST_Y(start_point) as start_lat,
				ST_X(end_point) as end_lon,
				ST_Y(end_point) as end_lat,
				visibility,
				uploaded_at,
				ST_AsText(geom) as geom
			FROM gpx_files
			WHERE user_id = ${uid} AND id = ${tid}
		`;

		if (result.length === 0) throw Error('No results');

		return {
			id: result[0].id,
			user_id: result[0].user_id,
			filename: result[0].filename,
			description: result[0].description,
			distance: result[0].distance,
			elevation_gain: result[0].elevation_gain,
			average_speed: result[0].average_speed,
			duration: result[0].duration,
			points: result[0].points,
			visibility: result[0].visibility as Visibility,
			uploaded_at: result[0].uploaded_at,
			geom: result[0].geom,
			start_point: { lat: result[0].start_lat, lon: result[0].start_lon },
			end_point: { lat: result[0].end_lat, lon: result[0].end_lon },
		};
	}
}

export default new GpxService();

import { TrkPtElement } from '../services/gpxService';

export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
	const toRad = (deg: number): number => (deg * Math.PI) / 180;
	const R = 6371e3; // Earth radius in meters

	const φ1 = toRad(lat1);
	const φ2 = toRad(lat2);
	const Δφ = toRad(lat2 - lat1);
	const Δλ = toRad(lon2 - lon1);

	const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // in meters
};

type GpxPoint = {
	lat: number;
	lon: number;
};

export const calculateDistanceAndElevation = (
	points: TrkPtElement[]
): {
	distance: number;
	elevationGain: number;
	lineString: string;
} => {
	let totalDistance = 0;
	let totalElevationGain = 0;

	const getElevation = (pt: TrkPtElement): number => {
		const eleElement = pt.elements.find((e) => e.name === 'ele');
		if (eleElement?.elements?.[0]?.type === 'text') {
			return parseFloat(eleElement.elements[0].text);
		}
		return 0;
	};

	const pointLocations: GpxPoint[] = [];
	for (let i = 1; i < points.length; i++) {
		const prev = points[i - 1];
		const curr = points[i];

		const lat1 = parseFloat(prev.attributes.lat);
		const lon1 = parseFloat(prev.attributes.lon);
		const lat2 = parseFloat(curr.attributes.lat);
		const lon2 = parseFloat(curr.attributes.lon);

		pointLocations.push({ lat: lat1, lon: lon1 });

		const dist = haversineDistance(lat1, lon1, lat2, lon2);
		totalDistance += dist;

		const ele1 = getElevation(prev);
		const ele2 = getElevation(curr);

		const deltaEle = ele2 - ele1;
		if (deltaEle > 0) {
			totalElevationGain += deltaEle;
		}
	}

	const coords = pointLocations.map((p) => `${p.lon} ${p.lat}`).join(', ');
	const lineString = `LINESTRING(${coords})`;

	return {
		distance: totalDistance,
		elevationGain: totalElevationGain,
		lineString,
	};
};

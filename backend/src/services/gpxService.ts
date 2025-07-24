export interface TraceMetadata {
	id: number;
	name: string;
	uid: number;
	user: string;
	visibility: string;
	pending: boolean;
	timestamp: string;
	lat: number;
	lon: number;
	description: string;
	tags: string[];
}

import queue from '../queue';
import osmService from './osmService';

export class GpxService {
	// Mock methods - add your implementation

	async processGpxFile(fileData: any) {
		console.log('Processing GPX file:', fileData);
		return { processed: true };
	}

	async validateGpx(gpxData: any) {
		console.log('Validating GPX data');
		return { valid: true };
	}

	async syncGpxTraces(token: string) {
		const { traces } = await osmService.getGpxTraces(token);

		traces.forEach((trace: TraceMetadata) => {
			console.log('adding trace to download queue');

			queue.add('download', trace);
		});
	}
}

export default new GpxService();

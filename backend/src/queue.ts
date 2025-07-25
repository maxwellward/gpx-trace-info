import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import gpxService from './services/gpxService';

const downloadQueue = new Queue('downloads');

export const queue = {
	add: (jobName: string, data: any) => {
		downloadQueue.add(jobName, data);
	},
};

const connection = new IORedis({ maxRetriesPerRequest: null });
const worker = new Worker(
	'downloads',
	async (job) => {
		const startTime = new Date().getTime();
		await gpxService.processGpxFile(job.data);
		const endTime = new Date().getTime();
		console.log(`Processed GPX trace ${job.data.id} in ${(endTime - startTime) / 1000}s`);
		return;
	},
	{ connection, concurrency: 2 }
);

export default queue;

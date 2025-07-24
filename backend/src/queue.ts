import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const downloadQueue = new Queue('downloads');

export const queue = {
	// Mock queue implementation
	add: (jobName: string, data: any) => {
		downloadQueue.add(jobName, data);
	},
};

const connection = new IORedis({ maxRetriesPerRequest: null });
const worker = new Worker(
	'downloads',
	async (job) => {
		console.log(job.data);
	},
	{ connection }
);

export default queue;

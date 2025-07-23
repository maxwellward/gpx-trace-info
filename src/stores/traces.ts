import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export enum TraceVisibility {
	PRIVATE = 'private',
	PUBLIC = 'public',
	TRACKABLE = 'trackable',
	IDENTIFIABLE = 'identifiable'
}

export interface OSMTrace {
	file: File,
	description: string,
	tags: string[],
	visibility: TraceVisibility,
}

export const useTraceStore = defineStore('traces', () => {
	const authStore = useAuthStore();

	const upload = async (trace: OSMTrace) => {
		try {
			// TODO: Add auth token to axios middleware
			await axios.post(import.meta.env.VITE_OSM_API_BASE_URI + '/gpx', {
				file: trace.file,
				description: trace.description,
				tags: 'GPXS,' + trace.tags.toString(),
				visibility: trace.visibility
			}, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `Bearer ${authStore.accessToken}`
				}
			})
			// TODO: toast
		} catch (err) {
			// TODO: Toast
			console.error(err);
		}
	}

	return {
		upload
	}
})

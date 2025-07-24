import axios, { AxiosInstance } from 'axios';

export function createHttpClient(baseURL: string, timeout: number = 10000): AxiosInstance {
	return axios.create({
		baseURL,
		timeout,
	});
}

const osmClient = createHttpClient(process.env.OSM_BASE_URI || 'https://master.apis.dev.openstreetmap.org/api/0.6');

export default osmClient;

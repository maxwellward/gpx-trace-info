import osmClient from '../utils/osmClient';

export class OsmApiService {
	async validateOSMToken(token: string): Promise<{ id: number; username: string }> {
		const { data } = await osmClient.get('/user/details', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return {
			id: data.user.id,
			username: data.user.display_name,
		};
	}

	async getGpxTraces(token: string): Promise<any> {
		const { data } = await osmClient.get('/user/gpx_files', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return data;
	}

	async getGpxTraceData(id: number, token: string): Promise<any> {
		try {
			const { data } = await osmClient.get(`/gpx/${id}/data`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return data;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
}

export default new OsmApiService();

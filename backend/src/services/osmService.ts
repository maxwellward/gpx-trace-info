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
}

export default new OsmApiService();

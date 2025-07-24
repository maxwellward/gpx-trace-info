import osmClient from '../utils/osmClient';

export class OsmApiService {
	async validateOSMToken(token: string): Promise<boolean> {
		try {
			const response = await osmClient.get('/user/details', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			return true;
			// return response;
		} catch (error) {
			return false;
		}
	}
}

export default new OsmApiService();

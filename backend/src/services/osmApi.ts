// OSM API service
// Add your OpenStreetMap API logic here

export class OsmApiService {
  // Mock methods - add your implementation
  
  async getReverseGeocode(lat: number, lon: number) {
    console.log(`Getting reverse geocode for ${lat}, ${lon}`);
    return { display_name: 'Mock location' };
  }
}

export default new OsmApiService();

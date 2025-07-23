// GPX processing job
// Add your background job logic here

export class GpxProcessor {
  // Mock methods - add your implementation
  
  async processGpxJob(jobData: any) {
    console.log('Processing GPX job:', jobData);
    return { success: true };
  }
}

export default new GpxProcessor();

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function gpxRoutes(fastify: FastifyInstance) {
  // GET /api/gpx
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('GET /api/gpx');
    return { traces: [] };
  });

  // GET /api/gpx/:id
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    console.log(`GET /api/gpx/${id}`);
    return { id, name: 'Mock GPX Trace' };
  });

  // POST /api/gpx/upload
  fastify.post('/upload', async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('POST /api/gpx/upload', 'File upload');
    return { id: '456', uploaded: true };
  });

  // POST /api/gpx/:id/process
  fastify.post('/:id/process', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    console.log(`POST /api/gpx/${id}/process`);
    return { id, processing: true };
  });

  // DELETE /api/gpx/:id
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    console.log(`DELETE /api/gpx/${id}`);
    return { id, deleted: true };
  });
}

export default gpxRoutes;

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function userRoutes(fastify: FastifyInstance) {
  // GET /api/users
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('GET /api/users');
    return { users: [] };
  });

  // GET /api/users/:id
  fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    console.log(`GET /api/users/${id}`);
    return { id, name: 'Mock User' };
  });

  // POST /api/users
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('POST /api/users', request.body);
    return { id: '123', created: true };
  });

  // PUT /api/users/:id
  fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    console.log(`PUT /api/users/${id}`, request.body);
    return { id, updated: true };
  });

  // DELETE /api/users/:id
  fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    console.log(`DELETE /api/users/${id}`);
    return { id, deleted: true };
  });
}

export default userRoutes;

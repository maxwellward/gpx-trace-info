import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { sql } from '../../db';
import userService from '../../services/userService';
import gpxService from '../../services/gpxService';

// Authentication middleware
async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
	const token = request.headers.authorization;

	if (!token) {
		return reply.status(401).send({ error: 'Access token required' });
	}

	try {
		// Check if token exists in database
		const result = await sql`
      SELECT * FROM user_tokens WHERE token = ${token}
    `;

		if (result.length === 0) {
			return reply.status(403).send({ error: 'Invalid or expired token' });
		}
	} catch (error) {
		console.error('Token validation error:', error);
		return reply.status(500).send({ error: 'Internal server error' });
	}
}

async function gpxRoutes(fastify: FastifyInstance) {
	fastify.addHook('preHandler', authenticateToken);

	// GET /api/gpx
	fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
		const token = request.headers.authorization;
		// This can safely be asserted because this route has gone through the authentication middleware
		const uid = await userService.getUserIdFromToken(token!);
		const traces = await gpxService.getGpxTraces(uid);
		return { traces };
	});

	// GET /api/gpx/:id
	fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
		const token = request.headers.authorization;
		const { id } = request.params;
		// This can safely be asserted because this route has gone through the authentication middleware
		const uid = await userService.getUserIdFromToken(token!);
		const trace = await gpxService.getGpxTrace(uid, id);
		return { trace };
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

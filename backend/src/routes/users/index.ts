import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserDto, CreateUserResponse, createUserResponseSchema, createUserSchema } from './schema/create-user-schema';
import userService from '../../services/userService';
import osmService from '../../services/osmService';
import { SyncUserDto, syncUserResponseSchema, syncUserSchema } from './schema/sync-user-schema';
import gpxService from '../../services/gpxService';

async function userRoutes(fastify: FastifyInstance) {
	// GET /api/users/:id
	fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
		const { id } = request.params;
		console.log(`GET /api/users/${id}`);
		return { id, name: 'Mock User' };
	});

	// POST /api/users
	fastify.post<{
		Body: CreateUserDto;
		Reply: CreateUserResponse;
	}>(
		'/',
		{
			schema: {
				...createUserSchema,
				...createUserResponseSchema,
			},
		},
		async (request: FastifyRequest<{ Body: CreateUserDto }>, reply) => {
			try {
				const userData = await osmService.validateOSMToken(request.body.token);
				await userService.createUser(request.body.token, userData.id, userData.username);
				return reply.code(201).send();
			} catch (error) {
				fastify.log.error(error);
				return reply.code(500).send();
			}
		}
	);

	// POST /api/users/sync
	fastify.post<{
		Body: SyncUserDto;
	}>(
		'/sync',
		{
			schema: {
				...syncUserSchema,
				...syncUserResponseSchema,
			},
		},
		async (request: FastifyRequest<{ Body: SyncUserDto }>, reply) => {
			try {
				await osmService.validateOSMToken(request.body.token);
				await gpxService.syncGpxTraces(request.body.token);
				return reply.code(201).send();
			} catch (error) {
				fastify.log.error(error);
				return reply.code(500).send();
			}
		}
	);

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

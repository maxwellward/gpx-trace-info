import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserDto, CreateUserResponse, createUserResponseSchema, createUserSchema } from './schema';
import userService from '../../services/userService';
import osmService from '../../services/osmService';

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

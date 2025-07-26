import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserDto, CreateUserResponse, createUserResponseSchema, createUserSchema } from './schema/create-user-schema';
import userService from '../../services/userService';
import osmService from '../../services/osmService';
import { SyncUserDto, syncUserResponseSchema, syncUserSchema } from './schema/sync-user-schema';
import gpxService from '../../services/gpxService';

async function userRoutes(fastify: FastifyInstance) {
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
				const { id } = await osmService.validateOSMToken(request.body.token);
				const canSync = await gpxService.canSync(id);
				if (!canSync) return reply.code(429).send();
				await gpxService.syncGpxTraces(request.body.token);
				return reply.code(201).send();
			} catch (error) {
				fastify.log.error(error);
				return reply.code(500).send();
			}
		}
	);
}

export default userRoutes;

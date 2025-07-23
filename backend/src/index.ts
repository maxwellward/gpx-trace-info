import Fastify from 'fastify';
import cors from '@fastify/cors';
import userRoutes from './routes/users/index';
import gpxRoutes from './routes/gpx/index';

const fastify = Fastify({
  logger: true
});

async function start() {
  try {
    // Register CORS
    await fastify.register(cors, {
      origin: true
    });

    // Register routes
    await fastify.register(userRoutes, { prefix: '/api/users' });
    await fastify.register(gpxRoutes, { prefix: '/api/gpx' });

    // Health check route
    fastify.get('/health', async (request, reply) => {
      return { status: 'ok' };
    });

    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const host = '0.0.0.0';

    await fastify.listen({ port, host });
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();

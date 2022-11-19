/* eslint-disable import/no-unresolved */
import Fastify from 'fastify';
import userRoutes from './routes/user';

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(userRoutes);

  fastify.post('/login/', () => {});

  fastify.post('/transactions/:cashInAccountUsername', () => {});

  fastify.get('/transactions/:accountId', () => {});

  await fastify.listen({ port: 3000 });
}

start();

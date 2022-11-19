/* eslint-disable import/no-unresolved */
import Fastify from 'fastify';
import transactionRoutes from './routes/transactions';
import userRoutes from './routes/user';

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(userRoutes);

  await fastify.register(transactionRoutes);

  fastify.get('/transactions/:accountId', () => {});

  await fastify.listen({ port: 3000 });
}

start();

/* eslint-disable import/no-unresolved */
import Fastify from 'fastify';
import loginRoutes from './routes/login';
import transactionRoutes from './routes/transactions';
import userRoutes from './routes/user';

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(userRoutes);

  await fastify.register(loginRoutes);

  await fastify.register(transactionRoutes);

  await fastify.listen({ port: 3000 });
}

start();

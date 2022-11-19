/* eslint-disable import/no-unresolved */
import Fastify from 'fastify';
import { z } from 'zod';
import prisma from './lib/prisma';
import { compare } from './plugins/bcrypt';
import { createToken } from './plugins/jwt';
import userRoutes from './routes/user';

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(userRoutes);

  fastify.post('/transactions/:cashInAccountUsername', () => {});

  fastify.get('/transactions/:accountId', () => {});

  await fastify.listen({ port: 3000 });
}

start();

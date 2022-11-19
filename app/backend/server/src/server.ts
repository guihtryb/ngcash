import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';

const prisma = new PrismaClient({
  log: ['query'],
});

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get('/users', async () => {
    const users = await prisma.user.findMany();
    return { users };
  });

  await fastify.listen({ port: 3000 });
}

start();

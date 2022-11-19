/* eslint-disable import/no-unresolved */
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma';
import authenticate from '../plugins/authenticate';

async function accountRoutes(fastify: FastifyInstance) {
  fastify.get('/accounts/:id/balance', async (request, reply) => {
    const { authorization } = request.headers;

    const getAccountParams = z.object({
      id: z.string().regex(/^[0-9]+$/, 'Id deve ser um número'),
    });

    try {
      const validToken = authenticate(authorization);

      if (!validToken) {
        return reply.status(401).send({ message: 'Token inválido' });
      }

      const { id } = getAccountParams.parse(request.params);

      const account = await prisma.account.findUnique({
        where: {
          id: +id,
        },
      });

      if (!account) {
        return reply.status(400).send({
          message: 'Nenhuma conta encontrada com este id',
        });
      }

      return reply.status(201).send({
        balance: account.balance,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: error.issues[0].message,
        });
      }

      return reply.status(500).send({
        message: 'Erro interno',
      });
    }
  });
}

export default accountRoutes;

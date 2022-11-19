/* eslint-disable import/no-unresolved */
import { Account } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { compare } from '../plugins/bcrypt';
import { createToken } from '../plugins/jwt';

async function loginRoutes(fastify: FastifyInstance) {
  fastify.post('/login', async (request, reply) => {
    const createLoginParms = z.object({
      username: z.string(),
      password: z.string(),
    });

    try {
      const { username, password } = createLoginParms.parse(request.body);

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return reply.status(401).send({
          message: 'Usuário inexistente',
        });
      }

      const passwordMatch = compare(password, user.password as string);

      if (!passwordMatch) {
        return reply.status(400).send({
          message: 'Senha incorreta',
        });
      }

      const account = await prisma.account.findUnique({
        where: {
          userId: user.id,
        },
      }) as Account;

      const userWithBalance = {
        ...user,
        balance: account.balance,
      };

      const token = createToken(user);

      return reply.status(200).send({
        user: userWithBalance,
        token,
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

export default loginRoutes;

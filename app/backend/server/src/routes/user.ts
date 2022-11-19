/* eslint-disable import/no-unresolved */
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { hash } from '../plugins/bcrypt';
import exclude from '../utils/exclude';

interface UserResponse {
  id: number,
  username: string,
  password?: string | null,
}

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    const createUserParms = z.object({
      username: z.string().min(3, 'Nome de usuário deve ter no mínimo 3 caracteres'),
      password: z.string()
        .regex(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/, 'Senha deve conter 1 número, 1 letra maiúscula e 8 caracteres'),
    });

    try {
      const { username, password } = createUserParms.parse(request.body);

      const userAlreadyExists: UserResponse | null = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userAlreadyExists) {
        return reply.status(400).send({
          message: 'Nome de usário já em uso',
        });
      }

      const users = await prisma.user.findMany();

      const newUser = await prisma.user.create({
        data: {
          username,
          password: await hash(password, 12),
          accountId: users.length + 1,
        },
      });

      await prisma.account.create({
        data: {
          balance: 100,
          userId: newUser.id,
        },
      });

      const newUserWithoutPassword = exclude(newUser, ['password']);

      return reply.status(201).send({
        user: newUserWithoutPassword,
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

export default userRoutes;

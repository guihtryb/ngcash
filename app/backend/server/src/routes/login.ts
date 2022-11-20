/* eslint-disable import/no-unresolved */
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { compare } from '../plugins/bcrypt';
import { createToken } from '../plugins/jwt';
import exclude from '../utils/exclude';

async function loginRoutes(fastify: FastifyInstance) {
  fastify.post('/login', async (request, reply) => {
    const createLoginBody = z.object({
      username: z.string().min(3, 'Nome de usuário deve ter no mínimo 3 caracteres'),
      password: z.string().regex(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/, 'Senha deve conter 1 número, 1 letra maiúscula e 8 caracteres'),
    });

    try {
      const { username, password } = createLoginBody.parse(request.body);

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

      const passwordMatch = await compare(
        password,
        user.password as string,
      );

      if (!passwordMatch) {
        return reply.status(400).send({
          message: 'Senha incorreta',
        });
      }

      const userWithoutPass = exclude(user, ['password']);

      const token = createToken(user);

      return reply.status(200).send({
        user: userWithoutPass,
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

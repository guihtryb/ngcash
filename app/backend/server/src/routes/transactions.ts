/* eslint-disable import/no-unresolved */
import { Account, User } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import prisma from '../lib/prisma';
import authenticate from '../plugins/authenticate';

const newBalance = (
  previousBalance: number,
  value: number,
  operation: 'plus' | 'minus',
): number => {
  if (operation === 'plus') {
    return ((previousBalance * 100) + (value * 100)) / 100;
  }
  return ((previousBalance * 100) - (value * 100)) / 100;
};

async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post('/transactions/:cashOutAccountUsername/to/:cashInAccountUsername', async (request, reply) => {
    const { authorization } = request.headers;

    const createTransactionParams = z.object({
      cashOutAccountUsername: z.string(),
      cashInAccountUsername: z.string().min(3),
    });

    const createTransactionBody = z.object({
      value: z.number(),
    });

    try {
      const validToken = authenticate(authorization);

      if (!validToken) {
        return reply.status(401).send({ message: 'Token inválido' });
      }

      const { cashOutAccountUsername, cashInAccountUsername } = createTransactionParams
        .parse(request.params);

      const { value } = createTransactionBody
        .parse(request.body);

      if (cashInAccountUsername === cashOutAccountUsername) {
        return reply.status(400).send({
          message: 'Não é possível fazer transações para a própria conta',
        });
      }

      const debitedUser = await prisma.user.findUnique({
        where: {
          username: cashOutAccountUsername,
        },
      }) as User;

      const creditedUser = await prisma.user.findUnique({
        where: {
          username: cashInAccountUsername,
        },
      });

      if (!creditedUser) {
        return reply.status(404).send({
          message: 'Nenhum usuário com este username',
        });
      }

      const creditedAccount = await prisma.account.findUnique({
        where: {
          userId: creditedUser.id,
        },
      });

      const debitedAccount = await prisma.account.findUnique({
        where: {
          userId: debitedUser.id,
        },
      }) as Account;

      if (!creditedAccount) {
        return reply.status(404).send({
          message: 'Nenhuma conta atrelada a este usuário',
        });
      }

      await prisma.account.update({
        where: {
          userId: creditedUser.id,
        },
        data: {
          balance: newBalance(+creditedAccount.balance, value, 'plus'),
        },
      });

      await prisma.account.update({
        where: {
          userId: debitedUser.id,
        },
        data: {
          balance: newBalance(+creditedAccount.balance, value, 'minus'),
        },
      });

      const transaction = await prisma.transaction.create({
        data: {
          value,
          debitedAccountId: debitedAccount.id,
          creditedAccountId: creditedAccount.id,
        },
      });

      return reply.status(201).send({
        transaction,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: error.issues[0].message,
        });
      }
      return reply.status(400).send({
        message: 'Erro interno',
      });
    }
  });

  fastify.get('/transactions/:accountId', async (request, reply) => {
    const { authorization } = request.headers;

    const getTransactionsParams = z.object({
      accountId: z.string().regex(/^[0-9]+$/, 'Id deve ser um número'),
    });

    try {
      const validToken = authenticate(authorization);

      if (!validToken) {
        return reply.status(401).send({ message: 'Token inválido' });
      }

      const { accountId } = getTransactionsParams.parse(request.params);

      const transactions = await prisma.transaction.findMany({
        where: {
          OR: [
            {
              creditedAccountId: +accountId,
            },
            {
              debitedAccountId: +accountId,
            },
          ],
        },
        include: {
          cashInAccount: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          cashOutAccount: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      const transactionsReply = transactions.map((transaction) => {
        const day = transaction.createdAt.getDate();
        const month = transaction.createdAt.getMonth() + 1;
        const year = transaction.createdAt.getFullYear();

        const dateFormated = `${day}/${month}/${year}`;

        const transactionFormated = {
          cashInAccount: transaction.cashInAccount.user.username,
          cashOutAccount: transaction.cashOutAccount.user.username,
          createdAt: dateFormated,
          id: transaction.id,
          value: +transaction.value,
        };

        return transactionFormated;
      });

      return reply.status(200).send({ transactions: transactionsReply });
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

export default transactionRoutes;

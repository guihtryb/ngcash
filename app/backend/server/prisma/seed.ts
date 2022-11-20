import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      id: 1,
      username: 'JhonDoe',
      password: 'Secret01',
      accountId: 1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 2,
      username: 'JhonHendrix',
      password: 'Secret02',
      accountId: 2,
    },
  });

  const account1 = await prisma.account.create({
    data: {
      id: 1,
      balance: 100,
      userId: user1.id,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      id: 2,
      balance: 100,
      userId: user2.id,
    },
  });

  await prisma.transaction.create({
    data: {
      value: 20,
      creditedAccountId: account2.id,
      debitedAccountId: account1.id,
    },
  });

  await prisma.transaction.create({
    data: {
      value: 20,
      creditedAccountId: account1.id,
      debitedAccountId: account2.id,
    },
  });
}

main();

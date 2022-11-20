import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      id: 1,
      username: 'JhonDoe',
      password: '$2a$12$tSn.ijlirFPx3BtXMAI.jOUTonMpgu5FMtQazMrxf8lX/PexXbi/K',
      accountId: 1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 2,
      username: 'JhonHendrix',
      password: '$2a$12$d6LBXEPG0SFzbIHMYSxM0.0/CgvUzyMoicVARjRboQ9hs.HmMIg1O',
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
      createdAt: new Date('2022-09-18T09:24:00'),
    },
  });

  await prisma.transaction.create({
    data: {
      value: 20,
      creditedAccountId: account1.id,
      debitedAccountId: account2.id,
      createdAt: new Date('2022-09-20T09:24:00'),
    },
  });
}

main();

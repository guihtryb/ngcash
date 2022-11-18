import React from 'react';
import Header from '../components/Header';
import MakeTransferSection from '../components/MakeTransferSection';
import { TransferItemProps } from '../components/TransferItem';
import UserTransfersSection from '../components/UserTransfersSection';

const transfersMock: TransferItemProps[] = [
  {
    id: 0,
    debitedAccount: 'currentUser',
    creditedAccount: 'creditedUser',
    value: 20.50,
    createdAt: '25/09/2022',
  },
  {
    id: 1,
    debitedAccount: 'currentUser',
    creditedAccount: 'ceditedUser',
    value: 23,
    createdAt: '20/09/2022',
  },
];

export default function Home() {
  const [usernameText, setUsernameText] = React.useState('');
  const [userBalance, setUserBalance] = React.useState(0.0);
  const [userTransfers, setUserTransfers] = React.useState([] as TransferItemProps[]);
  const [transferDone, setTransferDone] = React.useState(false);

  const getUserUsername = async () => setUsernameText('Guih');
  const getUserBalance = async () => setUserBalance(0.0);
  const getUserTransfers = async () => setUserTransfers(transfersMock);

  React.useEffect(() => {
    getUserUsername();
    getUserBalance();
    getUserTransfers();
  }, []);

  React.useEffect(() => {
    getUserBalance();
    getUserTransfers();
  }, [transferDone]);

  return (
    <div>
      <Header usernameText={usernameText} userBalance={userBalance} />

      <main>
        <MakeTransferSection setTransferDone={setTransferDone} />
        {
          userTransfers && <UserTransfersSection transfers={userTransfers} />
        }
      </main>
    </div>

  );
}

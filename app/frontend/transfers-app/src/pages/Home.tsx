import React from 'react';
import Header from '../components/Header/Header';
import MakeTransferSection from '../components/MakeTransferSection/MakeTransferSection';
import { TransferItemProps } from '../components/TransferItem';
import UserTransfersSection from '../components/UserTransfersSection';

export const transfersMock: TransferItemProps[] = [
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
    creditedAccount: 'creditedUser',
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
  const getUserBalance = async (value: number) => setUserBalance(value);
  const getUserTransfers = async () => setUserTransfers(transfersMock);

  React.useEffect(() => {
    getUserUsername();
    getUserBalance(200);
    getUserTransfers();
  }, []);

  React.useEffect(() => {
    getUserTransfers();
  }, [transferDone]);

  return (
    <div>
      <Header usernameText={usernameText} userBalance={userBalance} />

      <main className="page">
        <div className="container">
          <MakeTransferSection
            setTransferDone={setTransferDone}
            userBalance={userBalance}
            setUserBalance={setUserBalance}
          />
          {
          userTransfers && <UserTransfersSection transfers={userTransfers} />
        }
        </div>

      </main>
    </div>

  );
}

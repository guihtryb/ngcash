import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import MakeTransferSection from '../components/MakeTransferSection/MakeTransferSection';
import { TransferItemProps } from '../components/TransferItem';
import UserTransfersSection from '../components/UserTransfersSection/UserTransfersSection';
import accountService from '../services/accounts';
import transactionService from '../services/transactions';

export const transfersMock: TransferItemProps[] = [
  {
    id: 0,
    cashInAccount: 'currentUser',
    cashOutAccount: 'creditedUser',
    value: 20.50,
    createdAt: '25/09/2022',
  },
  {
    id: 1,
    cashInAccount: 'currentUser',
    cashOutAccount: 'creditedUser',
    value: 23,
    createdAt: '20/09/2022',
  },
];

interface UserData {
  user: {
    id: number,
    username: string,
    accountId: number,
    balance: string,
  }
  token: string,
}

export const getUserData = () => {
  const userData = localStorage.getItem('user');

  if (userData === null) {
    return false;
  }

  return JSON.parse(userData) as UserData;
};

export default function Home() {
  const navigate = useNavigate();
  const [usernameText, setUsernameText] = React.useState('');
  const [userBalance, setUserBalance] = React.useState(0.0);
  const [userTransfers, setUserTransfers] = React.useState([] as TransferItemProps[]);
  const [transferDone, setTransferDone] = React.useState(false);

  const loadUserTransactions = async () => {
    const userData = getUserData();

    if (userData) {
      const { user: { accountId }, token } = userData;
      const headers = { Authorization: token };
      const { transactions } = await transactionService.getTransactions(accountId, { headers });
      setUserTransfers(transactions);
    }
  };

  const loadUserBalance = async () => {
    const userData = getUserData();

    if (userData) {
      const { user: { accountId }, token } = userData;
      const headers = { Authorization: token };
      const { balance } = await accountService.getAccountBalance(accountId, { headers });
      setUserBalance(balance);
    }
  };

  React.useEffect(() => {
    const userData = getUserData();

    if (userData) {
      const { user: { balance, username } } = userData;

      setUserBalance(+balance);
      setUsernameText(username);
      loadUserTransactions();
      loadUserBalance();
    } else {
      navigate('/login');
    }
  }, []);

  React.useEffect(() => {
    loadUserTransactions();
    loadUserBalance();
  }, [transferDone]);

  return (
    <div>
      <Header usernameText={usernameText} userBalance={userBalance} />

      <main className="page">
        <div className="container">
          <MakeTransferSection
            setTransferDone={setTransferDone}
            userBalance={userBalance}
          />
          {
          userTransfers && <UserTransfersSection transfers={userTransfers} />
        }
        </div>

      </main>
    </div>

  );
}

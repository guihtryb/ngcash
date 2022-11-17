import React from 'react';
import Header from '../components/Header';
import MakeTransferSection from '../components/MakeTransferSection';
import UserTransfersSection from '../components/UserTransfersSection';

export default function Home() {
  const [usernameText, setUsernameText] = React.useState('');
  const [userBalance, setUserBalance] = React.useState(0.0);

  const getUserUsername = async () => setUsernameText('Guih');
  const getUserBalance = async () => setUserBalance(0.0);

  React.useEffect(() => {
    getUserUsername();
    getUserBalance();
  }, []);

  return (
    <div>
      <Header usernameText={usernameText} userBalance={userBalance} />

      <main>
        <MakeTransferSection />
        <UserTransfersSection />
      </main>
    </div>

  );
}

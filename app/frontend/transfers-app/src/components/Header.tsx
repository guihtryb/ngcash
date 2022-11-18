import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button/Button';

interface HeaderProps {
  usernameText: string,
  userBalance: number,
}

export default function Header({ usernameText, userBalance }: HeaderProps) {
  const navigate = useNavigate();

  const logOut = () => {
    navigate('/login');
  };

  return (
    <header>
      <span>
        Transfers App
      </span>
      <span data-testid="user-username-info">
        {`Olá, ${usernameText}!`}
      </span>
      <span data-testid="user-balance-info">
        {`Saldo: ${userBalance}`}
      </span>
      <Button testId="button-log-out" text="Sair" handleClick={logOut} type="button" />
    </header>

  );
}

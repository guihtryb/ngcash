import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

import './index.css';

interface HeaderProps {
  usernameText: string,
  userBalance: number,
}

export default function Header({ usernameText, userBalance }: HeaderProps) {
  const navigate = useNavigate();

  const logOut = () => navigate('/login');

  return (
    <header>
      <div className="col-1">
        <span>
          Transfers App
        </span>
        <span data-testid="user-username-info">
          {`Olá, ${usernameText}!`}
        </span>
        <span
          data-testid="user-balance-info"
          className="balance-info"
        >
          {`Saldo: R$ ${userBalance}`}
        </span>
      </div>
      <Button testId="button-log-out" text="Sair" handleClick={logOut} type="button" />
    </header>

  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';

const loginInputs = [
  {
    labelText: 'Email',
    type: 'email',
    name: 'input-login-email',
    id: 'input-login-email',
    placeholder: 'adalovelace@email.com',
    testId: 'input-login-email',
  },
  {
    labelText: 'Password',
    type: 'password',
    name: 'input-login-password',
    id: 'input-login-password',
    placeholder: 'password',
    testId: 'input-login-password',
  },
];

export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main>
      <h1>Login</h1>
      <Form
        handleSubmit={handleSubmit}
        inputs={loginInputs}
        btnTestId="button-login"
        btnText="Entrar"
      />
      <p>
        Ainda não possui uma conta?
        {' '}
        <Link to="/register">Registre-se.</Link>
      </p>
    </main>
  );
}

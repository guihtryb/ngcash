import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';

const registerInputs = [
  {
    labelText: 'Email',
    type: 'email',
    name: 'input-register-email',
    id: 'input-register-email',
    placeholder: 'adalovelace@email.com',
    testId: 'input-register-email',
  },
  {
    labelText: 'Password',
    type: 'password',
    name: 'input-register-password',
    id: 'input-register-password',
    placeholder: 'password',
    testId: 'input-register-password',
  },
];

export default function register() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main>
      <h1>Registro</h1>
      <Form
        handleSubmit={handleSubmit}
        inputs={registerInputs}
        btnTestId="button-register"
        btnText="Registrar"
      />
      <p>
        Já possui uma conta?
        {' '}
        <Link to="/login">Log In.</Link>
      </p>
    </main>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import { InputOnChange } from '../types';

const registerInputs = [
  {
    labelText: 'Email',
    type: 'email',
    name: 'input-register-email',
    id: 'input-register-email',
    placeholder: 'adalovelace@email.com',
    testId: 'input-register-email',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
  {
    labelText: 'Password',
    type: 'password',
    name: 'input-register-password',
    id: 'input-register-password',
    placeholder: 'password',
    testId: 'input-register-password',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
];

export default function register() {
  return (
    <main>
      <h1>Registrar</h1>
      <Form
        testId="form-register"
        btnTestId="button-register"
        btnText="Registrar"
        inputs={registerInputs}
      />
      <p>
        Já possui uma conta?
        {' '}
        <Link to="/login" data-testid="link-login">Log In.</Link>
      </p>
    </main>
  );
}

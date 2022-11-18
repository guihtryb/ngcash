import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { InputOnChange } from '../../types';

import './index.css';

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
  const navigate = useNavigate();

  const validateRegister = (email: string, password: string): boolean => {
    if (email && password) return true;
    return false;
  };

  const doRegister = async (email: string, password: string) => {
    const valid: boolean = validateRegister(email, password);

    if (valid) navigate('/home');
  };

  const handleSubmit = (e: React.FormEvent, formsData: {[field: string]: string}) => {
    e.preventDefault();
    const { email, password } = formsData;

    doRegister(email, password);
  };

  return (
    <main className="page">
      <div className="container register">
        <h1 className="title">Registrar</h1>
        <Form
          testId="form-register"
          btnTestId="button-register"
          btnText="Registrar"
          inputs={registerInputs}
          handleSubmit={handleSubmit}
        />
        <p className="sub">
          Já possui uma conta?
          {' '}
          <Link to="/login" data-testid="link-login">Log In.</Link>
        </p>
      </div>
    </main>
  );
}

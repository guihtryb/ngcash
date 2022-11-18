import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { InputOnChange } from '../../types';

import './index.css';

const loginInputs = [
  {
    labelText: 'Email',
    type: 'email',
    name: 'email',
    id: 'input-login-email',
    placeholder: 'adalovelace@email.com',
    testId: 'input-login-email',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
  {
    labelText: 'Password',
    type: 'password',
    name: 'password',
    id: 'input-login-password',
    placeholder: 'password',
    testId: 'input-login-password',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const validateLogin = (email: string, password: string): boolean => {
    if (email && password) return true;
    return false;
  };

  const doLogin = async (email: string, password: string) => {
    const valid: boolean = validateLogin(email, password);

    if (valid) navigate('/home');
  };

  const handleSubmit = (e: React.FormEvent, formsData: {[field: string]: string}) => {
    e.preventDefault();
    const { email, password } = formsData;

    doLogin(email, password);
  };

  return (
    <main className="page">
      <div className="container login">
        <h1 className="title">Login</h1>
        <Form
          testId="form-login"
          btnTestId="button-login"
          btnText="Entrar"
          inputs={loginInputs}
          handleSubmit={handleSubmit}
        />
        <p className="sub">
          Ainda não possui uma conta?
          {' '}
          <Link to="/register" data-testid="link-register">Registre-se.</Link>
        </p>
      </div>
    </main>
  );
}

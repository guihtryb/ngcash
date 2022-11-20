import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { HandleAxiosError } from '../../components/MakeTransferSection/MakeTransferSection';
import loginService from '../../services/login';
import { InputOnChange } from '../../types';
import passwordValidation from '../../utils/validations';

import './index.css';

const loginInputs = [
  {
    labelText: 'Username',
    type: 'text',
    name: 'username',
    id: 'input-login-username',
    placeholder: 'Username',
    testId: 'input-login-username',
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
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const navigate = useNavigate();

  const validateLogin = (username: string, password: string): boolean => {
    if (!username || username.length < 3) {
      setFeedbackMessage('Insira um username válido!');
      return false;
    }

    const validPassword = passwordValidation(password);

    if (!validPassword) {
      setFeedbackMessage('Senha inválida');
      return false;
    }

    return true;
  };

  const doLogin = async (username: string, password: string) => {
    try {
      const valid: boolean = validateLogin(username, password);

      if (valid) {
        const userLogin = await loginService.login({ username, password });
        localStorage.setItem('user', JSON.stringify(userLogin));
        navigate('/home');
      }
    } catch (error) {
      setFeedbackMessage((error as HandleAxiosError).response.data.message);
    }
  };

  const handleSubmit = (e: React.FormEvent, formsData: {[field: string]: string}) => {
    e.preventDefault();
    const { username, password } = formsData;

    doLogin(username, password);
  };

  return (
    <main className="page">
      <div className="login">
        <h1 className="title">Login</h1>
        <Form
          testId="form-login"
          btnTestId="button-login"
          btnText="Entrar"
          inputs={loginInputs}
          handleSubmit={handleSubmit}
        />
        {
          feedbackMessage && (<p className="sub">{feedbackMessage}</p>)
        }
        <p className="sub">
          Ainda não possui uma conta?
          {' '}
          <Link to="/register" data-testid="link-register">Registre-se.</Link>
        </p>
      </div>
    </main>
  );
}

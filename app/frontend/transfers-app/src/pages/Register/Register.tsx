import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import { HandleAxiosError } from '../../components/MakeTransferSection/MakeTransferSection';
import loginService from '../../services/login';
import userService from '../../services/users';
import { InputOnChange } from '../../types';
import passwordValidation from '../../utils/validations';

import './index.css';

const registerInputs = [
  {
    labelText: 'Username',
    type: 'text',
    name: 'username',
    id: 'input-register-username',
    placeholder: 'Username',
    testId: 'input-register-username',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
  {
    labelText: 'Password',
    type: 'password',
    name: 'password',
    id: 'input-register-password',
    placeholder: 'password',
    testId: 'input-register-password',
    onChange: () => null as unknown as InputOnChange,
    value: '',
  },
];

export default function register() {
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const navigate = useNavigate();

  const validateRegister = (username: string, password: string): boolean => {
    if (!username || username.length < 3) {
      setFeedbackMessage('Nome do usuário deve ter no mínimo 3 caracteres');
      return false;
    }

    const validPassword = passwordValidation(password);

    if (!validPassword) {
      setFeedbackMessage(
        'Senha deve conter no mínimo 8 dígitos, tendo ao menos 1 número e 1 letra maiúscula.',
      );
      return false;
    }

    return true;
  };

  const doRegister = async (username: string, password: string) => {
    const valid: boolean = validateRegister(username, password);

    try {
      if (valid) {
        await userService.createUser({ username, password });

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

    doRegister(username, password);
  };

  return (
    <main className="page">
      <div className="register">
        <h1 className="title">Registrar</h1>
        <Form
          testId="form-register"
          btnTestId="button-register"
          btnText="Registrar"
          inputs={registerInputs}
          handleSubmit={handleSubmit}
        />
        {
          feedbackMessage && (<p className="sub">{feedbackMessage}</p>)
        }
        <p className="sub">
          Já possui uma conta?
          {' '}
          <Link to="/login" data-testid="link-login">Log In.</Link>
        </p>
      </div>
    </main>
  );
}

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';

describe('Login page', () => {
  it('has a Login title', () => {
    const screen = render(<Login />, { wrapper: MemoryRouter });

    const title = screen.getByRole('heading', { level: 1, name: 'Login' });

    expect(title.textContent).toBe('Login');
  });
  it('has a login form with username, password fields and submit button', () => {
    const screen = render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('form-login')).toBeInTheDocument();
    expect(screen.getByTestId('input-login-username')).toBeInTheDocument();
    expect(screen.getByTestId('input-login-password')).toBeInTheDocument();
    expect(screen.getByTestId('button-login')).toBeInTheDocument();
  });
  it('has a link to register page', () => {
    const screen = render(<Login />, { wrapper: MemoryRouter });

    const registerLink = screen.getByTestId('link-register');
    expect(registerLink).toHaveTextContent(/registre-se/i);
  });
});

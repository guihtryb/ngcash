/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register/Register';

describe('Register page', () => {
  it('has a Register title', () => {
    const screen = render(<Register />, { wrapper: MemoryRouter });

    const title = screen.getByRole('heading', { level: 1, name: 'Registrar' });

    expect(title.textContent).toBe('Registrar');
  });
  it('has a Register form with email, password fields and submit button', () => {
    const screen = render(<Register />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('form-register')).toBeInTheDocument();
    expect(screen.getByTestId('input-register-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-register-password')).toBeInTheDocument();
    expect(screen.getByTestId('button-register')).toBeInTheDocument();
  });
  it('has a link to login page', () => {
    const screen = render(<Register />, { wrapper: MemoryRouter });

    const registerLink = screen.getByTestId('link-login');
    expect(registerLink).toHaveTextContent(/log in/i);
  });
});

import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <label htmlFor="input-login-email">
          <input
            type="email"
            name="input-login-email"
            id="input-login-email"
            data-testid="input-login-email"
          />
        </label>
        <label htmlFor="input-login-password">
          <input
            type="password"
            name="input-login-password"
            id="input-login-password"
            data-testid="input-login-password"
          />
          <button type="submit">
            Entrar
          </button>
        </label>
      </form>
      <p>
        Ainda não possui uma conta?
        {' '}
        <Link to="/register">Registre-se</Link>
      </p>
    </main>
  );
}

/* eslint-disable import/no-unresolved */
import { verifyToken } from './jwt';

const authenticate = (token: string | undefined) => {
  if (!token) return false;

  const validToken = verifyToken(token);

  if (!validToken) return false;

  return true;
};

export default authenticate;

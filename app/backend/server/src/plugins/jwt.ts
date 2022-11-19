import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.SECRET as string || 'TRANSFERS_APP';

interface IUserTokenData {
  id: number;
  username: string;
}

const createToken = (userData: IUserTokenData) => jwt.sign(
  { data: userData },
  secret,
  {
    expiresIn: '1d',
    algorithm: 'HS256',
  },
);

const verifyToken = (token: string) => jwt.verify(token, secret);

export {
  createToken,
  verifyToken,
};

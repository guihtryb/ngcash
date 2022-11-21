import { UserData } from '../interfaces';

const getUserData = () => {
  const userData = localStorage.getItem('user');

  if (userData === null) {
    return false;
  }

  return JSON.parse(userData) as UserData;
};

export default getUserData;

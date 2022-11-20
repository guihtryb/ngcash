import {
  API_BASE,
  basicPostRequisition,
} from '.';

const loginService = {
  login: async (data: object) => basicPostRequisition(API_BASE, 'login', data),
};

export default loginService;

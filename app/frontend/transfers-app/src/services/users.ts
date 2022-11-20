import {
  API_BASE,
  basicPostRequisition,
} from '.';

const userService = {
  createUser: async (data: object) => basicPostRequisition(API_BASE, 'users', data),
};

export default userService;

import {
  API_BASE,
  basicGetRequisition,
} from '.';

const accountService = {
  getAccountBalance: async (accountId: number, headers: object) => basicGetRequisition(API_BASE, `accounts/${accountId}/balance`, headers),
};

export default accountService;

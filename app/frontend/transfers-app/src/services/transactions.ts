import {
  API_BASE,
  basicGetRequisition,
} from '.';

const transactionsService = {
  getTransactions: async (id:number, headers: object) => basicGetRequisition(API_BASE, `transactions/${id}`, headers),
};

export default transactionsService;

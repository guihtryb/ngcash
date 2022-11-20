import {
  API_BASE,
  basicGetRequisition,
  PostRequisitionWithHeaders,
} from '.';

const transactionService = {
  getTransactions: async (id:number, headers: object) => basicGetRequisition(API_BASE, `transactions/${id}`, headers),
  postTransaction: async (
    cashOutUsername: string,
    cashInUsername: string,
    data: object,
    headers: object,
  ) => PostRequisitionWithHeaders(
    API_BASE,
    `transactions/${cashOutUsername}/to/${cashInUsername}`,
    data,
    headers,
  ),
};

export default transactionService;

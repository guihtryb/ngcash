import axios from 'axios';

export const API_BASE = 'http://localhost:3000/';

export const basicPostRequisition = (baseUrl: string, route: string, data: object) => axios
  .post(`${baseUrl}${route}`, data)
  .then((res) => res.data);

export const basicGetRequisition = (baseUrl: string, route: string, headers: object) => axios
  .get(`${baseUrl}${route}`, headers)
  .then((res) => res.data);

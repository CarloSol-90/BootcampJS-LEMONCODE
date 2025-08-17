import axios from "axios";
import { MovementApiModel } from "./movements.api-model";

const baseURL = "http://localhost:3002";

export const getMovements = async (accountId: string): Promise<MovementApiModel[]> => {
  const { data } = await axios.get<MovementApiModel[]>(`${baseURL}/api/movements`, {
    params: { accountId }
  });
  return data;
};

export const getAccount = async (accountId: string) => {
  const { data } = await axios.get(`${baseURL}/api/account-list/${accountId}`);
  return data;
};

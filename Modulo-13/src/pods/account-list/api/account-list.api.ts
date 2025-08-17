import axios from "axios";
import { AccountApiModel } from "./account-list.api-model";

const baseURL = "http://localhost:3002";

export const getAccountList = async (): Promise<AccountApiModel[]> => {
  const { data } = await axios.get<AccountApiModel[]>(`${baseURL}/api/account-list`);
  return data;
};

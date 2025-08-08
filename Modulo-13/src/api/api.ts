import axios from "axios";
import { Movement, Account } from "./api-model";

const baseURL = import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL,
  timeout: 5000,
});

// API para cuentas
export const getAccountList = (): Promise<Account[]> =>
  apiClient.get<Account[]>("/account-list").then(({ data }) => data);

export const getAccount = (id: string): Promise<Account> =>
  apiClient.get<Account>(`/account-list/${id}`).then(({ data }) => data);

export const getMovements = (accountId: string): Promise<Movement[]> =>
  apiClient.get<Movement[]>("/movements", { 
    params: { accountId } 
  }).then(({ data }) => data);

// API para transferencias
export const createTransfer = (transferData: any): Promise<any> =>
  apiClient.post("/transfer", transferData).then(({ data }) => data);

import { AccountApiModel } from "./api";
import { Account } from "./account-list.vm";

export const mapAccountFromApiToVm = (account: AccountApiModel): Account => ({
  id: account.id,
  iban: account.iban,
  type: account.type,
  name: account.name,
  balance: account.balance,
  lastTransaction: account.lastTransaction,
});

export const mapAccountListFromApiToVm = (accountList: AccountApiModel[]): Account[] =>
  accountList.map(mapAccountFromApiToVm);

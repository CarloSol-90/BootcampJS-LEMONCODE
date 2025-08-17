export interface MovementApiModel {
  id: string;
  accountId: string;
  transaction: string;
  realTransaction: string;
  description: string;
  amount: number;
  balance: number;
}

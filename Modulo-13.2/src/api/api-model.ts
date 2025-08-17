export interface Movement {
  id: string;
  accountId: string;
  transaction: string;
  realTransaction: string;
  description: string;
  amount: number;
  balance: number;
}

export interface Account {
  id: string;
  iban: string;
  type: string;
  name: string;
  balance: number;
  lastTransaction: string;
}

export interface CreateAccountRequest {
  type: string;
  name: string;
}

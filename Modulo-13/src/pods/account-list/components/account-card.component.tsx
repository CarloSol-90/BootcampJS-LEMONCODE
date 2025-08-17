import React from 'react';
import { Account } from '../account-list.vm';

interface Props {
  account: Account;
  onAccountSelected: (accountId: string) => void;
}

export const AccountCard: React.FC<Props> = ({ account, onAccountSelected }) => {
  const handleClick = () => {
    onAccountSelected(account.id);
  };

  return (
    <div className="account-card" onClick={handleClick}>
      <h3>{account.name}</h3>
      <p className="account-type">{account.type}</p>
      <p className="account-iban">{account.iban}</p>
      <div className="account-balance">
        <span className="balance-label">Saldo disponible</span>
        <span className="balance-amount">{account.balance.toFixed(2)} €</span>
      </div>
    </div>
  );
};

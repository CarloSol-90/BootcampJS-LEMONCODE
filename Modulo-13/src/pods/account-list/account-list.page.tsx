import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from './account-list.vm';
import { getAccountList } from './api';
import { mapAccountListFromApiToVm } from './account-list.mapper';
import { AccountCard } from './components';

export const AccountListPage: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const apiAccounts = await getAccountList();
        const accounts = mapAccountListFromApiToVm(apiAccounts);
        setAccounts(accounts);
      } catch (error) {
        console.error('Error loading accounts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAccounts();
  }, []);

  const handleAccountSelected = (accountId: string) => {
    navigate(`/movements/${accountId}`);
  };

  if (loading) {
    return <div className="loading">Cargando cuentas...</div>;
  }

  return (
    <div className="account-list-page">
      <h1>Mis Cuentas</h1>
      
      <div className="accounts-grid">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onAccountSelected={handleAccountSelected}
          />
        ))}
      </div>
    </div>
  );
};

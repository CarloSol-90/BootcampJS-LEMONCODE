import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountList } from '../api/api';
import { Account } from '../api/api-model';

export const AccountListPage: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const accountList = await getAccountList();
        setAccounts(accountList);
      } catch (error) {
        console.error('Error loading accounts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAccounts();
  }, []);

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  if (loading) {
    return <div className="loading">Cargando cuentas...</div>;
  }

  return (
    <div className="account-list-page">
      <h1>Mis Cuentas</h1>
      
      {accounts.length > 0 && (
        <div className="accounts-grid">
          {accounts.map((account) => (
            <div key={account.id} className="account-card">
              <h3>{account.name}</h3>
              <p className="account-type">{account.type}</p>
              <p className="account-iban">{account.iban}</p>
              <p className="account-balance">
                Saldo: {account.balance.toFixed(2)} €
              </p>
            </div>
          ))}
        </div>
      )}
      
      <div className="add-account-section">
        <button 
          className="btn-add-account"
          onClick={handleCreateAccount}
        >
          AGREGAR NUEVA CUENTA
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movement } from './movements.vm';
import { getMovements, getAccount } from './api';
import { mapMovementListFromApiToVm } from './movements.mapper';
import { MovementRow } from './components';

export const MovementsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/account-list');
      return;
    }

    const loadData = async () => {
      try {
        const [apiMovements, accountData] = await Promise.all([
          getMovements(id),
          getAccount(id)
        ]);
        
        const movements = mapMovementListFromApiToVm(apiMovements);
        setMovements(movements);
        setAccount(accountData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id, navigate]);

  const handleBackToAccounts = () => {
    navigate('/account-list');
  };

  if (loading) {
    return <div className="loading">Cargando movimientos...</div>;
  }

  if (!account) {
    return <div className="error">Cuenta no encontrada</div>;
  }

  return (
    <div className="movements-page">
      <button onClick={handleBackToAccounts} className="back-button">
        ← Volver a mis cuentas
      </button>
      
      <h1>Movimientos</h1>
      
      <div className="account-info">
        <div className="account-header">
          <div className="account-title">
            <h2>{account.name}</h2>
            <div className="account-details">
              <span>IBAN: {account.iban}</span>
              <span>Tipo: {account.type}</span>
            </div>
          </div>
          <div className="balance-info">
            <span className="balance-label">Saldo disponible</span>
            <span className="balance-amount">{account.balance?.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      <div className="movements-table">
        <table>
          <thead>
            <tr>
              <th>FECHA</th>
              <th>FECHA VALOR</th>
              <th>DESCRIPCIÓN</th>
              <th>IMPORTE</th>
              <th>SALDO</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <MovementRow key={movement.id} movement={movement} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

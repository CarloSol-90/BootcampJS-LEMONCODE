import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Movement, Account } from '../api/api-model';
import { getMovements, getAccount } from '../api/api';

// Mock data para desarrollo (cuando no hay servidor)
const mockAccount: Account = {
  id: "1",
  iban: "ES91 2100 0418 4502 0005 1332",
  type: "1",
  name: "Gastos mes",
  balance: 1490,
  lastTransaction: "2019-12-09T21:30:00.000Z"
};

const mockMovements: Movement[] = [
  {
    id: "1",
    accountId: "1",
    transaction: "2019-12-09T21:30:00.000Z",
    realTransaction: "2019-12-09T21:30:00.000Z",
    description: "Nómina noviembre",
    amount: 900,
    balance: 1490
  },
  {
    id: "2",
    accountId: "1",
    transaction: "2019-12-07T14:20:00.000Z",
    realTransaction: "2019-12-08T14:20:00.000Z",
    description: "Alquiler noviembre",
    amount: -400,
    balance: 590
  },
  {
    id: "3",
    accountId: "1",
    transaction: "2019-12-01T09:15:00.000Z",
    realTransaction: "2019-12-02T09:15:00.000Z",
    description: "Gastos móvil",
    amount: -24,
    balance: 990
  }
];

export const MovementsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [account, setAccount] = useState<Account | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Intentar cargar desde la API
        const [accountData, movementsData] = await Promise.all([
          getAccount(id),
          getMovements(id)
        ]);
        
        setAccount(accountData);
        setMovements(movementsData);
      } catch (err) {
        console.warn('Error loading from API, using mock data:', err);
        // Si falla la API, usar datos mock
        setAccount(mockAccount);
        setMovements(mockMovements);
        setError('Usando datos de ejemplo (servidor no disponible)');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  const formatAmount = (amount: number) => {
    const isNegative = amount < 0;
    const formattedAmount = `${Math.abs(amount)} €`;
    return isNegative ? `-${formattedAmount}` : formattedAmount;
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!account) {
    return <div className="error">No se pudo cargar la información de la cuenta</div>;
  }

  return (
    <div className="movements-page">
      <h1>Movement List</h1>
      
      {error && (
        <div className="info-message" style={{ padding: '1rem', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px', marginBottom: '1rem' }}>
          ℹ️ {error}
        </div>
      )}
      
      <div className="account-info">
        <div className="account-header">
          <div className="account-title">
            <h2>Saldos y Últimos movimientos</h2>
            <div className="account-details">
              <span className="account-alias">Alias: {account.name}</span>
              <span className="account-iban">IBAN: {account.iban}</span>
            </div>
          </div>
          <div className="balance-info">
            <span className="balance-label">SALDO DISPONIBLE</span>
            <span className="balance-amount">{account.balance} €</span>
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
              <th>SALDO DISPONIBLE</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td>{formatDate(movement.transaction)}</td>
                <td>{formatDate(movement.realTransaction)}</td>
                <td>{movement.description}</td>
                <td className={movement.amount < 0 ? 'amount-negative' : 'amount-positive'}>
                  {formatAmount(movement.amount)}
                </td>
                <td>{movement.balance} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

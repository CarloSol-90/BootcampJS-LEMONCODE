import React from 'react';
import { Movement } from '../movements.vm';

interface Props {
  movement: Movement;
}

export const MovementRow: React.FC<Props> = ({ movement }) => {
  const formatAmount = (amount: number) => {
    const className = amount > 0 ? 'amount-positive' : 'amount-negative';
    const sign = amount > 0 ? '+' : '';
    return <span className={className}>{sign}{amount.toFixed(2)} €</span>;
  };

  return (
    <tr>
      <td>{movement.transaction}</td>
      <td>{movement.realTransaction}</td>
      <td>{movement.description}</td>
      <td>{formatAmount(movement.amount)}</td>
      <td>{movement.balance.toFixed(2)} €</td>
    </tr>
  );
};

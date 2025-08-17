import { MovementApiModel } from "./api";
import { Movement } from "./movements.vm";

export const mapMovementFromApiToVm = (movement: MovementApiModel): Movement => ({
  id: movement.id,
  accountId: movement.accountId,
  transaction: movement.transaction,
  realTransaction: movement.realTransaction,
  description: movement.description,
  amount: movement.amount,
  balance: movement.balance,
});

export const mapMovementListFromApiToVm = (movements: MovementApiModel[]): Movement[] =>
  movements.map(mapMovementFromApiToVm);

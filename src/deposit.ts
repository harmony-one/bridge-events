import { Returned } from "../generated/Deposit/Deposit";
import { ReturnedEvent } from "../generated/schema";

export function handleReturnedDeposit(event: Returned): void {
  let id = event.transaction.from.toHex();
  let retEvent = new ReturnedEvent(id);
  retEvent.recipient = event.params.recipient;
  retEvent.amount = event.params.amount;
  retEvent.save();
}

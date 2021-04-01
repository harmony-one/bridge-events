import { Locked, Unlocked } from "../generated/BUSDEthManager/BUSDEthManager";
import { LockedEvent, UnlockedEvent } from "../generated/schema";

export function handleUnlock(event: Unlocked): void {
  let id = event.transaction.from.toHex();
  let mintEvent = new UnlockedEvent(id);
  mintEvent.ethToken = event.params.ethToken;
  mintEvent.amount = event.params.amount;
  mintEvent.recipient = event.params.recipient;
  mintEvent.receiptId = event.params.receiptId;
  mintEvent.eventName = "Unlocked";
  mintEvent.save();
}

export function handleLock(event: Locked): void {
  let id = event.transaction.from.toHex();
  let burnEvent = new LockedEvent(id);
  burnEvent.token = event.params.token;
  burnEvent.sender = event.params.sender;
  burnEvent.amount = event.params.amount;
  burnEvent.recipient = event.params.recipient;
  burnEvent.eventName = "Locked";
  burnEvent.save();
}

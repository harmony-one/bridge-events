import { Locked, Unlocked } from "../generated/BUSDEthManager-1/BUSDEthManager";
import { LockedEvent, UnlockedEvent } from "../generated/schema";

export function handleUnlock(event: Unlocked): void {
  let id = event.transaction.from.toHex();
  let unlockEvent = new UnlockedEvent(id);
  unlockEvent.ethToken = event.params.ethToken;
  unlockEvent.amount = event.params.amount;
  unlockEvent.recipient = event.params.recipient;
  unlockEvent.receiptId = event.params.receiptId;
  unlockEvent.eventName = "Unlocked";
  unlockEvent.contractAddress = event.address;
  unlockEvent.save();
}

export function handleLock(event: Locked): void {
  let id = event.transaction.from.toHex();
  let lockEvent = new LockedEvent(id);
  lockEvent.token = event.params.token;
  lockEvent.sender = event.params.sender;
  lockEvent.amount = event.params.amount;
  lockEvent.recipient = event.params.recipient;
  lockEvent.eventName = "Locked";
  lockEvent.contractAddress = event.address;
  lockEvent.save();
}

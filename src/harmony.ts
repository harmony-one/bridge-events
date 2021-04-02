import { Minted, Burned } from "../generated/BUSDHmyManager-1/BUSDHmyManager";
import { Returned } from "../generated/Deposit-1/Deposit";
import { MintedEvent, BurnedEvent, ReturnedEvent } from "../generated/schema";

export function handleMint(event: Minted): void {
  let id = event.transaction.from.toHex();
  let mintEvent = new MintedEvent(id);
  mintEvent.oneToken = event.params.oneToken;
  mintEvent.amount = event.params.amount;
  mintEvent.recipient = event.params.recipient;
  mintEvent.receiptId = event.params.receiptId;
  mintEvent.eventName = "Minted";
  mintEvent.contractAddress = event.address;
  mintEvent.save();
}

export function handleBurn(event: Burned): void {
  let id = event.transaction.from.toHex();
  let burnEvent = new BurnedEvent(id);
  burnEvent.token = event.params.token;
  burnEvent.sender = event.params.sender;
  burnEvent.amount = event.params.amount;
  burnEvent.recipient = event.params.recipient;
  burnEvent.eventName = "Burned";
  burnEvent.contractAddress = event.address;
  burnEvent.save();
}

export function handleReturnedDeposit(event: Returned): void {
  let id = event.transaction.from.toHex();
  let retEvent = new ReturnedEvent(id);
  retEvent.recipient = event.params.recipient;
  retEvent.amount = event.params.amount;
  retEvent.eventName = "Returned";
  retEvent.save();
}

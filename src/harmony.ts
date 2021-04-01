import {
  Minted as BMinted,
  Burned as BBurned,
} from "../generated/BUSDHmyManager/BUSDHmyManager";

import { MintedEvent, BurnedEvent } from "../generated/schema";

export function handleMint(event: BMinted): void {
  let id = event.transaction.from.toHex();
  let mintEvent = new MintedEvent(id);
  mintEvent.oneToken = event.params.oneToken;
  mintEvent.amount = event.params.amount;
  mintEvent.recipient = event.params.recipient;
  mintEvent.receiptId = event.params.receiptId;
  mintEvent.save();
}

export function handleBurn(event: BBurned): void {
  let id = event.transaction.from.toHex();
  let burnEvent = new BurnedEvent(id);
  burnEvent.token = event.params.token;
  burnEvent.sender = event.params.sender;
  burnEvent.amount = event.params.amount;
  burnEvent.recipient = event.params.recipient;
  burnEvent.save();
}

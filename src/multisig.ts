import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import {
  Confirmation,
  Deposit,
  Execution,
  ExecutionFailure,
  MultiSigWallet,
  OwnerAddition,
  OwnerRemoval,
  RequirementChange,
  Revocation,
  Submission,
} from "../generated/MultiSigWallet-1/MultiSigWallet";

import {
  ConfirmationEvent,
  DepositEvent,
  RevocationEvent,
  ExecutionEvent,
  ExecutionFailureEvent,
  OwnerAdditionEvent,
  OwnerRemovalEvent,
  RequirementChangeEvent,
  SubmissionEvent,
  EventTransaction,
} from "../generated/schema";

function getTransaction(
  transactionId: BigInt,
  event: ethereum.Event
): EventTransaction {
  let multiSigWallet = MultiSigWallet.bind(event.address);
  let transaction = multiSigWallet.try_transactions(transactionId);
  let ts = new EventTransaction(transactionId.toString());
  if (!transaction.reverted) {
    ts.destination = transaction.value.value0;
    ts.value = transaction.value.value1;
    ts.data = transaction.value.value2;
    ts.executed = transaction.value.value3;
  }
  ts.save();
  return ts;
}

export function handleConfirmation(event: Confirmation): void {
  let id = event.transaction.from.toHex();
  let confirmEvent = new ConfirmationEvent(id);
  confirmEvent.sender = event.params.sender;
  confirmEvent.transactionId = event.params.transactionId;
  let transaction = getTransaction(event.params.transactionId, event);
  confirmEvent.transaction = transaction.id;
  confirmEvent.eventName = "Confirmation";
  confirmEvent.contractAddress = event.address;
  confirmEvent.save();
}

export function handleDeposit(event: Deposit): void {
  let id = event.transaction.from.toHex();
  let depEvent = new DepositEvent(id);
  depEvent.sender = event.params.sender;
  depEvent.value = event.params.value;
  depEvent.eventName = "Deposit";
  depEvent.contractAddress = event.address;
  depEvent.save();
}

export function handleExecution(event: Execution): void {
  let id = event.transaction.from.toHex();
  let execEvent = new ExecutionEvent(id);
  execEvent.transactionId = event.params.transactionId;
  let transaction = getTransaction(event.params.transactionId, event);
  execEvent.transaction = transaction.id;
  execEvent.eventName = "Execution";
  execEvent.contractAddress = event.address;
  execEvent.save();
}

export function handleExecutionFailure(event: ExecutionFailure): void {
  let id = event.transaction.from.toHex();
  let execFailEvent = new ExecutionFailureEvent(id);
  execFailEvent.transactionId = event.params.transactionId;
  let transaction = getTransaction(event.params.transactionId, event);
  execFailEvent.transaction = transaction.id;
  execFailEvent.eventName = "ExecutionFailure";
  execFailEvent.contractAddress = event.address;
  execFailEvent.save();
}

export function handleOwnerAddition(event: OwnerAddition): void {
  let id = event.transaction.from.toHex();
  let ownEvent = new OwnerAdditionEvent(id);
  ownEvent.owner = event.params.owner;
  ownEvent.eventName = "OwnerAddition";
  ownEvent.contractAddress = event.address;
  ownEvent.save();
}

export function handleOwnerRemoval(event: OwnerRemoval): void {
  let id = event.transaction.from.toHex();
  let ownRemEvent = new OwnerRemovalEvent(id);
  ownRemEvent.owner = event.params.owner;
  ownRemEvent.eventName = "OwnerRemoval";
  ownRemEvent.contractAddress = event.address;
  ownRemEvent.save();
}

export function handleRequirementChange(event: RequirementChange): void {
  let id = event.transaction.from.toHex();
  let reqChangeEvent = new RequirementChangeEvent(id);
  reqChangeEvent.required = event.params.required;
  reqChangeEvent.eventName = "RequirementChange";
  reqChangeEvent.contractAddress = event.address;
  reqChangeEvent.save();
}

export function handleRevocation(event: Revocation): void {
  let id = event.transaction.from.toHex();
  let revocEvent = new RevocationEvent(id);
  revocEvent.sender = event.params.sender;
  revocEvent.transactionId = event.params.transactionId;
  let transaction = getTransaction(event.params.transactionId, event);
  revocEvent.transaction = transaction.id;
  revocEvent.eventName = "Revocation";
  revocEvent.contractAddress = event.address;
  revocEvent.save();
}

export function handleSubmission(event: Submission): void {
  let id = event.transaction.from.toHex();
  let submiEvent = new SubmissionEvent(id);
  submiEvent.transactionId = event.params.transactionId;
  let transaction = getTransaction(event.params.transactionId, event);
  submiEvent.transaction = transaction.id;
  submiEvent.eventName = "Submission";
  submiEvent.contractAddress = event.address;
  submiEvent.save();
}

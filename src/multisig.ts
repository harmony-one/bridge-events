import {
  Confirmation,
  Deposit,
  Execution,
  ExecutionFailure,
  OwnerAddition,
  OwnerRemoval,
  RequirementChange,
  Revocation,
  Submission,
} from "../generated/MultiSigWallet/MultiSigWallet";

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
} from "../generated/schema";

export function handleConfirmation(event: Confirmation): void {
  let id = event.transaction.from.toHex();
  let confirmEvent = new ConfirmationEvent(id);
  confirmEvent.sender = event.params.sender;
  confirmEvent.transactionId = event.params.transactionId;
  confirmEvent.save();
}

export function handleDeposit(event: Deposit): void {
  let id = event.transaction.from.toHex();
  let depEvent = new DepositEvent(id);
  depEvent.sender = event.params.sender;
  depEvent.value = event.params.value;
  depEvent.save();
}

export function handleExecution(event: Execution): void {
  let id = event.transaction.from.toHex();
  let execEvent = new ExecutionEvent(id);
  execEvent.transactionId = event.params.transactionId;
  execEvent.save();
}

export function handleExecutionFailure(event: ExecutionFailure): void {
  let id = event.transaction.from.toHex();
  let execFailEvent = new ExecutionFailureEvent(id);
  execFailEvent.transactionId = event.params.transactionId;
  execFailEvent.save();
}

export function handleOwnerAddition(event: OwnerAddition): void {
  let id = event.transaction.from.toHex();
  let ownEvent = new OwnerAdditionEvent(id);
  ownEvent.owner = event.params.owner;
  ownEvent.save();
}

export function handleOwnerRemoval(event: OwnerRemoval): void {
  let id = event.transaction.from.toHex();
  let ownRemEvent = new OwnerRemovalEvent(id);
  ownRemEvent.owner = event.params.owner;
  ownRemEvent.save();
}

export function handleRequirementChange(event: RequirementChange): void {
  let id = event.transaction.from.toHex();
  let reqChangeEvent = new RequirementChangeEvent(id);
  reqChangeEvent.required = event.params.required;
  reqChangeEvent.save();
}

export function handleRevocation(event: Revocation): void {
  let id = event.transaction.from.toHex();
  let revocEvent = new RevocationEvent(id);
  revocEvent.sender = event.params.sender;
  revocEvent.transactionId = event.params.transactionId;
  revocEvent.save();
}

export function handleSubmission(event: Submission): void {
  let id = event.transaction.from.toHex();
  let submiEvent = new SubmissionEvent(id);
  submiEvent.transactionId = event.params.transactionId;
  submiEvent.save();
}

import { ChainUtil } from "../chain-util/chain-util";

export class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }
  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if (amount > senderWallet.balance) {
      return console.log(`Amount: ${amount} exceeds blance`);
    }

    transaction.outputs.push(
      ...[
        {
          amount: senderWallet.balance - amount,
          adress: senderWallet.publicKey,
        },
        {
          amount,
          adress: recipient,
        },
      ]
    );
    return transaction;
  }
}

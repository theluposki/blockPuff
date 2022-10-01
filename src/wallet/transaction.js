import { ChainUtil } from "../chain-util/chain-util";

export class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(
      (output) => output.adress == senderWallet.publicKey
    );

    if (amount > senderOutput.amount) {
      return console.log(`Amount: ${amount} exceeds the balance`);
    }

    senderOutput.amount = senderOutput.amount - amount;

    this.outputs.push({
      amount,
      adress: recipient,
    });
    Transaction.signTransaction(this, senderWallet);

    return this;
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
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      adress: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    const { adress, signature } = transaction.input;
    return ChainUtil.verifySignature(
      adress,
      signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

import { ChainUtil } from "../chain-util/chain-util.js";
import { INITIAL_BALANCE } from "../config.js";

export class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  toString() {
    return `Wallet = 
          publicKey = ${this.publicKey.toString()}
          balance = ${this.balance}
    `;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash)
  }
}

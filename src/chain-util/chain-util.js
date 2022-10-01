import { ec } from "elliptic"
import { randomUUID } from "crypto"


const EC = new ec("secp256k1")

export class ChainUtil {

  static genKeyPair() {
    return EC.genKeyPair()
  }
  static id() {
    return randomUUID()
  }

}

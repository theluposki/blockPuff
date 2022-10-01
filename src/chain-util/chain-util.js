import elliptic from "elliptic"
import { randomUUID, createHash } from "crypto"

const ec = new elliptic.ec("secp256k1")

export class ChainUtil {

  static genKeyPair() {
    return ec.genKeyPair()
  }
  static id() {
    return randomUUID()
  }

  static hash(data) {
    return createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, "hex").verify(dataHash,signature)
  }
}

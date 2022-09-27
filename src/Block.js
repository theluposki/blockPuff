import { createHash } from "crypto"

export class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  toString() {
    return `Block = 
      Timestamp = ${this.timestamp}
      LastHash = ${this.lastHash}
      Hash = ${this.lastHash}
      Data = ${this.data}
      `
  }

  static genesis() {
    const timestamp = "1664235724651"
    const lastHash = "0000000000000000000000000000000000000000000000000000000000000000"
    const hash = "000001110000000000000000000000000000000000000000000000000000000"
    const data = []
    return new this(timestamp, lastHash, hash, JSON.stringify(data))
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now()
    const lastHash = lastBlock.hash
    const hash = ""

    return new this(timestamp,lastHash, hash, data)
  }

  static hash(timestamp, lastHash, data) {
    const str = `${timestamp}${lastHash}${data}`
    return createHash('sha256').update(str).digest('hex');
  }
}

import { createHash } from "crypto"

import { DIFFICULTY } from "../config.js"

export class Block {
  constructor(timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
  }

  toString() {
    return `Block = 
      Timestamp = ${this.timestamp}
      LastHash = ${this.lastHash}
      Hash = ${this.lastHash}
      Nonce = ${this.nonce}
      Data = ${this.data}
      `
  }

  static genesis() {
    const nonce = 0
    const timestamp = "1664235724651"
    const lastHash = "0000000000000000000000000000000000000000000000000000000000000000"
    const hash = "00011100011100011000100"
    const data = []
    return new this(timestamp, lastHash, hash, JSON.stringify(data), 0)
  }

  static mineBlock(lastBlock, data) {

    let hash, timestamp
    
    const lastHash = lastBlock.hash

    let nonce = 0

    do {
      nonce++
      timestamp = Date.now()
      hash = Block.hash(timestamp, lastHash, data)

    } while(hash.substring(0,DIFFICULTY) !== "0".repeat(DIFFICULTY))


    return new this(timestamp,lastHash, hash, data, nonce)
  }

  static hash(timestamp, lastHash, data, nonce) {
    const str = `${timestamp}${lastHash}${data}${nonce}`
    return createHash('sha256').update(str).digest('hex');
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce } = block

    return Block.hash(timestamp, lastHash, data, nonce)
  }
}

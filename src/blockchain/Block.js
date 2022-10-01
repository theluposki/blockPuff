import { createHash } from "crypto"

import { DIFFICULTY, MINE_RATE } from "../config.js"

export class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty || DIFFICULTY
  }

  toString() {
    return `Block = 
      Timestamp = ${this.timestamp}
      LastHash = ${this.lastHash}
      Hash = ${this.lastHash}
      Nonce = ${this.nonce}
      DIFFICULT = ${this.difficulty}
      Data = ${this.data}
      `
  }

  static genesis() {
    const nonce = 0
    const timestamp = "1664235724651"
    const lastHash = "0000000000000000000000000000000000000000000000000000000000000000"
    const hash = "00011100011100011000100"
    const data = []
    return new this(timestamp, lastHash, hash, JSON.stringify(data), nonce, DIFFICULTY)
  }

  static mineBlock(lastBlock, data) {

    let hash, timestamp

    const lastHash = lastBlock.hash

    let { difficulty } = lastBlock

    let nonce = 0

    do {
      nonce++
      timestamp = Date.now()
      difficulty = Block.adjustDifficulty(lastBlock, timestamp)
      hash = Block.hash(timestamp, lastHash, data, difficulty)

    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty))


    return new this(timestamp, lastHash, hash, data, nonce, difficulty)
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    const str = `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    return createHash('sha256').update(str).digest('hex');
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block

    return Block.hash(timestamp, lastHash, data, nonce, difficulty)
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock

    difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
    return difficulty
  }
}

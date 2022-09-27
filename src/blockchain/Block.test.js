import { describe, expect, it } from "@jest/globals"
import { Block } from "./Block.js"
import { DIFFICULTY } from "../config.js"

describe("🫐  - Suíte block", () => {
  let data, lastBlock, block
  beforeEach(() => {
    data = "index.html"
    lastBlock = Block.genesis()
    block = Block.mineBlock(lastBlock, data)
  })

  it("sets the `data` to match the input", () => {
    expect(block.data).toEqual(data)
  })

  it("sets the `lastHash` to match the hash of the last Block", () => {
    expect(block.lastHash).toEqual(lastBlock.hash)
  })

  it("generates a hash that matches the difficulty", () => {
    expect(block.hash.substring(0, DIFFICULTY)).toEqual("0".repeat(DIFFICULTY))
  })

})

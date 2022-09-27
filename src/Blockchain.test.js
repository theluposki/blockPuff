import {describe, expect, it} from "@jest/globals"
import { Block } from "./Block"

import { Blockchain } from "./Blockchain"

describe("🫐  - Suíte blockchain", () => {
  let bc

  beforeEach(() => {
    bc = new Blockchain
  })

  it("Verificar se o primeiro bloco é o bloco genesis.", () => {

    expect(bc.chain[0]).toEqual(Block.genesis())
  })

  it("Adicionar novo bloco e verificar se o `data` do ultimo elemento da `chain` é igual.", () => {
    const data = "arquivo.csv"

    bc.addBlock(data)

    expect(bc.chain[bc.chain.length -1].data).toEqual(data)
  })

})


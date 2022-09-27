import {describe, expect, it} from "@jest/globals"
import { Block } from "./Block"

import { Blockchain } from "."

describe("🫐  - Suíte blockchain", () => {
  let bc
  let bc2

  beforeEach(() => {
    bc = new Blockchain
    bc2 = new Blockchain

  })

  it("Verificar se o primeiro bloco é o bloco genesis.", () => {

    expect(bc.chain[0]).toEqual(Block.genesis())
  })

  it("Adicionar novo bloco e verificar se o `data` do ultimo elemento da `chain` é igual.", () => {
    const data = "arquivo.csv"

    bc.addBlock(data)

    expect(bc.chain[bc.chain.length -1].data).toEqual(data)
  })


  it("Validando se a corrente `chain` está valida", () => {
    bc2.addBlock('500U$')

    expect(bc.isValidChain(bc2.chain)).toBe(true)
  })

  it("Invalidando a corrente se o bloco genesis estiver corrompido.", () => {
    bc2.chain[0].data = "0U$"

    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it("Invalidando a corrente `chain` se que tenha algum  bloco corrompido.", () => {
    bc2.addBlock("200U$")
    bc2.chain[1].data = "0U$"
    
    expect(bc.isValidChain(bc2.chain)).toBe(false)
  })

  it("Substituir a corrente `chain` por uma corrente `chain` válida", () => {
    bc2.addBlock("300U$")
    bc.replaceChain(bc2.chain)

    expect(bc.chain).toEqual(bc2.chain)
  })

  it("não substitui a corrente `chain` por uma de comprimento menor ou igual", () => {
    bc.addBlock("300U$")
    bc.replaceChain(bc2.chain)

    expect(bc.chain).not.toEqual(bc2.chain)
  })

})


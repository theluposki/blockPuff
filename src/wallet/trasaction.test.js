import { describe, expect, it } from "@jest/globals"
import { Wallet } from "./index.js"
import { Transaction } from "./transaction.js"

describe("🫐  - Suíte transaction", () => {
    let transaction, wallet, recipient, amount

    beforeEach(() => {
      wallet = new Wallet()
      amount = 50
      recipient = 'blockAdrees'
      transaction = Transaction.newTransaction(wallet, recipient, amount)
    })

    it("output the `amount` subtracted from the wallet balance", () => {
      console.log(JSON.stringify(transaction, null, 2))
      expect(transaction.outputs.find(output => output.adress == wallet.publicKey).amount).toEqual(wallet.balance - amount)
    })

    it("output `amount` added to the recipient", () => {
      expect(transaction.outputs.find(output => output.adress == recipient).amount).toEqual(amount)
    })

    it("input the balance of the wallet", () => {
      expect(transaction.input.amount).toEqual(wallet.balance)
    })

    it("validates a valid transaction", () => {
      expect(Transaction.verifyTransaction(transaction)).toBe(true)
    })

    it("invalidates a currupt transaction", () => {
      transaction.outputs[0].amount = 50000
      expect(Transaction.verifyTransaction(transaction)).toBe(false)
    })

    describe("updating a transaction", () => {
      let nextAmount, nextRecipient

      beforeEach(() => {
        nextAmount = 20
        nextRecipient = 'next -blockAdrees'
        transaction = transaction.update(wallet,nextRecipient, nextAmount)
      })

      it("subtracts the next amount from the sender output", () => {
        expect(transaction.outputs.find(output => output.adress == wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount)
      })

      it("outputs an amount for the next recipient", () => {
        expect(transaction.outputs.find(output => output.adress == nextRecipient).amount).toEqual(nextAmount)
      })
    })

    describe("trasaction with an amount exceeds the balance", () => {
      beforeEach(() => {
        amount = 50000
        transaction = Transaction.newTransaction(wallet, recipient, amount)
      })

      it("does not create the transaction", () => {
        expect(transaction).toEqual(undefined)
      })
    })
})

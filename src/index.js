console.log("\n🐝Running App Luposki... 🏃")

import { Block } from "./Block.js"

const block1 = new Block("adasd","adasd", "sdasd", "asdasd")

const fistBlock = Block.mineBlock(Block.genesis(), { Amount: 5000 })

const hash = Block.hash(Date.now, fistBlock.hash, { Amount: 4000 })

//console.log(block1)
console.log(fistBlock.toString())
console.log(hash)

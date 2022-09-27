import "dotenv/config"
import express from "express"
import cors from "cors"

import { Blockchain } from "../blockchain/index.js"
import { p2pServer } from "./p2p.server.js"

const app = express()
const bc = new Blockchain()
const p2p = new p2pServer(bc)

app.use(cors())
app.use(express.json())
app.use("/",express.static("src/app/public"))

app.get("/blocks", (req,res) => {
  res.status(200).json(bc.chain)
})

app.post("/mine",(req,res) => {
  const block = bc.addBlock(req.body)
  p2p.syncChain()
  res.status(201).json({ message: "New Block added.",data: block.data })
})

export { app, p2p }


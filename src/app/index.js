import "dotenv/config"
import express from "express"
import cors from "cors"

import { Blockchain } from "../blockchain/index.js"

const app = express()
const bc = new Blockchain()

app.use(cors())
app.use(express.json())
app.use("/",express.static("src/app/public"))

app.get("/blocks", (req,res) => {
  res.status(200).json(bc.chain)
})

export default app

import WebSocket, { WebSocketServer } from "ws"

const P2P_PORT = process.env.P2P_PORT || 5002
//$ HTTP_PORT = 3002 P2P_PORT=5002 PEERS=ws://localhost:5001, ws://localhost:5002 npm start
const peers = process.env.PEERS ? process.env.PEERS.split(",") : []

export class p2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }

  listen() {
    const server = new WebSocketServer({ port: P2P_PORT })

    server.on("connection", socket => this.connectSocket(socket))

    this.connectToPeers()

    console.log(`🐝Listening [ P2P ] at ws://localhost:${P2P_PORT} 🧑‍🦲👳🧑‍🦰...`)
  }

  connectSocket(socket) {
    this.sockets.push(socket)
    console.log("Socket connected")
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer)

      socket.on("open", () => this.connectSocket(socket))
    })
  }
}


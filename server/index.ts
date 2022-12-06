import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

// middleware

// express setup
dotenv.config()
const app = express()
app.use(cors())
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000
const server = http.createServer(app)

// database

// socket.io server setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server started on port ${ PORT }`)
    })
  }
  catch (error) {
    console.log(`You broke the server: ${ error }`)
  }
}

start()
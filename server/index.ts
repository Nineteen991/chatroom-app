import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import connectDB from './db/connect'
import { SocketData, UserData, SendMessage } from './interfaces'
import { getLast100Msgs, saveMessage, leaveRoom } from './util/messageFunctions'

// express setup
dotenv.config()
const app = express()
app.use(cors())
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000
const server = http.createServer(app)

// chatroom info
const CHAT_BOT: string = 'ChatBot'
let chatroom: string = ''  // this will be the room name
let allUsers: UserData[] = []  // all the users in the current chatroom

// socket.io server setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  // add a user to a room
  socket.on('join_room', (data: SocketData) => {
    const { username, room } = data
    socket.join(room)

    // get timestamp
    let createdTime: number = Date.now()

    // let others in the room know that someone has joined
    socket.to(room).emit('receive_message', {
      message: `${ username } has joined the room`,
      username: CHAT_BOT,
      createdTime
    })

    // send msg to the new user
    socket.emit('receive_message', {
      message: `Welcome ${ username }`,
      username: CHAT_BOT,
      createdTime
    })

    // save new user to the room
    chatroom = room
    allUsers.push({ id: socket.id, username, room })

    // list all the current users to the client
    const currentUsers: UserData[] = allUsers.filter(user => user.room == room)
    socket.to(room).emit('chatroom_users', currentUsers)
    socket.emit('chatroom_users', currentUsers)

    // get last 100 messages
    getLast100Msgs(room)
      .then(last100Messages => {
        socket.emit('last_100_messages', JSON.stringify(last100Messages))
      })
      .catch(error => console.log(error))
  })

  // send messages
  socket.on('send_message', (data: SendMessage) => {
    const { message, username, room, createdTime } = data

    // Send to all users in the room, including the sender
    io.in(room).emit('receive_message', data)

    saveMessage(message, username, room, createdTime)
  })

  // remove user from room
  socket.on('leave_room', (data: SocketData) => {
    const { username, room } = data
    socket.leave(room)

    const createdTime: number = Date.now()

    allUsers = leaveRoom(socket.id, allUsers)

    socket.to(room).emit('chatroom_users', allUsers)
    socket.to(room).emit('receive_message', {
      username: CHAT_BOT,
      message: `${ username } has left the chat`,
      createdTime
    })
  })

  socket.on('disconnect', () => {
    const user = allUsers.find(user => user.id == socket.id)

    const createdTime: number = Date.now()

    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers)
      socket.to(chatroom).emit('chatroom_users', allUsers)
      socket.to(chatroom).emit('receive_message', {
        username: CHAT_BOT,
        message: `${ user.username } was disconnected from the chat`,
        createdTime
      })
    }
  })
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string)
    server.listen(PORT, () => {
      console.log(`Server started on port ${ PORT }`)
    })
  }
  catch (error) {
    console.log(`You broke the server: ${ error }`)
  }
}

start()
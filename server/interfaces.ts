export interface SocketData {
  username: string
  room: string
}

export interface SendMessage extends SocketData {
  message: string
  createdTime: number
}

export interface UserData extends SocketData {
  id: string
}

export interface GetMsgs extends SendMessage {
  _id: string
  createdAt: Date
  updatedAt: Date
  __v: number
}
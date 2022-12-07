export interface SocketData {
  username: string
  room: string
}

export interface Message extends SocketData {
  message: string
  createdTime: number
}

export interface UserData extends SocketData {
  id: string
}
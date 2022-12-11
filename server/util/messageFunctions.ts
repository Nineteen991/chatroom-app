import Message from '../models/Messages'
import { GetMsgs, UserData } from '../interfaces'

export async function getLast100Msgs(room: string): Promise<GetMsgs[]> {
  const msgs: GetMsgs[] = await Message.find(
    { room },
    null,
    { limit: 100, sort: {'createdTime': -1} }
  )
  return msgs
}

export async function saveMessage(
  message: string,
  username: string,
  room: string,
  createdTime: number
): Promise<void> {
  const msg = await Message.create({ 
    message, 
    username, 
    room, 
    createdTime
  })

  if (!msg) throw new Error("There ain't no message")
}

export function leaveRoom (userID: string, chatroomUsers: UserData[]) {
  return chatroomUsers.filter(user => user.id != userID)
}
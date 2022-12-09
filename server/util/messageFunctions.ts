import Messages from '../models/Messages'
import { GetMsgs } from '../interfaces'

export async function getLast100Msgs(room: string): Promise<GetMsgs[]> {
  return await Messages.find(
    { room },
    null,
    { limit: 100, sort: {'createdTime': -1} }
  )
}

export function saveMessage() {
  return
}
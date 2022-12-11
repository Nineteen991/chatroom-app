import RoomAndUsers from "./room-and-users"
import Messages from "./messages"
import SendMessage from "./send-message"

export default function Chat({ socket, username, room, }) {
  return (
    <div className="chat">
      <RoomAndUsers socket={ socket } room={ room } username={ username } />
      <div className="chat-messages">
        <Messages socket={ socket } />
        <SendMessage socket={ socket } room={ room } username={ username } />
      </div>
    </div>
  )
}
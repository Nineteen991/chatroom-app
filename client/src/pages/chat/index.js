import RoomAndUsers from "./room-and-users"
import Messages from "./messages"
import SendMessage from "./send-message"

export default function Chat({ socket, username, room, setUsername }) {
  return (
    <div className="chat">
      <RoomAndUsers socket={ socket } room={ room } username={ username } setUsername={ setUsername } />
      <div className="chat-messages">
        <Messages socket={ socket } />
        <SendMessage socket={ socket } room={ room } username={ username } />
      </div>
    </div>
  )
}
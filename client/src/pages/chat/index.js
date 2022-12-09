import RoomAndUsers from "./room-and-users"
import Messages from "./messages"

export default function Chat({ socket, username, setUsername, room, setRoom }) {
  
  return (
    <div className="chat">
      <RoomAndUsers socket={ socket } room={ room } username={ username } />
      <div className="chat-messages">
        <Messages socket={ socket } />
      </div>
    </div>
  )
}
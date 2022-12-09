import RoomAndUsers from "./room-and-users"

export default function Chat({ socket, username, setUsername, room, setRoom }) {
  
  return (
    <div className="chat">
      <RoomAndUsers socket={ socket } room={ room } username={ username } />
      <div className="chat-messages">
        chat
      </div>
    </div>
  )
}
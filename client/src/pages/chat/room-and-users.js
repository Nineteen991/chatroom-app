import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function RoomAndUsers ({ socket, room, username }) {
  const [usersInRoom, setUsersInRoom] = useState([])

  useEffect(() => {
    socket.on('chatroom_users', data => {
      setUsersInRoom(data)
    })

    return () => socket.off('chatroom_users')
  }, [socket])

  const leaveRoom = () => {
    const createdTime = Date.now()
    socket.emit('leave_room', { username, room, createdTime })
  }

  return (
    <div className="room-and-users">
      <h1 className="room-title">{ room }</h1>
      
      { 
        usersInRoom.length > 0 
          ? <h2 className='room-users'>Users:</h2>
          : null 
      }

      <ul className='room-users-list'>
        {
          usersInRoom.map(user => (
            <li 
              style={{ 
                fontWeight: `${user.username === username ? 'bold': 'normal'}`
              }}
              key={ user.id }
            >
              { user.username }
            </li>
          ))
        }
      </ul>
      
      <Link to='/'>
        <button className='btn' onClick={ leaveRoom }>
          Leave Room
        </button>
      </Link>
    </div>
  )
}
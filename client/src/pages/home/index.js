import { Link } from 'react-router-dom'

export default function Home({ socket, username, setUsername, room, setRoom }) {
  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room })
    }
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <h1 className="form-title">{`<> Dev Chat </>`}</h1>

        <input 
          className="form-input" 
          placeholder="Username..."
          onChange={ e => setUsername(e.target.value) }
          value={ username }
          name='username'
        />
        <select 
          className="form-input" 
          onChange={ e => setRoom(e.target.value )}
        >
          <option>-- Select Room --</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Random</option>
        </select>

        <Link to='/chat'>
          <button 
            className="btn"
            onClick={ joinRoom }
          >
            Join Room
          </button>
        </Link>

      </div>
    </div>
  )
}
import { useState } from 'react'

export default function SendMessage({ socket, room, username }) {
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (message !== '') {
      const createdTime = Date.now()

      socket.emit('send_message', { username, room, message, createdTime })
      setMessage('')
    }
  }

  return (
    <div className='send-message'>
      <input
        className='message-input'
        placeholder='Message...'
        onChange={ e => setMessage(e.target.value) }
        value={ message }
      />
      <button className='btn message-btn' onClick={ sendMessage }>
        Send Message
      </button>
    </div>
  )
}
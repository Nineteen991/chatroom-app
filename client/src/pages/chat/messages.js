import { useState, useEffect } from 'react'

export default function Messages({ socket }) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessages(prev => [
        ...prev, 
        {
          message: data.message,
          username: data.username,
          createdTime: data.createdTime
        }
      ])
    })

    return () => socket.off('receive_message')
  }, [socket])

  

  return (
    <div className='messages'>
      {
        messages.map((message, i) => (
          <div className='message' key={i}>
            
          </div>
        ))
      }
    </div>
  )
}
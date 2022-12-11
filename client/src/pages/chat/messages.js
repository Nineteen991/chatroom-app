import { useState, useEffect, useRef } from 'react'

export default function Messages({ socket }) {
  const [messages, setMessages] = useState([])
  const messagesCurrent = useRef(null)

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

  useEffect(() => {
    socket.on('last_100_messages', last100Msgs => {
      last100Msgs = JSON.parse(last100Msgs)

      setMessages(prev => [...last100Msgs, ...prev])
    })

    return () => socket.off('last_100_messages')
  }, [socket])

  useEffect(() => {
    messagesCurrent.current.scrollTop = messagesCurrent.current.scrollHeight
  }, [messages])

  // dd/mm/yyyy, hh:mm:ss
  const formatDateFromTimestamp = timestamp => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <div className='messages' ref={ messagesCurrent }>
      {
        messages.map((msg, i) => (
          <div className='message' key={i}>
            <div className='message-username'>
              <span className='message-meta'>{ msg.username }</span>
              <span className='message-meta'>
                { formatDateFromTimestamp(msg.createdTime) }
              </span>
            </div>
            <p className='message-text'>{ msg.message }</p>
            <br />
          </div>
        ))
      }
    </div>
  )
}
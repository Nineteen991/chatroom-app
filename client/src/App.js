import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'

import Home from './pages/home'
import Chat from './pages/chat'
import './App.sass'

const socket = io.connect('http://localhost:5000')

export default function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  return (
    <Router>
      <Routes>
        <Route path='/' element=
          {
            <Home 
              socket={ socket } 
              username={ username }
              setUsername={ setUsername }
              room={ room }
              setRoom={ setRoom }
            />
          } 
        />
        <Route path='/chat' element=
          { 
            <Chat 
              socket={ socket } 
              username={ username }
              setUsername={ setUsername }
              room={ room }
              setRoom={ setRoom }
            />
          }
        />
      </Routes>
    </Router>
  )
}
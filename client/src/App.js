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

  localStorage.setItem('username', username)
  localStorage.setItem('room', room)

  const localUser = localStorage.getItem('username')
  const localRoom = localStorage.getItem('room')

  return (
    <Router>
      <Routes>
        <Route path='/' element=
          {
            <Home 
              socket={ socket } 
              username={ localUser }
              setUsername={ setUsername }
              room={ localRoom }
              setRoom={ setRoom }
            />
          } 
        />
        <Route path='/chat' element=
          { 
            <Chat 
              socket={ socket } 
              username={ localUser }
              setUsername={ setUsername }
              room={ localRoom }
              setRoom={ setRoom }
            />
          }
        />
      </Routes>
    </Router>
  )
}
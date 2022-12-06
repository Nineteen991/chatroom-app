import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'

import Home from './pages/home'
import Chat from './pages/chat'
import './App.sass'

const socket = io.connect('http://localhost:5000')

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/chat' element={ <Chat /> } />
      </Routes>
    </Router>
  )
}
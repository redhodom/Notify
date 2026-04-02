import { useState } from 'react'
import HomePage from './HomePage'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AudioPort from './AudioPort'
import AuthPage from './AuthPage'
import Support from './Support'

function App() {

  return (
     <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/player" element={<AudioPort />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  )
}

export default App

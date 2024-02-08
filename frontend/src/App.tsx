import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './Layout'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout><Home /></Layout>} />
      <Route path='/signin' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
      </>
  )
}

export default App

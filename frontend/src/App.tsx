import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './Layout'
import MyHotels from './pages/MyHotels'
import MyBookings from './pages/MyBookings'
import AddHotel from './pages/AddHotel'

function App() {

  return (
    <>
    <Routes >
      <Route path='/' element={<Layout><Home /></Layout>}  />
      <Route path='/signin' element={<Layout><Login /></Layout>} />
      <Route path='/register' element={<Layout><Register /></Layout>} />
      <Route path='/my-hotels' element={<Layout><MyHotels /></Layout>} />
      <Route path='/my-bookings' element={<Layout><MyBookings /></Layout>} />
      <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>} />
      <Route path='/edit-hotel/:hotelId' element={<Layout><AddHotel/></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
      </>
  )
}

export default App

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Confirmation from './pages/Confirmation'
import Home from './pages/Home'
import Login from './pages/Login'
import MyBookings from './pages/MyBookings'
import Search from './pages/Search'
import MyHotels from './pages/MyHotels'
import Register from './pages/Register'
import AddEditHotel from './pages/AddHotel'

function App() {

  return (
    <>
    <Routes >
      <Route path='/' element={<Layout><Home /></Layout>}  />
      <Route path='/signin' element={<Layout><Login /></Layout>} />
      <Route path='/register' element={<Layout><Register /></Layout>} />
      <Route path='/my-hotels' element={<Layout><MyHotels /></Layout>} />
      <Route path='/my-bookings' element={<Layout><MyBookings /></Layout>} />
      <Route path='/search' element={<Layout><Search/></Layout>} />
      <Route path='/hotel/:id/booking' element={<Layout><Confirmation /></Layout>} />
      <Route path='/add-hotel' element={<Layout><AddEditHotel/></Layout>} />
      <Route path='/edit-hotel/:hotelId' element={<Layout><AddEditHotel/></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
      </>
  )
}

export default App

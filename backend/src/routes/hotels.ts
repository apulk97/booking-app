import express from 'express'
import { addBooking, createPaymentIntent, getAllHotels, getHotelById, getLatestHotels } from '../controller/hotels'
import validateToken from '../middleware/auth'

const router = express.Router()

router.get('/search', getAllHotels)
router.get('/latestHotels', getLatestHotels)
router.get('/:id', getHotelById)
router.post('/:hotelId/bookings/payment-intent',validateToken, createPaymentIntent)
router.post('/:hotelId/bookings', validateToken, addBooking)

export default router
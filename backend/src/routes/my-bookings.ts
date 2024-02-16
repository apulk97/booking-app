import express from 'express'
import validateToken from '../middleware/auth'
import { getBookings } from '../controller/my-bookings'

const router = express.Router()
router.get('/',validateToken,  getBookings)

export default router
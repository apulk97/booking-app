import express from 'express'
import { getAllHotels, getHotelById } from '../controller/hotels'

const router = express.Router()

router.get('/search', getAllHotels)
router.get('/:id', getHotelById)

export default router
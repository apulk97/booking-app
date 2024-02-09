import express from 'express'
import { getAllHotels } from '../controller/hotels'

const router = express.Router()

router.get('/search', getAllHotels)

export default router
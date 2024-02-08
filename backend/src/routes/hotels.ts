import express from 'express'
import { getAllHotels } from '../controller/hotels'

const router = express.Router()

router.get('/seacrh', getAllHotels)

export default router
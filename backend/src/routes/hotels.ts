import express from 'express'
import { addHotel } from '../controller/hotels'
import validateToken from '../middleware/auth'

const routers = express.Router()

routers.post('/add',validateToken, addHotel)

export default routers
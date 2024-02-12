import axios from 'axios'
import { hotelTypes } from '../constants/hotelConstants'
import { HotelType } from '../pages/AddHotel/index.types'


const api = axios.create({baseURL: 'http://localhost:8000'})

export const addhotel = (data: HotelType) => api.post('/add', data)
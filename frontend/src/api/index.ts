import axios from 'axios'
import { UserInterface } from '../pages/Register/index.types'

const api = axios.create({baseURL: 'http://localhost:7000'})

export const signup = (data: UserInterface) => api.post('/users/signup', data)
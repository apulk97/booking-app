import express from 'express'
import { getUserDetails, signin, signup } from '../controller/users'
import validateToken from '../middleware/auth'

const routers = express.Router()

routers.get('/me',validateToken, getUserDetails)
routers.post('/signin', signin)
routers.post('/signup', signup)

export default routers
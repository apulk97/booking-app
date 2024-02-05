import express from 'express'
import { signin, signup } from '../controller/users'

const routers = express.Router()

routers.post('/signin', signin)
routers.post('/signup', signup)

export default routers
import cors from "cors";
import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary'

import userRoutes from './routes/users';
import myHotelRoutes from './routes/my-hotels'
import hotelRoutes from './routes/hotels'
import bookingRoutes from './routes/my-bookings'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes)
app.use('/my-hotels', myHotelRoutes)
app.use('/hotels', hotelRoutes)
app.use('/my-bookings', bookingRoutes)


app.listen(8000, () => {
    console.log('Server is listening on PORT 8000')
});

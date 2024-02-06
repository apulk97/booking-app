import cors from "cors";
import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import hotelRoutes from './routes/hotels'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes)
app.use('/my-hotels', hotelRoutes)


app.listen(8000, () => {
    console.log('Server is listening on PORT 8000')
});

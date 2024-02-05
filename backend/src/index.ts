import cors from "cors";
import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';

import userRoutes from './routes/users';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)


const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes)

app.listen(7000, () => {
    console.log('Server is listening on PORT 7000')
});

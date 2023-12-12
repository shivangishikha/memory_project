import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();


app.use(bodyParser.json({ limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true}));
app.use(cors());


const CONNECTION_URL = 'mongodb+srv://admin:admin123@cluster0.9s8l2ml.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT, () => console.log(`Server Runnung on port: ${PORT}`)))
.catch((error) => console.log(error.message));


app.use('/posts', postRoutes)
app.use('/user', userRoutes)    
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./configs/db.js"
import authRouter from './routes/authRoute.js'
import postRouter from './routes/postRoute.js'
import { errorHandler } from './middlewares/errorHandler.js'

//dotenv
dotenv.config()
//connect DB
connectDB()

const port = process.env.APP_PORT || "10000";

const app = express();

//cors
app.use(cors());

//body-parser
app.use(express.json())

//mount the route
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next)=>{
    const error = new Error('Page not found');
    error.statusCode = 404;
    next(error);
})

//Error handling
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`sever is running on ${port}`)
})


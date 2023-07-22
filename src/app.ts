import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import mongoose from 'mongoose';
import cartRoutes from './routes/cartRoutes';

require('dotenv').config();

if (typeof process.env.MONGO_URI === "string") {
    const connectionString: string = process.env.MONGO_URI;

    mongoose.connect(connectionString).then(
        () => console.log('database connection successful!'),
        err => console.log('Error connecting to the database', err));
} else {
    console.log(".env type error")
}

// middleware
// express
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
// TODO: utilize CORS: at the moment, all requests are allowed
// https://github.com/expressjs/cors#configuration-options
const cors = require('cors');
app.use(cors());

// routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/message', messageRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

app.listen(3000);
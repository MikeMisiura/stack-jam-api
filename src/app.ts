import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import mongoose from 'mongoose';

const connectionString: string = 'mongodb://localhost:27017/stack-jam';

mongoose.connect(connectionString).then(
    () => console.log('database connection successful!'), 
    err => console.log('Error connecting to the database', err));

// middleware
// express
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS
// TODO: utilize CORS: at the moment, all requests are allowed
// https://github.com/expressjs/cors#configuration-options
const cors = require('cors');
app.use(cors());

// routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/message', messageRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

app.listen(3000);
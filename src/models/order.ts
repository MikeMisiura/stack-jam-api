import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './user';

interface IOrder extends Document {
    user: IUser;
    products: string[];
    totPrice: number;
}

const orderSchema: Schema = new Schema({
    user: {
        type: Object,
        required: true,
    },
    products: {
        type: Array,
        required: true
    },
    totPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Order: Model<IOrder> = model('Order', orderSchema);

export { IOrder, Order };
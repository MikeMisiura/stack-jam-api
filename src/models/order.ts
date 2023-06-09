import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './user';
import { IOrderProduct } from './orderProduct';

interface IOrder extends Document {
    user: IUser;
    products: IOrderProduct[];
    subtotal: number;
    tax: number;
    totPrice: number;
    fulfilled: boolean;
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
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    totPrice: {
        type: Number,
        required: true
    },
    fulfilled: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const Order: Model<IOrder> = model('Order', orderSchema);

export { IOrder, Order };
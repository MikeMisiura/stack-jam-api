import { Document, Schema, Model, model } from 'mongoose';

interface IOrderProduct extends Document {
    productName: string;
    color: string;
    description: string;
    price: number;
    quantity: number;
}

const orderProductSchema: Schema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, {
    timestamps: true
});

const OrderProduct: Model<IOrderProduct> = model('OrderProduct', orderProductSchema);

export { IOrderProduct, OrderProduct };
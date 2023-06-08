import { Document, Schema, Model, model } from 'mongoose';

interface IProduct extends Document {
    productName: string;
    color: string[];
    description: string;
    price: number;
}

const productSchema: Schema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Product: Model<IProduct> = model('Product', productSchema);

export { IProduct, Product };
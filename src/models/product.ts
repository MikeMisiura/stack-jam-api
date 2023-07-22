import { Document, Schema, Model, model } from 'mongoose';

interface IProduct extends Document {
    id?: string;
    productName: string;
    color: string;
    description: string;
    price: number;
    groupCode: string;
    featured?: boolean;
}

const productSchema: Schema = new Schema({
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
    groupCode: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const Product: Model<IProduct> = model('Product', productSchema);

export { IProduct, Product };
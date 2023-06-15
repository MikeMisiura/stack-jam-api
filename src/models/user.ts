import { Document, Schema, Model, model } from 'mongoose';
import { ICartProduct } from './cartProduct';

// TODO: add city, state, zip to user data

interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    cart: ICartProduct[]
    phone: string;
    admin: boolean;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    admin: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

const User: Model<IUser> = model('User', userSchema);

export { IUser, User };
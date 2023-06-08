import { Document, Schema, Model, model } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: String;
    phone: String;
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
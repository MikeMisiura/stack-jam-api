import { Document, Schema, Model, model } from 'mongoose';

interface IMessage extends Document {
    id?: string;
    email: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    message: string;
    read: boolean;
}

const messageSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const Message: Model<IMessage> = model('Message', messageSchema);

export { IMessage, Message };
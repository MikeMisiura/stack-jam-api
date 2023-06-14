import { RequestHandler } from "express";
import { Message, IMessage } from "../models/message";
import { verifyAdmin, verifyUser } from "../services/auth";
import { IUser } from "../models/user";

export const getUserMessages: RequestHandler = async (req, res, next) => {
    // let user: IUser | null = await verifyUser(req);
    // if (!user) { return res.status(403).send() }

    // res.status(200).json(user);
}

export const getAllMessages: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let messageList = await Message.find();
    res.status(200).json(messageList);
}

export const createMessage: RequestHandler = async (req, res, next) => {

    const newMessage: IMessage = new Message({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        message: req.body.message,
        read: false
    });

    if (req.body.phoneNumber) {
        newMessage.phoneNumber = req.body.phoneNumber
    } 


    try {
        if (!newMessage.email && !newMessage.firstName && !newMessage.lastName &&
            !newMessage.message && !newMessage.read
        ) { res.status(400).send('more info required') }

        let created = await newMessage.save();
        res.status(201).json(created);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const markRead: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let messageId = req.params.id;

    await Message.findByIdAndUpdate(messageId, { $set: { read: true } })

    res.status(200).send();
}

export const markUnread: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let messageId = req.params.id;

    await Message.findByIdAndUpdate(messageId, { $set: { read: false } })

    res.status(200).send();
}


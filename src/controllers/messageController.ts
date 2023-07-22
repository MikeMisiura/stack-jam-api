import { RequestHandler } from "express";
import { Message, IMessage } from "../models/message";
import { verifyAdmin, verifyUser } from "../services/auth";
import { IUser } from "../models/user";
import { sendEmail } from "../services/sendEmail";
import { devRecipient } from "../personal/developerInfo";
// import main from '../services/emailSender';
// import { email } from "../personal/emailLogin";

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

        //         // send mail with defined transport object
    // const info = await transporter.sendMail({
    //     from: `Stack Jam Test <${email}>`,
    //     to: "mikemisiura@gmail.com",
    //     subject: "Hello from node",
    //     text: "Hello, world?",
    //     html: "<strong>Hello, world?</strong>",
    //     headers: { 'x-myheader': 'test header' }
    // });

    // console.log("Message sent: %s", info.response);

    // main



    // actual code:

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
        ) { return res.status(400).send('more info required') }

        // TODO: set up nodemailer to send emails
        let created = await newMessage.save();
        console.log(created)
        res.status(201).json(created);
    }
    catch (err) {
        res.status(500).send(err);
    }

    await sendEmail({
        subject: "Thanks for your message!",
        body: `We received your message and will get back to you shortly: ${newMessage.message}`,
        to: [devRecipient, { email: newMessage.email }]
    })

    await sendEmail({
        subject: "New message!",
        body: `You have a new message from ${newMessage.firstName} ${newMessage.lastName}: ${newMessage.message}`,
        to: [devRecipient, { email: newMessage.email }]
    })


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


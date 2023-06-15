import { RequestHandler } from "express";
import { IUser, User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getCart: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    let userInfo = await User.findOne(user._id);
    if (!userInfo) { return res.status(403).send() }

    res.status(200).json(userInfo.cart);
}

export const setCart: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    let userWithCart: IUser | null = await User.findOne(user._id);
    if (!userWithCart) { return res.status(403).send() }

    userWithCart.cart = req.body

    try {
        await userWithCart.save();
        res.status(201).json(userWithCart.cart);
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}
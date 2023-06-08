import { RequestHandler } from "express";
import { Order, IOrder } from "../models/order";
import { IUser } from "../models/user";
import { verifyAdmin, verifyUser } from "../services/auth";


export const getAllOrders: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let orderList = await Order.find();
    res.status(200).json(orderList);
}

export const getOneOrders: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    let admin: IUser | null = await verifyAdmin(req);

    let orderId = req.params.id;
    let order = await Order.findById(orderId);

    if (!admin || user._id !== order?.user._id) {
        return res.status(403).send()
    }

    res.status(200).json(order);
}

export const addOrder: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    const newOrder: IOrder = new Order({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const editOrder: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let orderId = req.params.id;
    const updatedOrder: IOrder = new Order({
        _id: orderId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    await Order.findByIdAndUpdate(orderId, { $set: updatedOrder })

    res.status(200).json(updatedOrder);
}

export const cancelOrder: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let itemId = req.params.id;
    let result = await Order.findByIdAndDelete(itemId);
    res.status(200).json(result);
}
import { RequestHandler } from "express";
import { Order, IOrder } from "../models/order";
import { IUser, User } from "../models/user";
import { verifyAdmin, verifyUser } from "../services/auth";
import { IOrderProduct } from "../models/orderProduct";

// TODO: set up tax rate
const taxRate = 0

function calculateSubtotalTaxTotal(products: IOrderProduct[]) {

    let subtotal: number = 0

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (!product.quantity) { product.quantity = 1 }

        const price = product.price * product.quantity
        subtotal = subtotal + price
    }

    const tax = subtotal * taxRate
    const totalPrice = subtotal + tax

    return { subtotal, tax, totalPrice }
}


// TODO: make getAllOrder only return unfulfilled orders
export const getAllOrders: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let orderList = await Order.find();
    res.status(200).json(orderList);
}

export const getOneOrder: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    let orderId = req.params.id;
    let order = await Order.findById(orderId);
    if (!order) { return res.status(404).send() }

    let admin: IUser | null = await verifyAdmin(req);
    if (admin) {
        return res.status(200).json(order);
    }

    let compareUserId = user._id.toString()
    let compareOrderUserId = order.user._id.toString()

    if (compareUserId != compareOrderUserId) {
        return res.status(403).send()
    }


    return res.status(200).json(order);

}

export const addOrder: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    const products: IOrderProduct[] = req.body.products

    const { subtotal, tax, totalPrice } = calculateSubtotalTaxTotal(products)

    const newOrder: IOrder = new Order({
        user: user,
        products: products,
        subtotal: subtotal,
        tax: tax,
        totPrice: totalPrice
    });

    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const addOrderForUser: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let user = await User.findById(req.params.id);
    if (!user) { return res.status(404).send() }

    const products: IOrderProduct[] = req.body.products

    const { subtotal, tax, totalPrice } = calculateSubtotalTaxTotal(products)

    const newOrder: IOrder = new Order({
        user: user,
        products: products,
        subtotal: subtotal,
        tax: tax,
        totPrice: totalPrice
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

    let order = await Order.findById(req.params.id);
    if (!order) { return res.status(404).send() }

    const { subtotal, tax, totalPrice } = calculateSubtotalTaxTotal(req.body.products)

    const updatedOrder: IOrder = new Order({
        _id: order._id,
        user: order.user,
        products: req.body.products,
        subtotal: subtotal,
        tax: tax,
        totPrice: totalPrice
    });

    try {
        await Order.findByIdAndUpdate(order._id, { $set: updatedOrder })
        res.status(200).json(updatedOrder);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const fulfillOrder: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let order = await Order.findById(req.params.id);
    if (!order) { return res.status(404).send() }

    try {
        await Order.findByIdAndUpdate(order._id, { $set: { fulfilled: true } })
        res.status(200).json(order);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const deleteOrder: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }


    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).send();
        }
    catch (err) {
        res.status(500).send(err);
    }

// TODO: mark as deleted/canceled instead of actually deleting
// code to mark as deleted instead of deleting
// also update getAllOrders, and getOneOrder
    // let order = await Order.findById(req.params.id);
    // if (!order) { return res.status(404).send() }

    // try {
    //     await Order.findByIdAndUpdate(order._id, { $set: { deleted: true } })
    //     res.status(200).send();
    // }
    // catch (err) {
    //     res.status(500).send(err);
    // }

}
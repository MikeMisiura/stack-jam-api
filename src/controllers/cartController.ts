import { RequestHandler } from "express";
import { IUser, User } from "../models/user";
import { verifyUser } from "../services/auth";
import { ICartProduct } from "../models/cartProduct";

export const getCart: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    let userInfo = await User.findOne(user._id);
    if (!userInfo) { return res.status(403).send() }

    res.status(200).json(userInfo.cart);
}

export const getOneProduct: RequestHandler = async (req, res, next) => {
    // let itemId = req.params.id;
    // let product = await Product.findById(itemId);
    // res.status(200).json(product);
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

export const editProduct: RequestHandler = async (req, res, next) => {
    // let admin: IUser | null = await verifyAdmin(req);
    // if (!admin) { return res.status(403).send() }

    // let productId = req.params.id;
    // const updatedProduct: IProduct = new Product({
    //     _id: productId,
    //     productName: req.body.productName,
    //     description: req.body.description,
    //     color: req.body.color,
    //     price: req.body.price
    // });

    // await Product.findByIdAndUpdate(productId, { $set: updatedProduct })

    // res.status(200).json(updatedProduct);
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
    // let admin: IUser | null = await verifyAdmin(req);
    // if (!admin) { return res.status(403).send() }

    // let itemId = req.params.id;
    // await Product.findByIdAndDelete(itemId);
    // res.status(200).send();
}
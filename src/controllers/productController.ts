import { RequestHandler } from "express";
import { Product, IProduct } from "../models/product";
import { IUser } from "../models/user";
import { verifyAdmin } from "../services/auth";

export const getAllProduct: RequestHandler = async (req, res, next) => {
    let productList = await Product.find();
    res.status(200).json(productList);
}

export const getOneProduct: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let product = await Product.findById(itemId);
    res.status(200).json(product);
}

export const addProduct: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    const newProduct: IProduct = new Product({
        productName: req.body.productName,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        groupCode: req.body.groupCode
    });

    try {
        if (!newProduct.productName && !newProduct.description && !newProduct.color &&
            !newProduct.price && !newProduct.groupCode
        ) { res.status(400).send('Missing Information') }


        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

export const editProduct: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let productId = req.params.id;
    const updatedProduct: IProduct = new Product({
        _id: productId,
        productName: req.body.productName,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price
    });

    await Product.findByIdAndUpdate(productId, { $set: updatedProduct })

    res.status(200).json(updatedProduct);
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let itemId = req.params.id;
    await Product.findByIdAndDelete(itemId);
    res.status(200).send();
}
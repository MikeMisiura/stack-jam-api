import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyAdmin, verifyUser } from "../services/auth";

export const getUserInfo: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    let userInfo = await User.findOne(user._id);
    res.status(200).json(userInfo);
}

export const getAllUsers: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let userList = await User.find();
    res.status(200).json(userList);
}

export const createUser: RequestHandler = async (req, res, next) => {
    const newUser: IUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        cart: [],
        admin: false
    });

    try {
        if (!newUser.email && !newUser.password && !newUser.firstName &&
            !newUser.lastName && !newUser.address
        ) { res.status(400).send('Username and password required') }

        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;

        let created = await newUser.save();
        res.status(201).json({
            email: created.email,
            userId: created._id
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: IUser | null = await User.findOne(
        { email: req.body.email }
    );

    if (!existingUser) { return res.status(402).json('Invalid email') }

    let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

    if (!passwordsMatch) { return res.status(401).json('Invalid password') }

    // TODO: remove this line of code before production. 
    // It adds a cart to existing users who do not have one. 
    // This is only possible for test users set up before carts.
    if (!existingUser.cart) { existingUser.cart = [] }
    // 

    let token = await signUserToken(existingUser);
    let admin: boolean = existingUser.admin
    res.status(200).json({ token, admin });
}

export const setAdmin: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let userId = req.params.id;

    await User.findByIdAndUpdate(userId, { $set: { admin: true } })

    res.status(200).send();
}

export const removeAdmin: RequestHandler = async (req, res, next) => {
    let admin: IUser | null = await verifyAdmin(req);
    if (!admin) { return res.status(403).send() }

    let userId = req.params.id;

    await User.findByIdAndUpdate( userId, { $set: { admin: false } } )

    res.status(200).send();
}
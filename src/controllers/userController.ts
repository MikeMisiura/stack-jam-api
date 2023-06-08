import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyAdmin, verifyUser } from "../services/auth";

export const getAllUsers: RequestHandler = async (req, res, next) => {
    // let user: IUser | null = await verifyAdmin(req);
    // if (!user) { return res.status(403).send() }
    
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
        admin: req.body.admin
    });

    try {
        console.log(newUser)

        if (!newUser.email && !newUser.password && !newUser.firstName &&
            !newUser.lastName && !newUser.address
        ) { res.status(400).send('Username and password required') }

        console.log(newUser)

        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;

        console.log(newUser)

        let created = await newUser.save();

        console.log(created)

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

    if (!existingUser) { return res.status(401).json('Invalid email') }

    let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

    if (!passwordsMatch) { res.status(401).json('Invalid password') }

    let token = await signUserToken(existingUser);
    res.status(200).json({ token });
}

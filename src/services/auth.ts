import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/user';

const secret = "legal pad led light note book";

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 12;
    const hash = await bcrypt.hash(plainTextPassword, saltRound);
    return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

export const signUserToken = async (user: IUser) => {
    let token = jwt.sign(
        { userId: user._id },
        secret,
        { expiresIn: '1hr' }
    );
    return token;
}

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) { return null }

    const token = authHeader.split(' ')[1];

    try {
        let decoded: any = await jwt.verify(token, secret);
        return await User.findById(decoded.userId);
    } catch (err) { return null }
}

export const verifyAdmin = async (req: Request) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) { return null }

    const token = authHeader.split(' ')[1];

    try {
        let decoded: any = await jwt.verify(token, secret);
        let user = await User.findById(decoded.userId);
        if (!user || !user.admin)  { return null }
        return user
    } catch (err) { return null }

}
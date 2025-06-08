import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const generateToken = (userId: string, res: Response) => {

    const token = jwt.sign ({userId}, process.env.JWT_SECRET!, {
        expiresIn:"7d",
    });

    res.cookie("jwt",token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, //prevent xss attack
        sameSite: "strict", //prevent csrf attack
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
}

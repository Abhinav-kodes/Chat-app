//auth.middleware.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types/custom";

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No Token Provided" });
            return ;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            // Correctly handles a valid token for a user that no longer exists.
            res.status(404).json({ message: "User not found" });
            return;
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", (error as Error).message);
        
        if ((error as Error).name === "JsonWebTokenError") {
            res.status(401).json({ message: "Unauthorized: Invalid Token" });
            return;
        }
        if ((error as Error).name === "TokenExpiredError") {
            res.status(401).json({ message: "Unauthorized: Token Expired" });
             return;
        }

        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

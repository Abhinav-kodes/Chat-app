import { Request, Response } from "express";
import User from "../models/user.model";
import { CustomRequest } from "../types/custom"; 
import Message from "../models/message.models";
import cloudinary from "../lib/cloudinary";


export const getUsersForSidebar = async(req: CustomRequest, res: Response) => {
    try {
        const loggedInUserId = req.user?._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", (error as Error).message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async(req: CustomRequest, res: Response) => {
    try {
        const { id:userToChatId } = req.params;
        const myId = req.user?._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId}, 
                {senderId:userToChatId, receiverId:myId}
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controllers: ", (error as Error).message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async(req: CustomRequest, res: Response) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        

        //SOCKET.IO



        res.status(201).json(newMessage);
    
    } catch (error) {
        console.log("Error in sendMessage controller: ", (error as Error).message);
        res.status(500).json({ error: "Internal server error" });
    }
};
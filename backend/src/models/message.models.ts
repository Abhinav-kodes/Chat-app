import mongoose, { Document, Schema } from "mongoose";


export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    text?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema: Schema = new Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
            type: String,
        },

        image: {
            type: String,
        },        
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
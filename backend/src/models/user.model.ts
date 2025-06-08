import mongoose, { Document, Schema } from "mongoose";

interface Iuser extends Document {
    fullName: string;
    email: string;
    password: string;
    profilePic?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        profilePic: {
            type: String,
            default: null,
        },        
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<Iuser>("User", userSchema);
export default User;
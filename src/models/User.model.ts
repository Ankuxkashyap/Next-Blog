import mongoose from "mongoose";

export interface Iuser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    bio?: string;
    blogPosts: mongoose.Types.ObjectId[];
    createdAt: Date;
} 

const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },
    blogPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
}, { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<Iuser>("User", UserSchema);

export default User;
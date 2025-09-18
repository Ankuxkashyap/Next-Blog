import mongoose from "mongoose";
import { Document } from "mongoose";

 interface IBlog extends Document {
    title: string;
    content: string;
    description: string;
    auther: mongoose.Types.ObjectId;
    likes: number;
    likedBy: mongoose.Types.ObjectId[];
    image: string;
    comments: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }
);      

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export type { IBlog }
export default Blog;

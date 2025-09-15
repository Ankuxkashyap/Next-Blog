import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, 
    },
    replier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;

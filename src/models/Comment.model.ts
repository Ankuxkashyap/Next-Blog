import mongoose,{Types} from "mongoose";
export interface IComment extends Document {
  content: string;
  replier: Types.ObjectId;
  blog: Types.ObjectId;
  createdAt: Date;
}

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
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", 
      },
    ],
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

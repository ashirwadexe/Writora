import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Comment must be atleast 3 characters long."],
        maxLength: [500, "Comment should not be more than 500 characters long."]
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
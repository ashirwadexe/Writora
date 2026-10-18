import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
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
}, { timestamps: true });

// One user can like a particular blog only once
likeSchema.index(
    { userId: 1, blogId: 1 },
    { unique: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
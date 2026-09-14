import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    tags: [{
        type: String
    }],
    readTime: {
        type: String,
        required: true
    }
},{ timestamps: true});

export const Blog = mongoose.model("Blog", blogSchema);
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import { createCommentSchema } from "../validators/comment.validator.js";

//  CREATE COMMENT 
// POST: /api/blog/:blogId/comments
export const createComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false
            });
        };

        const result = createCommentSchema.safeParse(req.body);
        if(!result.success) {
            return res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: result.error.flatten()
            });
        };

        const { content } = result.data;

        const comment = await Comment.create({
            userId,
            blogId,
            content: content.trim()
        });

        return res.status(201).json({
            message: "Comment added!",
            success: true,
            comment
        });

    } catch (error) {
        console.log("Error is createComment: ", error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false
        });
    };
};

// GET: /api/blog/:blogId/comments
export const getAllComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(404).json({
                message: "Blog not found!",
                success: false
            });
        };

        const comments = await Comment.find({blogId})
            .populate("userId", "name")
            .sort({ createdAt: -1});

        return res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        console.log("Error is createComment: ", error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false
        });
    };
};
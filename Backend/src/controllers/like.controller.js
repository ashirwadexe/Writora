import Blog from "../models/blog.model.js";
import Like from "../models/like.model.js";

// POST: api/likes/:blogId
export const likeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        const blogExist = await Blog.findById(blogId);
        if(!blogExist) {
            return res.status(404).json({
                message: "Blog doesn't exist!",
                success: false
            });
        };

        // check if blog already like by user ?
        const existingLike = await Like.findOne({
            blogId, 
            userId
        });
        if(existingLike) {
            return res.status(409).json({
                message: "You have already liked this blog!",
                success: false
            });
        };

        // Create a new like document
        await Like.create({
            blogId,
            userId
        });

        // Calculate the updated like count on the blog
        const totalLikes = await Like.countDocuments({blogId});

        return res.status(201).json({
            message: "Liked!",
            success: true,
            totalLikes,
            isLiked: true
        });

    } catch (error) {
        // Handle duplicate likes if concurrent requests arrive.
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You have already liked this blog"
            });
        }

        console.error("Like blog error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };
};

// DELETE: /api/likes/:blogId
export const unlikeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        const blogExist = await Blog.findById(blogId);
        if(!blogExist) {
            return res.status(404).json({
                message: "Blog doesn't exist!",
                success: false
            });
        };

        // find and delete only this like 
        const deletedLike = await Like.findOneAndDelete({
            blogId,
            userId
        });
        if(!deletedLike) {
            return res.status(404).json({
                message: "You have not liked this blog!",
                success: false
            });
        };

        // calculated like count 
        const totalLikes = await Like.countDocuments({ blogId });

        res.status(201).json({
            message: "Like removed!",
            success: true,
            totalLikes,
            isLiked: false
        });

    } catch (error) {
        console.error("Like blog error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };
};
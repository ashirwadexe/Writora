import { Blog } from "../models/blog.model.js";
import { createBlogSchema } from "../validators/blog.validator.js";


// POST: /api/blog/create
export const createBlog = async (req, res) => {
    try {
        const result = createBlogSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message: "Invalid content",
                success: false,
                error: result.error.flatten()
            });
        };

        const userId = req.user;

        const { title, content, category, tags } = result.data;

        const blog = await Blog.create({
            title,
            content,
            author: userId._id,
            category,
            tags,
        });

        return res.status(200).json({
            message: "Blog posted!!!",
            success: true,
            blog
        });
     
    } catch (error) {
        console.log("Error in create blog:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// GET: /api/blog/
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        return res.status(200).json({
            message: "All blogs fetched successfully",
            success: true,
            blogs
        });
        
    } catch (error) {
        console.log("Error in getting all blogs:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
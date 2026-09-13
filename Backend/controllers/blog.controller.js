import { Blog } from "../models/blog.model.js";
import { createBlogSchema, updateBlogSchema } from "../validators/blog.validator.js";


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
// Pagination Feature
// Limit -- 5 Blogs on each page
export const getAllBlogs = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;

        const skip = (page - 1) * limit;

        const blogs = await Blog.find()
                        .sort({createdAt: -1})
                        .skip(skip)
                        .limit(limit)
        
        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        return res.status(200).json({
            success:true,
            blogs,
            pagination: {
                currentPage: page,
                totalBlogs,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
        
    } catch (error) {
        console.log("Error in getting all blogs:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// GET: /api/blog/my-blogs
export const myBlogs = async (req, res) => {
    try {

        const userId = req.user;

        const my_blogs = await Blog.find({author: userId._id})

        return res.status(200).json({
            message: "All my-blogs fetched successfully",
            success: true,
            my_blogs
        });
        
    } catch (error) {
        console.log("Error in getting my-blogs:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// GET: /api/blog/:id
export const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            blog
        });

    } catch (error) {
        console.log("Error in getting blogs by id:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// PATCH: /api/blog/update-blog/:id
export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        // Blog exist krta hia nhi ?
        if(!blog){
            return res.status(404).json({
                message: "Blog not found!",
                success: false
            });
        };

        const userId = req.user._id;

        // checking blogs is of the logged-in user or not
        if(blog.author.toString() !== userId.toString()){
            return res.status(403).json({
                message: "You are not allowed to update this blog",
                success: false
            });
        };

        // fronted se aaya hua data lo update krne ke liye
        const result = updateBlogSchema.safeParse(req.body);
        if(!result.success){
            return res.status(403).json({
                message: "Invalid content",
                success: false,
                error: result.error.flatten()
            });
        };

        const { title, content, category, tags} = result.data;

        // content ko update kro
        blog.title = title;
        blog.content = content;
        blog.category = category;
        blog.tags = tags;

        // updated blog ko save kro
        await blog.save();

        return res.status(200).json({
            message: "Blog Updated!",
            success: true,
            blog
        });

    } catch (error) {
        console.log("Error in updating a blog by id:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};

// DELETE: /api/blog/delete/:id
export const deleteBlog = async (req, res) => {
    try {
        // Find blog
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).json({
                message: "Blog not found!",
                success: false
            });
        };

        // Get logged in user's id
        const userId = req.user._id;
        // Check owenership
        if(blog.author.toString() !== userId.toString()){
            return res.status(403).json({
                message: "You cannot delete this blog!",
                success: false
            });
        };

        // Delete blog
        await Blog.findByIdAndDelete(blogId);

        return res.status(200).json({
            message: "Blog Deleted!",
            success: true
        });
        
    } catch (error) {
        console.log("Error in updating a blog by id:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    };
};
import { success } from "zod";
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
// Adding search feature - on title, content, category, tags
// 1st search take place then pagination
export const getAllBlogs = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const searchFilter = search
            ? {
                $or: [
                    {title: {$regex: search, $options: "i"}},
                    {content: {$regex: search, $options: "i"}},
                    {category: {$regex: search, $options: "i"}},
                    {tags: {$regex: search, $options: "i"}},

                ]
            } : {}

        const totalBlogs = await Blog.countDocuments(searchFilter);
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find(searchFilter)
                                .sort({createdAt: -1})
                                .skip(skip)
                                .limit(limit);
        
        return res.status(200).json({
            success: true,
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


/*
// GET: /api/blog/
//
// ===================== PAGINATION =====================
// Limit = 5 blogs per page
//
// Example:
// Page 1 → blogs 1-5
// Page 2 → blogs 6-10
// Page 3 → blogs 11-15
//
// Formula:
// skip = (page - 1) × limit
//
// =======================================================
//
// ======================= SEARCH ========================
// Search will happen on:
// 1. title
// 2. content
// 3. category
// 4. tags
//
// $or → if search matches ANY of the above fields,
//       the blog will be returned.
//
// $regex → searches for the given text inside the field.
//
// $options: "i" → case-insensitive search
//           AI, ai, Ai, aI → all can match.
//
// =======================================================
//
// IMPORTANT:
// First SEARCH happens, then PAGINATION.
//
// Example:
// Total blogs = 100
// Search = "AI"
// Matching blogs = 17
// Then pagination is applied on those 17 blogs.
//
// =======================================================

export const getAllBlogs = async (req, res) => {
    try {

        // Get page number from query parameter.
        // Example: /api/blog/?page=2
        //
        // req.query values are strings,
        // so Number() converts "2" → 2.
        //
        // If page is not provided, default page = 1.
        const page = Number(req.query.page) || 1;


        // We want to show only 5 blogs on each page.
        const limit = 5;


        // Get search text from query parameter.
        //
        // Example:
        // /api/blog/?search=AI
        //
        // req.query.search → "AI"
        //
        // If search is not provided,
        // search becomes an empty string.
        const search = req.query.search || "";


        // Calculate how many blogs MongoDB should skip.
        //
        // Page 1 → (1 - 1) × 5 = 0
        // Page 2 → (2 - 1) × 5 = 5
        // Page 3 → (3 - 1) × 5 = 10
        //
        // This is how pagination knows where to start.
        const skip = (page - 1) * limit;


        // ================= SEARCH FILTER =================
        //
        // If search text exists:
        // create a MongoDB filter.
        //
        // If search is empty:
        // use {} → meaning no filter,
        // so all blogs can be returned.
        const searchFilter = search
            ? {
                $or: [

                    // Search inside title
                    { title: { $regex: search, $options: "i" } },

                    // Search inside content
                    { content: { $regex: search, $options: "i" } },

                    // Search inside category
                    { category: { $regex: search, $options: "i" } },

                    // Search inside tags
                    { tags: { $regex: search, $options: "i" } }
                ]
            }
            : {};


        // ================= TOTAL BLOGS ==================
        //
        // Count only the blogs that match the search filter.
        //
        // Example:
        // Total blogs = 100
        // Search = "AI"
        // Matching blogs = 17
        //
        // totalBlogs = 17
        //
        // IMPORTANT:
        // We use searchFilter here so that
        // totalPages is calculated according to
        // the SEARCH RESULTS, not all blogs.
        const totalBlogs = await Blog.countDocuments(searchFilter);


        // ================= TOTAL PAGES ==================
        //
        // Calculate how many pages are required.
        //
        // Example:
        // totalBlogs = 17
        // limit = 5
        //
        // 17 / 5 = 3.4
        // Math.ceil(3.4) = 4
        //
        // So totalPages = 4
        const totalPages = Math.ceil(totalBlogs / limit);


        // ================= GET BLOGS ====================
        //
        // First apply searchFilter.
        // Then sort newest blogs first.
        // Then skip previous blogs.
        // Finally return only 5 blogs.
        //
        // FLOW:
        //
        // Search
        //   ↓
        // Sort
        //   ↓
        // Skip
        //   ↓
        // Limit
        //
        const blogs = await Blog.find(searchFilter)
            .sort({ createdAt: -1 }) // Newest blogs first
            .skip(skip)              // Skip previous pages
            .limit(limit);           // Maximum 5 blogs


        // ================= RESPONSE =====================
        //
        // Send blogs + pagination information
        // back to frontend.
        return res.status(200).json({
            success: true,
            blogs,

            pagination: {

                // Current page user is viewing
                currentPage: page,

                // Number of blogs matching the search
                totalBlogs,

                // Total pages available
                totalPages,

                // true → Next button can be enabled
                // false → Next button should be disabled
                hasNextPage: page < totalPages,

                // true → Previous button can be enabled
                // false → Previous button should be disabled
                hasPrevPage: page > 1
            }
        });


    } catch (error) {

        // If any unexpected error occurs
        console.log("Error in getting all blogs:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
*/

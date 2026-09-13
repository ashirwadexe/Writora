import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, myBlogs, updateBlog } from '../controllers/blog.controller.js';
const router = express.Router();

router.route("/create-blog").post(isAuthenticated, createBlog);
router.route("/").get(getAllBlogs);
router.route("/my-blogs").get(isAuthenticated, myBlogs);
router.route("/:id").get(getBlogById);
router.route("/update/:id").patch(isAuthenticated, updateBlog);
router.route("/delete/:id").delete(isAuthenticated, deleteBlog)

export default router
import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getBlogStats, myBlogs, updateBlog } from '../controllers/blog.controller.js';
import upload from '../middleware/upload.js';
import optionalAuth from '../middleware/optionalAuth.js';
const router = express.Router();

router.route("/create-blog").post(isAuthenticated, upload.single("image"), createBlog);
router.route("/").get(optionalAuth ,getAllBlogs);
router.route("/my-blogs").get(isAuthenticated, myBlogs);
router.route("/stats").get(getBlogStats)
router.route("/:id").get(getBlogById);
router.route("/update/:id").patch(isAuthenticated, upload.single("image"), updateBlog);
router.route("/delete/:id").delete(isAuthenticated, deleteBlog)

export default router
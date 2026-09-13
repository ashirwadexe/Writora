import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createBlog, getAllBlogs, myBlogs } from '../controllers/blog.controller.js';
const router = express.Router();

router.route("/create-blog").post(isAuthenticated, createBlog);
router.route("/").get(getAllBlogs);
router.route("/my-blogs").get(isAuthenticated, myBlogs);

export default router
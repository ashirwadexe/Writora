
import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { generateBlog, summarizeBlog } from "../controllers/ai.controller.js";

const router = express.Router();

router.route("/write-blog").post(isAuthenticated, generateBlog);
router.route("/summarize/:blogId").post(isAuthenticated, summarizeBlog);

export default router;

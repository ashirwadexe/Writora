import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { likeBlog, unlikeBlog } from "../controllers/like.controller.js";
const router = express.Router();

router.route("/:blogId").post(isAuthenticated, likeBlog);
router.route("/:blogId").delete(isAuthenticated, unlikeBlog);

export default router;
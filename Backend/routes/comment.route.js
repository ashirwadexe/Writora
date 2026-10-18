import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createComment, getAllComments } from "../controllers/comment.controller.js";
const router = express.Router();

router.route("/:blogId/comments").post(isAuthenticated, createComment);
router.route("/:blogId/comments").get(getAllComments);

export default router;
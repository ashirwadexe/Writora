import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createComment, deleteComment, getAllComments } from "../controllers/comment.controller.js";
const router = express.Router();

router.route("/:blogId/comments").post(isAuthenticated, createComment);
router.route("/:blogId/comments").get(getAllComments);
router.route("/:commentId/delete").delete(isAuthenticated, deleteComment);

export default router;
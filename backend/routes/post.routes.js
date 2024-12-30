import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/:postId", protectedRoute, getPost);
router.post("/", protectedRoute, createPost);
router.delete("/:postId", protectedRoute, deletePost);
router.post("/like/:postId", protectedRoute, likeUnlikePost);
router.post("/comment/:postId", protectedRoute, commentOnPost);

export default router;

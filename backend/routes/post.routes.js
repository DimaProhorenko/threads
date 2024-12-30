import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
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

export default router;

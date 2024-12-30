import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  createPost,
  deletePost,
  getPost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", protectedRoute, createPost);
router.delete("/:postId", protectedRoute, deletePost);
router.get("/:postId", protectedRoute, getPost);

export default router;

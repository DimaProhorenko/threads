import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { createPost, getPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", protectedRoute, createPost);
router.get("/:postId", protectedRoute, getPost);

export default router;

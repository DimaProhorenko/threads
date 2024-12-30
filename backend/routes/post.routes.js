import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", protectedRoute, createPost);

export default router;

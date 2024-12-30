import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { followUnfollow } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/follow/:id", protectedRoute, followUnfollow);

export default router;

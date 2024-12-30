import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  followUnfollow,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/follow/:id", protectedRoute, followUnfollow);
router.post("/update", protectedRoute, updateProfile);

export default router;

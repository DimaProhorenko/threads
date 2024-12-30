import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  followUnfollow,
  getProfile,
  getProfileByUsername,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/follow/:id", protectedRoute, followUnfollow);
router.post("/update", protectedRoute, updateProfile);
router.get("/profile", protectedRoute, getProfile);
router.get("/profile/:username", protectedRoute, getProfileByUsername);

export default router;

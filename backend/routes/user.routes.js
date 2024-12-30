import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  followUnfollow,
  getProfile,
  getProfileById,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/follow/:id", protectedRoute, followUnfollow);
router.post("/update", protectedRoute, updateProfile);
router.get("/profile", protectedRoute, getProfile);
router.get("/profile/:id", protectedRoute, getProfileById);

export default router;

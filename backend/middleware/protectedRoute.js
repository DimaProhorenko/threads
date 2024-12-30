import jwt from "jsonwebtoken";
import { sendServerError } from "../utils/errors.js";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user._doc;
    next();
  } catch (error) {
    sendServerError(error);
  }
};

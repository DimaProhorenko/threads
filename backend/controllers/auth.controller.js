import User from "../models/user.model.js";
import { generateAndSetCookie } from "../utils/cookies.js";
// import { sendServerError } from "../utils/errors.js";
import {
  sendErrorResponse,
  sendResponse,
  sendServerError,
} from "../utils/responseHandler.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return sendErrorResponse(res, 400, "All fields are Required");
    }

    if (password.length < 6) {
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 6 characters"
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser?.username === username) {
      return sendErrorResponse(res, 409, "Username already exists");
    }
    if (existingUser?.email === email) {
      return sendErrorResponse(res, 409, "Email already exists");
    }

    const user = new User({
      name,
      username,
      email,
      password,
    });

    const newUser = await user.save();
    if (!newUser) {
      return sendErrorResponse(res, 400, "Invalid data");
    }
    generateAndSetCookie(user._id, res);

    return sendResponse(res, 201, "success", "User Created", {
      ...newUser._doc,
      password: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    if (password.length < 6) {
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 6 characters"
      );
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return sendErrorResponse(res, 404, "User not found");
    }

    const passwordsMatch = await existingUser.comparePasswords(password);

    if (!passwordsMatch) {
      return sendErrorResponse(res, 401, "Password is incorrect");
    }

    generateAndSetCookie(existingUser._id, res);
    return sendResponse(res, 200, "Success", "Logged in successfully", {
      ...existingUser._doc,
      password: null,
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return sendResponse(res, 200, "Success", "Logged out successfully");
    // res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    sendServerError(res, error);
  }
};

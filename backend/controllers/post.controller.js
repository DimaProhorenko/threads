import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import {
  sendErrorResponse,
  sendResponse,
  sendServerError,
} from "../utils/responseHandler.js";

export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    let uploadedImage = "";

    if (!text.trim()) {
      return sendErrorResponse(res, 400, "Text field is required");
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      uploadedImage = uploadedResponse.secure_url;
    }

    const post = new Post({
      text,
      creator: req.user._id,
      image: uploadedImage,
    });

    await post.save();

    return sendResponse(res, 200, "success", "Post created", post);
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return sendErrorResponse(res, 404, "Post not found");
    }
    return sendResponse(res, 200, "Success", "Post retrieved", post);
  } catch (error) {
    sendServerError(res, error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return sendErrorResponse(res, 404, "Post not found");
    }

    if (postId !== post.creator.toString()) {
      return sendErrorResponse(res, 403, "You are not the owner");
    }

    await post.deleteOne();

    return sendResponse(res, 200, "Success", "Post Deleted");
  } catch (error) {
    sendServerError(res, error);
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return sendErrorResponse(res, 404, "Post not found");
    }

    const isLiked = post.likes.includes(req.user._id.toString());
    if (isLiked) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );

      await post.save();
      return sendResponse(res, 200, "Success", "Post unliked");
    }

    post.likes.push(req.user._id);
    await post.save();

    return sendResponse(res, 200, "Success", "Post liked");
  } catch (error) {
    sendServerError(res, error);
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return sendErrorResponse(res, 404, "Post not found");
    }

    if (!text || text.trim().length < 1) {
      return sendErrorResponse(res, 400, "Enter comment text");
    }

    post.replies.push({ userId: req.user._id, text });
    await post.save();
    return sendResponse(res, 200, "Success", "Commented");
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    const posts = await Post.find({ creator: { $in: user.following } })
      .populate({
        path: "creator",
        select: "username name profileImage",
      })
      .sort({
        createdAt: -1,
      });
    return sendResponse(res, 200, "Success", "Posts fetched", posts);
  } catch (error) {
    sendServerError(res, error);
  }
};

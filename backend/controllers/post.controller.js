import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { sendServerError } from "../utils/errors.js";

export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    let uploadedImage = "";

    if (!text.trim()) {
      return res.status(400).json({ msg: "Text field is required" });
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

    return res.status(200).json({ data: post });
  } catch (error) {
    sendServerError(error, res);
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(200).json({ data: post });
  } catch (error) {
    sendServerError(error, res);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (postId !== post.creator.toString()) {
      return res.status(403).json({ msg: "You are not the owner" });
    }

    await post.deleteOne();

    return res.status(200).json({ msg: "Post deleted" });
  } catch (error) {}
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const isLiked = post.likes.includes(req.user._id.toString());
    if (isLiked) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );

      await post.save();
      return res.status(200).json({ msg: "Post unliked" });
    }

    post.likes.push(req.user._id);
    await post.save();

    return res.status(200).json({ msg: "Post liked" });
  } catch (error) {
    sendServerError(error, res);
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (!text || text.trim().length < 1) {
      return res.status(400).json({ msg: "Enter comment text" });
    }

    post.replies.push({ userId: req.user._id, text });
    await post.save();
    return res.status(200).json({ msg: "Commented" });
  } catch (error) {
    sendServerError(error, res);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const posts = await Post.find({ creator: { $in: user.following } })
      .populate({
        path: "creator",
        select: "username name profileImage",
      })
      .sort({
        createdAt: -1,
      });
    return res.status(200).json({ data: posts });
  } catch (error) {
    sendServerError(error, res);
  }
};

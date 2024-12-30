import Post from "../models/post.model.js";
import { sendServerError } from "../utils/errors.js";

export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    const post = new Post({ text, creator: req.user._id });

    if (!text.trim()) {
      return res.status(400).json({ msg: "Text field is required" });
    }
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

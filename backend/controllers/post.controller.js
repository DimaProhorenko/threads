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

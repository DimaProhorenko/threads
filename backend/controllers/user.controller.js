import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import { sendServerError } from "../utils/errors.js";
import { sendUserProfile } from "../helpers/user.helper.js";

export const followUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id).select("-password");

    if (!userToModify) {
      return res.status(404).json({ msg: "User not found" });
    }

    const currentUser = await User.findById(req.user._id).select("-password");
    if (!currentUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (followId) => followId.toString() !== id
      );
      userToModify.followers = userToModify.followers.filter(
        (followId) => followId.toString() !== currentUser._id.toString()
      );

      await currentUser.save();
      await userToModify.save();

      return res.status(200).json({ msg: "User unfollowed" });
    }
    currentUser.following.push(id);
    userToModify.followers.push(currentUser._id);

    await currentUser.save();
    await userToModify.save();
    return res.status(200).json({ msg: "User followed" });
  } catch (error) {
    sendServerError(error, res);
  }
};

export const getProfile = async (req, res) => {
  sendUserProfile(res, req.user._id);
};

export const getProfileById = async (req, res) => {
  const { id } = req.params;
  sendUserProfile(res, id);
};

export const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    sendServerError(error, res);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, username, bio, email, password, newPassword, profileImage } =
      req.body;
    let uploadedImage = "";

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (password && newPassword) {
      if (newPassword.length < 6 || password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });
      }
      const isPasswordMatch = await user.comparePasswords(password);

      if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Old Passwords must match" });
      }
      user.password = password;
    }

    if (profileImage) {
      const uploadedResponse = await cloudinary.uploader.upload(profileImage);
      uploadedImage = uploadedResponse.secure_url;

      if (user.profileImage) {
        await cloudinary.uploader.destroy(
          user.profileImage.split("/").pop().split(".")[0]
        );
      }
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profileImage = uploadedImage || user.profileImage;

    await user.save();

    return res.status(200).json({ data: { ...user._doc, password: null } });
  } catch (error) {
    sendServerError(error, res);
  }
};

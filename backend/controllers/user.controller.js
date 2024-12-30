import User from "../models/user.model.js";
import { sendServerError } from "../utils/errors.js";

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
    sendServerError(error);
  }
};

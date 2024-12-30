import User from "../models/user.model.js";

/**
 * Fetches a user profile by ID and sends the response.
 * @param {object} res - The response object to send data.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<void>} - Sends the response directly.
 */
export const sendUserProfile = async (res, userId) => {
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      msg: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

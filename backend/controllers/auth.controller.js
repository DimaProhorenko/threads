import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser?.username === username) {
      return res.status(409).json({ msg: "Username already exists" });
    }
    if (existingUser?.email === email) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const user = new User({
      name,
      username,
      email,
      password,
    });
    await user.save();
    return res.status(200).json({ msg: "Success", data: { ...user._doc } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
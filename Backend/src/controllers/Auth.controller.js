import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/User.schema.js";
import "dotenv/config.js";

// REGISTER

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN

export const Login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate inputs
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30m";

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // 5. Return response
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error); // 🔍 Debug the actual server error
    return res.status(500).json({ message: "Server error" });
  }
};

// FETCH ALL USERS
export const FetchAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch All Users Error:", error); // 🔍 Debug the actual server error
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE PROFILE

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const updates = {
      name: req.body.name,
      username: req.body.username,
      age: req.body.age,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      avatar: req.body.avatar,
      isUpdated:req.body.isUpdated || false,
    };

    // Optional: only admins can change roles
    if (req.user.role === "admin" && req.body.role) {
      updates.role = req.body.role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET PROFILE

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// LOGOUT

export const Logout = async (req, res) => {
  res
    .status(200)
    .json({ message: "Logout successful, remove token on client side" });
};

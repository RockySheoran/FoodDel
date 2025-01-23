import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import "dotenv/config";
import userModel from "../models/userModel.js";

// Generate Token
const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment");
  }
  // console.log(process.env.JWT_SECRET)
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password)

    // Check if fields are missing
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate Token
    const token = createToken(userExists._id);
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Ensures cookies are sent over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks by disallowing cross-site cookie usage
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, Confirm_Password } = req.body;

    // Check if fields are missing
    if (!name || !email || !password || !Confirm_Password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Check password confirmation
    if (password !== Confirm_Password) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // Create and save the user
    const newUser = new userModel({
      name,
      email,
      password: hashPass,
    });

    const user = await newUser.save();

    // Generate Token
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Ensures cookies are sent over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks by disallowing cross-site cookie usage
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { loginUser, registerUser };

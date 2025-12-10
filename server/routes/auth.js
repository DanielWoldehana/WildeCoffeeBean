import express from "express";
import { User, Order } from "../models/index.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { isValidEmail, validatePassword, errorResponse } from "../utils/validation.js";
import { authenticate, generateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/auth/signup
 * Create a new user account
 */
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, phone } = req.body;
    const errors = [];

    // Validate required fields
    if (!firstName || !firstName.trim()) {
      errors.push("First name is required");
    }
    if (!lastName || !lastName.trim()) {
      errors.push("Last name is required");
    }
    if (!email || !email.trim()) {
      errors.push("Email is required");
    } else if (!isValidEmail(email)) {
      errors.push("Invalid email format");
    }
    if (!password) {
      errors.push("Password is required");
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        errors.push(passwordValidation.message);
      }
    }
    if (!confirmPassword) {
      errors.push("Please confirm your password");
    } else if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }
    if (!phone || !phone.trim()) {
      errors.push("Phone number is required");
    }

    if (errors.length > 0) {
      return errorResponse(res, 400, "Validation failed", errors);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return errorResponse(res, 409, "Email already registered");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone.trim(),
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString());

    // Set cookie (optional, for httpOnly cookie support)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user data (without password) and token
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    return res.status(201).json({
      success: true,
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return errorResponse(res, 500, "Failed to create account", error.message);
  }
});

/**
 * POST /api/auth/signin
 * Sign in with email and password
 */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = [];

    // Validate required fields
    if (!email || !email.trim()) {
      errors.push("Email is required");
    } else if (!isValidEmail(email)) {
      errors.push("Invalid email format");
    }
    if (!password) {
      errors.push("Password is required");
    }

    if (errors.length > 0) {
      return errorResponse(res, 400, "Validation failed", errors);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return errorResponse(res, 404, "Email not found");
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid password");
    }

    // Generate token
    const token = generateToken(user._id.toString());

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user data (without password) and token
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    return res.json({
      success: true,
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return errorResponse(res, 500, "Failed to sign in", error.message);
  }
});

/**
 * POST /api/auth/signout
 * Sign out (invalidate session)
 */
router.post("/signout", authenticate, async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("token");
    
    return res.json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    console.error("Signout error:", error);
    return errorResponse(res, 500, "Failed to sign out", error.message);
  }
});

/**
 * GET /api/auth/me
 * Get current user information
 */
router.get("/me", authenticate, async (req, res) => {
  try {
    const userData = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      createdAt: req.user.createdAt,
    };

    return res.json({
      success: true,
      data: {
        user: userData,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);
    return errorResponse(res, 500, "Failed to get user information", error.message);
  }
});

/**
 * GET /api/auth/orders
 * Get current user's orders
 */
router.get("/orders", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find orders by userId (preferred) or by email (for backward compatibility)
    const orders = await Order.find({
      $or: [
        { userId: userId },
        { "customer.email": req.user.email },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 orders

    return res.json({
      success: true,
      data: {
        orders,
      },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return errorResponse(res, 500, "Failed to get orders", error.message);
  }
});

export default router;


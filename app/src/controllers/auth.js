const { Op } = require("sequelize");

const { User } = require("../models");
const { generateToken } = require("../middleware/auth");

/**
 * Controller for user registration / account creation
 *
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    // Extract data from request body
    const { username, email, password } = req.body;

    // Validation, business logic, database calls

    // Confirm all required fields were provided
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email, and password are required",
      });
    }

    // Check if user already exists (by username or email)
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Create a new user
    const user = await User.create({
      username,
      email,
      password_hash: password, // Password is hashed automatically by hooks
    });

    const token = generateToken(user.id);

    // Send response back
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Server error durring registration",
    });
  }
};

/**
 * Controller for user login / authenticating an existing user
 *
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    // Extract data from request body
    const { email, password } = req.body;

    // Validation, business logic, database calls

    // Confirm all required fields were provided
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Validate the provided password
    const passwordValid = await user.validatePassword(password);

    if (!passwordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Generate new JWT
    const token = generateToken(user.id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Server error durring login",
    });
  }
};

module.exports = { register, login };

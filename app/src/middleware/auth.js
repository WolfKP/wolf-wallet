const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Knows to look for index.js

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to verify JWT
 *
 * The token is extracted from the Authorization header and checked. Its corresponding user is pulled form the database
 * and attached to the request for use by the controller.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get part after "Bearer "

  // With no token, the request is unauthorized
  if (!token) {
    return res.sendStatus(401);
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // If the token fails to verify, the request is unauthorized
    return res.sendStatus(401);
  }

  // Get the user from the database, using the decoded id
  let user;
  try {
    user = await User.findByPk(payload.userId);
  } catch (error) {
    return res.sendStatus(500);
  }

  if (!user) {
    return res.sendStatus(401);
  }

  req.user = user;

  next();
};

/**
 * Helper function to generate JWT
 *
 * This is called after successful login or registration to create a JWT.
 *
 * @param {*} userId
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
   );
};

module.exports = {
  authenticateToken,
  generateToken
};

const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Knows to look for index.js

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to verify JWT
 *
 * The token is extracted from the Authorization header and checked. It's corresponding user is pulled form the database
 * and attached to the request for use by the controller.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticateToken = async (req, res, next) => {
  try {

  } catch (error) {

  }
};

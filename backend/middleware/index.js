const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const { handleStatusCode, BaseApiResponse } = require("../utils/index");

const authMiddleware = (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      const status = StatusCodes.UNAUTHORIZED;
      const baseApiResponse = BaseApiResponse.failure(
        "Access denied. No token provided.",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    const status = StatusCodes.UNAUTHORIZED;
    const baseApiResponse = BaseApiResponse.failure(
      "Invalid or expired token",
      [],
      status
    );
    return handleStatusCode(res, baseApiResponse, status);
  }
};

module.exports = authMiddleware;

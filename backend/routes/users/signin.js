const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { signin } = require("../../controllers/users/authController");
// sign in api route
router.post(
  "/sign-in",
  [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("must be email"),
    body("password").notEmpty().withMessage("password is required"),
  ],
  signin
);

module.exports = router;

const express = require("express");
const { body } = require("express-validator");
const { signup } = require("../../controllers/users/authController");
const router = express.Router();
// Sign up api route
router.post(
  "/sign-up",
  [
    body("firstName").notEmpty().withMessage("first name is required"),
    body("lastName").optional(),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("must be email type"),
    body("password").notEmpty().withMessage("password is required"),
  ],
  signup
);

module.exports = router;

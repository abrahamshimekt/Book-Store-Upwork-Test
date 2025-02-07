const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../../middleware");
const updateBook = require("../../controllers/books/updateBookController");
const router = express.Router();
// update book API route
router.patch(
  "/update-book/:id",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive number"),
  ],
  updateBook
);
module.exports = router;

const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../../middleware");
const addBook = require("../../controllers/books/addBookController");
const router = express.Router();
// add book api route
router.post(
  "/add-book",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("ISBN")
      .notEmpty()
      .withMessage("ISBN is required")
      .isAlphanumeric()
      .withMessage("ISBN must be alphanumeric"),
    body("author").notEmpty().withMessage("Author is required"),
    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive number"),
  ],
  addBook
);

module.exports = router;

const express = require("express");
const authMiddleware = require("../../middleware");
const getAllBooks = require("../../controllers/books/getAllBooksController");
const router = express();
// get all books api route
router.get("/get-all-books", authMiddleware, getAllBooks);
module.exports = router;

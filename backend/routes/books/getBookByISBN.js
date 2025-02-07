const express = require("express");
const authMiddleware = require("../../middleware");
const getBookByISBN = require("../../controllers/books/getBookByISBNController");
const router = express.Router();
// get books by ISBN API route
router.get("/get-book-by-ISBN", authMiddleware, getBookByISBN);
module.exports = router;

const express = require("express");
const authMiddleware = require("../../middleware");
const deleteBook = require("../../controllers/books/deleteBookController");
const router = express.Router();
// delete book api route
router.delete("/delete-book/:ISBN", authMiddleware, deleteBook);
module.exports = router;

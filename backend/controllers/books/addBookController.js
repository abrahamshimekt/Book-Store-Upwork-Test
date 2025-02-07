const { StatusCodes } = require("http-status-codes");
const { BaseApiResponse, handleStatusCode } = require("../../utils/index");
const Book = require("../../models/books");
const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");
// add book controller
const addBook = async (req, res) => {
  try {
    // validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Validation error",
        errors.array(),
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const { title, ISBN, author, quantity } = req.body;
    // check author Id
    if (!mongoose.Types.ObjectId.isValid(author)) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        `Invalid author Id type`,
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const isISBNAlreadyExist = await Book.findOne({ ISBN }).select("-__v").lean();
    // ISNB is unique
    if (isISBNAlreadyExist) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Book ISBN already exist",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const newBook = await Book.create({ title, ISBN, author, quantity });
    // Check if book was not created 
    if (!newBook) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Failed to create book",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const status = StatusCodes.OK;

    const baseApiResponse = BaseApiResponse.success(
      newBook,
      "Created Successfuly",
      status
    );
    return handleStatusCode(res, baseApiResponse, status);
  } catch (error) {
    const status = StatusCodes.INTERNAL_SERVER_ERROR;
    const baseApiResponse = BaseApiResponse.failure(error?.message, [], status);
    return handleStatusCode(res, baseApiResponse, status);
  }
};

module.exports = addBook;
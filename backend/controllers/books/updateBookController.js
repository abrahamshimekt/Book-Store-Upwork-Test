const { validationResult } = require("express-validator");
const { BaseApiResponse, handleStatusCode } = require("../../utils/index");
const { default: mongoose } = require("mongoose");
const Book = require("../../models/books");
const { StatusCodes } = require("http-status-codes");

const updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    // check validation errors
    if (!errors.isEmpty()) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Validation error",
        errors.array(),
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const { id } = req.params;
    // check book id type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        `Invalid book Id type`,
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const { title, author, quantity } = req.body;
    // check author id type
    if (!mongoose.Types.ObjectId.isValid(author)) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        `Invalid author Id type`,
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const book = await Book.findById(id).select("-__v").lean();
    // check if the book was not found 
    if (!book) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        `Book with ${id} doesn't exist`,
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    // update the book by its id
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, quantity },
      { new: true }
    );
    // check if update was not success
    if (!updatedBook) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Failed to update the book",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const status = StatusCodes.OK;
    const baseApiResponse = BaseApiResponse.success(
      updatedBook,
      "Updated Successfuly",
      status
    );
    return handleStatusCode(res, baseApiResponse, status);
  } catch (error) {
    const status = StatusCodes.INTERNAL_SERVER_ERROR;
    const baseApiResponse = BaseApiResponse.failure(error?.message, [], status);
    return handleStatusCode(res, baseApiResponse, status);
  }
};

module.exports = updateBook;

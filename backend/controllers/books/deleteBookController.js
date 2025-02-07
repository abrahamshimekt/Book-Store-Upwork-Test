const { StatusCodes } = require("http-status-codes");
const Book = require("../../models/books");
const { BaseApiResponse, handleStatusCode } = require("../../utils/index");

const deleteBook =async (req, res) => {
    try {
      const { ISBN } = req.params;
      const book = await Book.findOne({ISBN}).select("-__v").lean();
      // check if the book with given ISBN was found
      if (!book) {
        const status = StatusCodes.BAD_REQUEST;
        const baseApiResponse = BaseApiResponse.failure(
          "Book Not Found",
          [],
          status
        );
        return handleStatusCode(res, baseApiResponse, status);
      }
      // delete book by ISBN
      await Book.deleteOne({ISBN});
      const status = StatusCodes.OK;
      const baseApiResponse = BaseApiResponse.success(
        book,
        "Book deleted successfully",
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    } catch (error) {
      const status = StatusCodes.INTERNAL_SERVER_ERROR;
      const baseApiResponse = BaseApiResponse.failure(error?.message|| "Internal Server Error", [], status);
      return handleStatusCode(res, baseApiResponse, status);
    }
  }

  module.exports = deleteBook;
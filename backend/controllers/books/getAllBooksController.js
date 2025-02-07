const { StatusCodes } = require("http-status-codes");
const Book = require("../../models/books");
const { BaseApiResponse, handleStatusCode } = require("../../utils/index");
const redisClient = require("../../config/redis");
const getAllBooks = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);
    let books = [];
    // if page size and page number are specified
    if (pageSize && pageNumber) {
      const cacheKey = `books:page=${pageNumber}:size=${pageSize}`;
      // fetch cached data from redis
      const cachedBooks = await redisClient.get(cacheKey);
      if (cachedBooks) {
        books = JSON.parse(cachedBooks);
      } else {
        const skip = (pageNumber - 1) * pageSize;
        books = await Book.find()
          .skip(skip)
          .limit(pageSize)
          .select("-__v")
          .lean();
      }
      // cache if no cached data exist with given page size and page number
      await redisClient.setEx(cacheKey, 60, JSON.stringify(books));
    } else {
      books = await Book.find().select("-__v").lean();
    }
    // check if there are books
    if (!books || books.length === 0) {
      const status = StatusCodes.NOT_FOUND;
      const baseApiResponse = BaseApiResponse.failure(
        `No books Found`,
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    
    const status = StatusCodes.OK;
    const baseApiResponse = BaseApiResponse.success(
      books,
      "Retrieved Successfuly",
      status
    );
    return handleStatusCode(res, baseApiResponse, status);
  } catch (error) {
    const status = StatusCodes.INTERNAL_SERVER_ERROR;
    const baseApiResponse = BaseApiResponse.failure(error?.message, [], status);
    return handleStatusCode(res, baseApiResponse, status);
  }
};

module.exports = getAllBooks;

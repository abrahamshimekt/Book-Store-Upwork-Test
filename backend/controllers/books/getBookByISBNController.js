const { StatusCodes } = require("http-status-codes");
const Book = require("../../models/books");
const { BaseApiResponse, handleStatusCode } = require("../../utils/index");
const redisClient = require("../../config/redis");

const getBookByISBN = async (req, res) => {
  try {
    const { ISBN } = req.query;
    // fetch cached data from redis
    const cachedBook = await redisClient.get(`book:${ISBN}`);
    if (cachedBook) {
      const status = StatusCodes.OK;
      const baseApiResponse = BaseApiResponse.success(
        JSON.parse(cachedBook),
        `Retrieved from cache`,
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const book = await Book.findOne({ ISBN: ISBN }).select("-__v").lean();
    // check if no book found
    if (!book) {
      const status = StatusCodes.NOT_FOUND;
      const baseApiResponse = BaseApiResponse.failure(
        `Book with ${ISBN} Not Found`,
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    // cache the book by its ISBN on redis
    await redisClient.setEx(`book:${ISBN}`, 3600, JSON.stringify(book));
    const status = StatusCodes.OK;
    const baseApiResponse = BaseApiResponse.success(
      book,
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

module.exports = getBookByISBN;

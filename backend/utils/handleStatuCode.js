const { StatusCodes } = require("http-status-codes");
// http status code handler
const handleResponseStatusCode = (res,payload, statusCode) => {
  switch (statusCode) {
    case StatusCodes.OK:
      return res.status(StatusCodes.OK).json(payload);
    case StatusCodes.CREATED:
      return res.status(StatusCodes.CREATED).json(payload);
    case StatusCodes.BAD_REQUEST:
      return res.status(StatusCodes.BAD_REQUEST).json(payload);
    case StatusCodes.UNAUTHORIZED:
      return res.status(StatusCodes.UNAUTHORIZED).json(payload);
    case StatusCodes.FORBIDDEN:
      return res.status(StatusCodes.FORBIDDEN).json(payload);
    case StatusCodes.NOT_FOUND:
      return res.status(StatusCodes.NOT_FOUND).json(payload);
    default:
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(payload);
  }
};

module.exports = handleResponseStatusCode;

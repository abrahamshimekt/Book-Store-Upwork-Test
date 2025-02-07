const { validationResult } = require("express-validator");
const { BaseApiResponse, handleStatusCode } = require("../../utils/index");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
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
    const { firstName, lastName, email, password } = req.body;
    const isEmailAlreadyExist = await User.findOne({ email })
      .select("-__v")
      .lean();
    // check if user email was registered
    if (isEmailAlreadyExist) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Email already exist",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    // encrypt user password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user in mongodb
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    // check if user was not created 
    if (!newUser) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Failed to create user",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const status = StatusCodes.OK;
    const baseApiResponse = BaseApiResponse.success(
      {
        firstName: newUser?.firstName,
        lastName: newUser?.lastName,
        email: newUser?.email,
      },
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
const signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    // check if there are any validation errors
    if (!errors.isEmpty()) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Validation error",
        errors.array(),
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("-__v");
    // check if user was not found by email
    if (!user) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Email or password is wrong",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    // if user is found by email ,check user password and input password are the same
    const isPasswordSame = await bcrypt.compare(password, user?.password);
    if (!isPasswordSame) {
      const status = StatusCodes.BAD_REQUEST;
      const baseApiResponse = BaseApiResponse.failure(
        "Email or password is wrong",
        [],
        status
      );
      return handleStatusCode(res, baseApiResponse, status);
    }
    // generate token once user input password is correct 
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const status = StatusCodes.OK;
    const baseApiResponse = BaseApiResponse.success(
      { user, token },
      "User Signed in successfuly",
      status
    );
    return handleStatusCode(res, baseApiResponse, status);
  } catch (error) {
    const status = StatusCodes.INTERNAL_SERVER_ERROR;
    const baseApiResponse = BaseApiResponse.failure(error?.message, [], status);
    return handleStatusCode(res, baseApiResponse, status);
  }
};

module.exports = { signup, signin };

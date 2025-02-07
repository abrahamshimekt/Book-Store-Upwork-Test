const mongoose = require("mongoose");
//user Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, index: true },
    lastName: { type: String },
    email: { type: String, require: true, unique: true, index: true },
    password: { type: String, require: true },
  },
  // added to exclude password from to object and to json
  {
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  }
);
module.exports = new mongoose.model("users", userSchema);

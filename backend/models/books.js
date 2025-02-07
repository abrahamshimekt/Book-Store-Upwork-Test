const mongoose = require("mongoose");
// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true,index:true },
  ISBN: { type: String, required: true, unique: true ,index:true},
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  quantity: { type: Number, default: 0 },
});

module.exports = new mongoose.model("books", bookSchema);

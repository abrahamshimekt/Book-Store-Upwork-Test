const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/mongoDB");
require("dotenv").config();
db();
const bookRoutes = require("./routes/books/index");
const userRoutes = require("./routes/users/index");

app.use(cors());
app.use(express.json());
// Users API routes
app.use("/api/users",userRoutes.signup);
app.use("/api/users",userRoutes.signin);
// Books API routes
app.use("/api/books", bookRoutes.addBook);
app.use("/api/books", bookRoutes.updateBook);
app.use("/api/books", bookRoutes.deleteBook);
app.use("/api/books", bookRoutes.getBookByISBN);
app.use("/api/books", bookRoutes.getAllBooks);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
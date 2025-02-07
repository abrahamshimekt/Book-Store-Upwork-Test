const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB 
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

module.exports = connectDB;
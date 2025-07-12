const mongoose = require("mongoose");
require('dotenv').config();

const databaseConnection = async () => {
  try {
    // Use MongoDB Atlas connection string from environment variable
    const mongoURI = process.env.DB_URI || "mongodb://localhost:27017/Recycle";
    let base = await mongoose.connect(mongoURI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log("❌ Database connection error:", error.message);
  }
}

module.exports = databaseConnection;
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    const db = client.db("ThapaServer");
    console.log("✅ MongoDB connected successfully!");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://lavishpundir90:fqolSAW50vsMS2vX@ThapaServer.zmdqvlv.mongodb.net/ThapaServer?retryWrites=true&w=majority";
const client = new MongoClient(uri); // No need for extra options

const connectDB = async () => {
  try {
    await client.connect();
    const db = client.db("ThapaServer");
    console.log("✅ MongoDB connected successfully!");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // process.exit(1);
  }
};

module.exports = connectDB;
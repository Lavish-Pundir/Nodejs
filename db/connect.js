const mongoose = require("mongoose");

const uri = "mongodb+srv://lavishpundir90:fqolSAW50vsMS2vX@ThapaServer.zmdqvlv.mongodb.net/ThapaServer?retryWrites=true&w=majority";

// const uri = "mongodb+srv://gpundir060:gpundir060@swapdeal.hbs0jxp.mongodb.net/?retryWrites=true&w=majority&appName=swapdeal";

// const uri = "mongodb+srv://lavishpundir90:fqolSAW50vsMS2vX@ThapaServer.zmdqvlv.mongodb.net/?retryWrites=true&w=majority&appName=ThapaServer"

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully...");
  } catch (error) {
    console.error(" ❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;

// const uri = "mongodb+srv://lavishpundir90:fqolSAW50vsMS2vX@ThapaServer.zmdqvlv.mongodb.net/ThapaServer?retryWrites=true&w=majority";
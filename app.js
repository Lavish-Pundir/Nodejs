const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const path = require("path");

const port = 7000;
app.use(express.json()); // to parse JSON data

const products_routes = require("./routes/products");

let db; // Declare db globally

// Connect to MongoDB before starting the server
const start = async () => {
  try {
    db = await connectDB(); // Wait for DB connection
    app.listen(port, () => {
      console.log(`🚀 Visit http://localhost:${port} in your browser`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Fetch a document by name
app.get("/get_collection/:name", async (req, res) => {
  try {
    const collection = db.collection("users");
    const result = await collection.findOne({ name: req.params.name });

    if (!result) {
      return res.status(404).json({ message: "No document found with that name." });
    }

    res.status(200).json({ message: "Document fetched successfully!", data: result });
  } catch (err) {
    res.status(500).json({ message: "Error fetching document", error: err.message });
  }
});

// Delete a document by name
app.get("/delete_collection/:name", async (req, res) => {
  try {
    const collection = db.collection("users");
    const result = await collection.deleteOne({ name: req.params.name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No document found with that name to delete." });
    }

    res.status(200).json({ message: "Document deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting document", error: err.message });
  }
});

// Delete all documents by name
app.get("/delete_all_collections/:name", async (req, res) => {
  try {
    const collection = db.collection("users");
    const result = await collection.deleteMany({ name: req.params.name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No documents found with that name to delete." });
    }

    res.status(200).json({
      message: "Documents deleted successfully!",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting documents", error: err.message });
  }
});

// Fetch all documents by name
app.get("/get_all_collections/:name", async (req, res) => {
  try {
    const collection = db.collection("users");
    const cursor = collection.find({ name: req.params.name });
    const results = await cursor.toArray();

    if (results.length === 0) {
      return res.status(404).json({ message: "No documents found with that name." });
    }

    res.status(200).json({
      message: "Documents fetched successfully!",
      count: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching documents", error: err.message });
  }
});

// Update a document by name
app.post("/update_collection/:name", async (req, res) => {
  try {
    const collection = db.collection("users");

    const result = await collection.updateOne(
      { name: req.params.name }, // Filter
      { $set: req.body }         // Fields to update
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No document found with that name." });
    }

    res.status(200).json({
      message: "Document updated successfully!",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating document", error: err.message });
  }
});


// Insert a document into 'users' collection
app.post("/create_collection", async (req, res) => {
  try {
    const collection = db.collection("users");
    const result = await collection.insertOne(req.body);

    res.status(201).json({
      message: "Document inserted successfully!",
      result: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Error inserting document", error: err.message });
  }
});

// Use product routes
app.use("/api/products", products_routes);

// Start the server
start();
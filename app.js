
const express = require("express");
const app = express();
const connectDB = require("./db/connect");   // your own db connect file
const path = require("path");

const port =  7000;

app.use(express.json());  // to parse json data

const products_routes = require("./routes/products");

// test route
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/params/:id/:course", (req, res) => {
   res.json({ message: "data received", data: { method: "GET", data: { ...req.params } } });
});

app.get("/about", (req, res) => {
   res.json({ message: "data received", data: { method: "GET", name: req.query.name } });
});

app.post("/create", (req, res) => {
   res.json({ message: "data received", data: { ...req.body, method: "POST" } });
});

// middleware or to set router
app.use("/api/products", products_routes);

const start = async () => {
   try {
      await connectDB();   // call your custom connectDB function
      app.listen(port, () => {
         console.log(`Visit localhost:${port} in your browser`);
      });
   } catch (error) {
      console.log(error);
   }
};

start();

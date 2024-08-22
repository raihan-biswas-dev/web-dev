import cors from "cors"; // Import cors
import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create-products", async (req, res, next) => {
  const { name, price, stock, description } = req.body;

  console.log(req.body);
  try {
    const newProduct = new Product({ name, price, stock, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Send the products as JSON
  } catch (error) {
    next(error);
  }
});
app.delete("/delete-product/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});

app.put("/update-product/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, stock, description },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mern:mern@cluster1.rdjmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
    );
    console.log("Connected to the database!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();

import Product from "../../models/Product.js";

export const createProduct = async (req, res, next) => {
  const { name, price, stock, description } = req.body;

  console.log(req.body);
  try {
    const newProduct = new Product({ name, price, stock, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

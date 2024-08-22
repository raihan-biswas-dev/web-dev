import { validationResult } from 'express-validator';
import Product from '../../models/Product.js';

export const updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, stock, description } = req.body;
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (name) product.name = name;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (description) product.description = description;

        await product.save();
        res.json(product);
    } catch (error) {
        next(error);
    }
};

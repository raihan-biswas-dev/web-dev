import express from 'express';
import productsRoutes from './products.js';
import contentRoutes from './content.js';

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/content', contentRoutes);

export default router; // Ensure the default export is used

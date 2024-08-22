import express from 'express';
import { createProduct } from '../controllers/products/create.js';
import { deleteProduct } from '../controllers/products/delete.js';
import { retrieveProduct } from '../controllers/products/retrieve.js';
import { searchProducts } from '../controllers/products/search.js';
import { updateProduct } from '../controllers/products/update.js';

const router = express.Router();

router.post('/', createProduct);
router.delete('/:productId', deleteProduct);
router.get('/:productId', retrieveProduct);
router.get('/', searchProducts);
router.put('/:productId', updateProduct);

export default router;

import { Router } from 'express';
import { addProduct, editProduct, deleteProduct, getAllProduct, getOneProduct } from '../controllers/productController';

const router = Router();

router.get('/', getAllProduct);
router.get('/:id', getOneProduct);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;
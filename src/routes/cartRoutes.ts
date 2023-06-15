import { Router } from 'express';
import { getCart, setCart } from '../controllers/cartController';

const router = Router();

router.get('/', getCart);
router.put('/', setCart);

export default router;
import { Router } from 'express';
import { getAllOrders, getOneOrders, addOrder, editOrder, cancelOrder } from '../controllers/orderController';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOneOrders);
router.post('/', addOrder);
router.put('/:id', editOrder);
router.delete('/:id', cancelOrder);

export default router;
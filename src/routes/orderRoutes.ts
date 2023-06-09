import { Router } from 'express';
import { getAllOrders, getOneOrder, addOrder, addOrderForUser, editOrder, fulfillOrder, deleteOrder } from '../controllers/orderController';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOneOrder);
router.post('/', addOrder);
router.post('/:id', addOrderForUser);
router.put('/:id', editOrder);
router.put('/fulfill/:id', fulfillOrder);
router.delete('/:id', deleteOrder);

export default router;
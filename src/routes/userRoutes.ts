import { Router } from 'express';
import { createUser, getAllUsers, loginUser, setAdmin, removeAdmin } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.put('/make-admin/:id', setAdmin);
router.put('/:id', removeAdmin);


export default router;
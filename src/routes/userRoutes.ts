import { Router } from 'express';
import { createUser, getAllUsers, getUserInfo, loginUser, setAdmin, removeAdmin } from '../controllers/userController';

const router = Router();

router.get('/info', getUserInfo);
router.get('/', getAllUsers);
router.post('/login', loginUser);
router.post('/', createUser);
router.put('/make-admin/:id', setAdmin);
router.put('/:id', removeAdmin);


export default router;
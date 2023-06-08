import { Router } from 'express';
import { createUser, getAllUsers, loginUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/login', loginUser);


export default router;
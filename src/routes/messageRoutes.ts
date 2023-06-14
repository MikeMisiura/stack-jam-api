import { Router } from 'express';
import { getUserMessages, getAllMessages, createMessage, markRead, markUnread } from '../controllers/messageController';

const router = Router();

router.get('/:userId', getUserMessages);
router.get('/', getAllMessages);
router.post('/', createMessage);
router.put('/read/:id', markRead);
router.put('/unread/:id', markUnread);


export default router;
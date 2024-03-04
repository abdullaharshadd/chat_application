import express from 'express';
import { getChatsOfaUser, sendMessageToUser, createChatBetweenUsers } from '../controllers/chat.controller.js';
const router = express.Router();

router.get('/chats', getChatsOfaUser);
router.post('/create-chat', createChatBetweenUsers);
router.post('/send-message', sendMessageToUser)

export default router;
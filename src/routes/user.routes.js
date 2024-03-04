import express from 'express';
import { loginUser, signUpUser, getAllUsers } from '../controllers/user.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
const router = express.Router()

router.post('/login', loginUser)
router.post('/sign-up', signUpUser );
router.get('/all',authenticateUser, getAllUsers)

export default router;
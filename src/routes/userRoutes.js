import { Router } from 'express'
import { handleUserSignUp, handleUserLogin } from '../controllers/user.controllers.js';

const router = Router();

router.post('/', handleUserSignUp)
router.post('/login', handleUserLogin)

export default router;
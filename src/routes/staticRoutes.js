import { Router } from 'express'
import { handleServerSideRendering, handleSignupRender, handleLoginRender } from '../controllers/static.contollors.js'

const router = Router()

router.get('/', handleServerSideRendering)
router.get('/signup', handleSignupRender)
router.get('/login', handleLoginRender)

export default router;
import { Router } from 'express'
import { handleServerSideRendering, handleSignupRender, handleLoginRender, handleAllUrl } from '../controllers/static.contollors.js'
import { restrictTo } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', restrictTo(['NORMAL', 'ADMIN']), handleServerSideRendering)
router.get('/signup', handleSignupRender)
router.get('/login', handleLoginRender)
router.get('/admin/urls', restrictTo(['ADMIN']), handleAllUrl)

export default router;
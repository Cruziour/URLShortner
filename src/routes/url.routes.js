import { Router } from 'express'
import { handleNewGenerateShortURL, handleVisitShortURL, handleGetAnalytics } from '../controllers/url.controller.js'

const router = Router()

router.post('/', handleNewGenerateShortURL)
router.get('/:shortId', handleVisitShortURL)
router.get('/analytics/:shortId', handleGetAnalytics)

export default router;
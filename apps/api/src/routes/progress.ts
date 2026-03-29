import { Router, Request, Response } from 'express'
import { progressService } from '../services/progress.service'
import { auth } from '../lib/auth'
import { fromNodeHeaders } from 'better-auth/node'

const router = Router()

async function getSession(req: Request) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  return session
}

router.get('/', async (req: Request, res: Response) => {
  const session = await getSession(req)
  if (!session) { res.status(401).json({ success: false, error: 'Unauthorized' }); return }

  const data = await progressService.getByUser(session.user.id)
  res.json({ success: true, data })
})

router.post('/:slug', async (req: Request, res: Response) => {
  const session = await getSession(req)
  if (!session) { res.status(401).json({ success: false, error: 'Unauthorized' }); return }

  const { status } = req.body
  if (!['not_started', 'in_progress', 'completed'].includes(status)) {
    res.status(400).json({ success: false, error: 'Invalid status' })
    return
  }

  const data = await progressService.upsert(session.user.id, req.params.slug, status, req.body.notes)
  res.json({ success: true, data })
})

export default router

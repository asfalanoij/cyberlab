import { Router } from 'express'
import { notebookService } from '../services/notebook.service'

const router = Router()

router.get('/', async (_req, res) => {
  const notebooks = await notebookService.list()
  res.json({ success: true, data: notebooks })
})

router.get('/:slug', async (req, res) => {
  const notebook = await notebookService.getBySlug(req.params.slug)
  if (!notebook) {
    res.status(404).json({ success: false, error: 'Notebook not found' })
    return
  }
  res.json({ success: true, data: notebook })
})

export default router

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import notebookRoutes from './routes/notebooks'
import progressRoutes from './routes/progress'
import { notebookService } from './services/notebook.service'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api', authRoutes)
app.use('/api/notebooks', notebookRoutes)
app.use('/api/progress', progressRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

async function start() {
  // Seed notebook metadata
  await notebookService.seed()

  app.listen(PORT, () => {
    console.log(`CyberLab API running on http://localhost:${PORT}`)
  })
}

start()

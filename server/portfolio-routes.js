/**
 * Portfolio admin API routes
 * Mounted at /api/portfolio in studio-api
 */
import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { query } from '../db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads')

// Multer — store portfolio images in same uploads dir
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(UPLOAD_DIR, 'portfolio')),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const ext = path.extname(file.originalname)
    cb(null, `${unique}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    cb(null, allowed.includes(path.extname(file.originalname).toLowerCase()))
  },
})

const router = Router()

// Ensure uploads/portfolio directory exists
const portfolioDir = path.join(UPLOAD_DIR, 'portfolio')
if (!fs.existsSync(portfolioDir)) fs.mkdirSync(portfolioDir, { recursive: true })

// ═══════════════════════════════════════════════
// GET /api/portfolio/data — read all admin data
// ═══════════════════════════════════════════════
router.get('/data', async (_req, res) => {
  try {
    const { rows } = await query('SELECT data FROM portfolio_data WHERE id = 1')
    const data = rows.length > 0 ? rows[0].data : {}
    res.json(data)
  } catch (err) {
    console.error('GET /portfolio/data error:', err)
    res.status(500).json({ error: 'Failed to read data' })
  }
})

// ═══════════════════════════════════════════════
// PUT /api/portfolio/data — save all admin data
// ═══════════════════════════════════════════════
router.put('/data', async (req, res) => {
  try {
    await query(
      'INSERT INTO portfolio_data (id, data, updated_at) VALUES (1, $1, NOW()) ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = NOW()',
      [JSON.stringify(req.body)],
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('PUT /portfolio/data error:', err)
    res.status(500).json({ error: 'Failed to save data' })
  }
})

// ═══════════════════════════════════════════════
// POST /api/portfolio/images/upload — upload project image
// ═══════════════════════════════════════════════
router.post('/images/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const { project_id } = req.body
  if (!project_id) return res.status(400).json({ error: 'project_id required' })

  try {
    // Get current count for sort_order
    const { rows: countRows } = await query(
      'SELECT COUNT(*) FROM portfolio_images WHERE project_id = $1',
      [project_id],
    )
    const sortOrder = parseInt(countRows[0].count)

    const { rows } = await query(
      'INSERT INTO portfolio_images (project_id, filename, original_name, sort_order) VALUES ($1,$2,$3,$4) RETURNING *',
      [project_id, `portfolio/${req.file.filename}`, req.file.originalname, sortOrder],
    )

    res.status(201).json({
      id: rows[0].id,
      url: `/uploads/portfolio/${req.file.filename}`,
      filename: req.file.filename,
      original_name: req.file.originalname,
      sort_order: sortOrder,
    })
  } catch (err) {
    console.error('POST /portfolio/images/upload error:', err)
    // Clean up uploaded file on DB error
    const fp = path.join(UPLOAD_DIR, 'portfolio', req.file.filename)
    if (fs.existsSync(fp)) fs.unlinkSync(fp)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// ═══════════════════════════════════════════════
// GET /api/portfolio/images/:projectId — list images for a project
// ═══════════════════════════════════════════════
router.get('/images/:projectId', async (req, res) => {
  try {
    const { rows } = await query(
      'SELECT * FROM portfolio_images WHERE project_id = $1 ORDER BY sort_order',
      [req.params.projectId],
    )
    const images = rows.map(r => ({
      id: r.id,
      url: `/uploads/${r.filename}`,
      filename: r.filename,
      original_name: r.original_name,
      sort_order: r.sort_order,
    }))
    res.json(images)
  } catch (err) {
    console.error('GET /portfolio/images error:', err)
    res.status(500).json({ error: 'Failed to list images' })
  }
})

// ═══════════════════════════════════════════════
// DELETE /api/portfolio/images/:id
// ═══════════════════════════════════════════════
router.delete('/images/:id', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM portfolio_images WHERE id = $1', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    const img = rows[0]

    await query('DELETE FROM portfolio_images WHERE id = $1', [req.params.id])

    // Remove file from disk (non-critical)
    const fp = path.join(UPLOAD_DIR, img.filename)
    if (fs.existsSync(fp)) fs.unlinkSync(fp)

    res.json({ success: true })
  } catch (err) {
    console.error('DELETE /portfolio/images error:', err)
    res.status(500).json({ error: 'Failed to delete' })
  }
})

// ═══════════════════════════════════════════════
// PUT /api/portfolio/images/reorder
// ═══════════════════════════════════════════════
router.put('/images/reorder', async (req, res) => {
  const { project_id, image_ids } = req.body
  if (!project_id || !Array.isArray(image_ids)) {
    return res.status(400).json({ error: 'project_id and image_ids required' })
  }
  try {
    for (let i = 0; i < image_ids.length; i++) {
      await query('UPDATE portfolio_images SET sort_order = $1 WHERE id = $2 AND project_id = $3',
        [i, image_ids[i], project_id],
      )
    }
    res.json({ success: true })
  } catch (err) {
    console.error('PUT /portfolio/images/reorder error:', err)
    res.status(500).json({ error: 'Failed to reorder' })
  }
})

export default router

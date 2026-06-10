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
import { authMiddleware } from '../auth.js'

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
router.put('/data', authMiddleware, async (req, res) => {
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
router.post('/images/upload', authMiddleware, upload.single('image'), async (req, res) => {
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
router.delete('/images/:id', authMiddleware, async (req, res) => {
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
router.put('/images/reorder', authMiddleware, async (req, res) => {
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

// ═══════════════════════════════════════════════
// POST /api/portfolio/placeholder — generate SVG placeholder for new project
// ═══════════════════════════════════════════════
const CATEGORY_COLORS = {
  '数据可视化': { bg: ['#0f172a', '#1e1b4b'], accent: '#6366f1', icon: '📊' },
  '全栈应用':     { bg: ['#0f172a', '#1e293b'], accent: '#8b5cf6', icon: '🖥️' },
  '移动端':       { bg: ['#064e3b', '#0f172a'], accent: '#10b981', icon: '📱' },
  'AI 应用':      { bg: ['#0c1929', '#1a365d'], accent: '#06b6d4', icon: '🤖' },
  '默认':         { bg: ['#0f172a', '#1e293b'], accent: '#6366f1', icon: '📦' },
}

function generatePlaceholderSVG({ name, en, tags, accent, icon, bgTop, bgBottom }) {
  const tagElems = (tags || []).map((tag, i) => {
    const x = 290 + i * 80 - ((tags.length - 1) * 40)
    return `<rect x="${x - 35}" y="400" width="70" height="22" rx="6" fill="rgba(255,255,255,0.05)" stroke="${accent}" stroke-width="0.5" stroke-opacity="0.3"/><text x="${x}" y="415" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="10" font-family="sans-serif">${tag}</text>`
  }).join('')

  const dots = Array.from({length: 15}, (_, y) =>
    Array.from({length: 20}, (_, x) =>
      `<circle cx="${20 + x * 40}" cy="${20 + y * 32}" r="1" fill="white"/>`
    ).join('')
  ).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${bgTop}"/><stop offset="100%" style="stop-color:${bgBottom}"/></linearGradient></defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <g opacity="0.03">${dots}</g>
  <rect x="0" y="0" width="800" height="3" fill="${accent}" opacity="0.3"/>
  <circle cx="400" cy="200" r="80" fill="${accent}" opacity="0.06"/>
  <circle cx="400" cy="200" r="60" fill="${accent}" opacity="0.04"/>
  <text x="400" y="215" text-anchor="middle" font-size="48" font-family="sans-serif">${icon}</text>
  <text x="400" y="300" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="sans-serif" letter-spacing="4">${name}</text>
  <text x="400" y="328" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="13" font-family="sans-serif" letter-spacing="2">${en || ''}</text>
  <line x1="340" y1="350" x2="460" y2="350" stroke="${accent}" stroke-width="1" opacity="0.3"/>
  ${tagElems}
  <path d="M 750 500 L 800 450 L 800 500 Z" fill="${accent}" opacity="0.1"/>
  <path d="M 0 500 L 50 500 L 0 450 Z" fill="${accent}" opacity="0.05"/>
</svg>`
}

router.post('/placeholder', authMiddleware, async (req, res) => {
  try {
    const { project_id, name, category, tags } = req.body
    if (!project_id || !name) {
      return res.status(400).json({ error: 'project_id and name required' })
    }

    const cat = CATEGORY_COLORS[category] || CATEGORY_COLORS['默认']
    const en = name.replace(/[^\x00-\x7F]/g, '').trim() || 'New Project'
    const svg = generatePlaceholderSVG({
      name, en: en || 'New Project',
      tags: tags || [],
      accent: cat.accent, icon: cat.icon,
      bgTop: cat.bg[0], bgBottom: cat.bg[1],
    })

    // Save to uploads directory
    const portfolioDir = path.join(UPLOAD_DIR, 'portfolio')
    if (!fs.existsSync(portfolioDir)) fs.mkdirSync(portfolioDir, { recursive: true })

    const filename = `${project_id}-${Date.now()}.svg`
    const filepath = path.join(portfolioDir, filename)
    fs.writeFileSync(filepath, svg, 'utf-8')

    // Insert into DB
    const { rows } = await query(
      'INSERT INTO portfolio_images (project_id, filename, sort_order) VALUES ($1,$2,0) RETURNING *',
      [project_id, `portfolio/${filename}`],
    )

    const url = `/uploads/portfolio/${filename}`
    res.status(201).json({ id: rows[0].id, url, filename })
  } catch (err) {
    console.error('POST /portfolio/placeholder error:', err)
    res.status(500).json({ error: 'Failed to generate placeholder' })
  }
})

// ═══════════════════════════════════════════════
// PUT /api/portfolio/change-password
// ═══════════════════════════════════════════════
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' })
    }

    // Load bcrypt dynamically (ESM compat)
    const bcrypt = await import('bcryptjs').then(m => m.default || m)

    const { rows } = await query('SELECT * FROM admins WHERE id = $1', [req.user.id])
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' })

    const valid = await bcrypt.compare(currentPassword, rows[0].password)
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' })

    const hash = await bcrypt.hash(newPassword, 10)
    await query('UPDATE admins SET password = $1 WHERE id = $2', [hash, req.user.id])

    res.json({ ok: true })
  } catch (err) {
    console.error('PUT /change-password error:', err)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

export default router

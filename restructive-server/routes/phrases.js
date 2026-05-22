const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const db      = require('../db');

// ── Auth middleware ──────────────────────────────────────────
const auth = (req, res, next) => {
  const header = req.headers['authorization'];
  const token  = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized — please login' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ── GET all phrases (homepage — phrase text + owner only) ────
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.phrase, p.type, p.user_id, u.username AS owner
      FROM phrases p
      JOIN users u ON p.user_id = u.id
      WHERE p.type = 'applicant'
      ORDER BY p.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST add phrase (auth required) ─────────────────────────
router.post('/add', auth, async (req, res) => {
  const { type } = req.body;
  if (!type || !['applicant', 'coder'].includes(type))
    return res.status(400).json({ message: 'Invalid phrase type' });

  try {
    if (type === 'applicant') {
      const { talent, nationality, gender, domain, phrase, mtcn } = req.body;
      if (!talent || !nationality || !gender || !domain || !phrase || !mtcn)
        return res.status(400).json({ message: 'All applicant fields are required' });

      await db.query(
        `INSERT INTO phrases (user_id, type, talent, nationality, gender, domain, phrase, mtcn)
         VALUES (?, 'applicant', ?, ?, ?, ?, ?, ?)`,
        [req.user.id, talent, nationality, gender, domain, phrase, mtcn]
      );

    } else {
      const { service_app, nationality, domain, domain_other, phrase, segment, segment_other, actors } = req.body;
      if (!service_app || !nationality || !domain || !phrase || !segment || !actors)
        return res.status(400).json({ message: 'All coder fields are required' });

      await db.query(
        `INSERT INTO phrases (user_id, type, service_app, nationality, domain, domain_other, phrase, segment, segment_other, actors)
         VALUES (?, 'coder', ?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, service_app, nationality, domain, domain_other || null, phrase, segment, segment_other || null, actors]
      );
    }

    res.json({ message: 'Phrase submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── DELETE own phrase ────────────────────────────────────────
router.delete('/delete/:id', auth, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await db.query('SELECT user_id FROM phrases WHERE id = ?', [id]);
    if (rows.length === 0)           return res.status(404).json({ message: 'Phrase not found' });
    if (rows[0].user_id !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await db.query('DELETE FROM phrases WHERE id = ?', [id]);
    res.json({ message: 'Phrase deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
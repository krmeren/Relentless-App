const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

const authenticate = require('../middleware/auth');

// Get My Habits
router.get('/', authenticate, (req, res) => {
  db.all('SELECT * FROM habits WHERE user_id = ?', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

// Add Habit
router.post('/', authenticate, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  db.run('INSERT INTO habits (user_id, name) VALUES (?, ?)', [req.user.id, name], function (err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ id: this.lastID, user_id: req.user.id, name, status: '{}' });
  });
});

// Update Habit Status
router.put('/:id', authenticate, (req, res) => {
  const { status } = req.body; // Expect JSON string or object
  const statusStr = typeof status === 'object' ? JSON.stringify(status) : status;

  db.run('UPDATE habits SET status = ? WHERE id = ? AND user_id = ?', [statusStr, req.params.id, req.user.id], function (err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Habit not found' });
    res.json({ message: 'Updated' });
  });
});

// Delete Habit
router.delete('/:id', authenticate, (req, res) => {
  db.run('DELETE FROM habits WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], function (err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Habit not found' });
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;

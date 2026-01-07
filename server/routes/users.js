const express = require('express');
const router = express.Router();
const db = require('../db');

const authenticate = require('../middleware/auth');

// List All Users
router.get('/', (req, res) => {
  db.all('SELECT id, username, table_name FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

// Update Profile
router.put('/profile', authenticate, (req, res) => {
  const { table_name } = req.body;
  if (table_name === undefined) return res.status(400).json({ error: 'Table name is required' });

  db.run('UPDATE users SET table_name = ? WHERE id = ?', [table_name, req.user.id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Profile updated' });
  });
});

// Get User Habits (Public)
router.get('/:userId/habits', (req, res) => {
  const userId = req.params.userId;
  db.get('SELECT id, username, table_name FROM users WHERE id = ?', [userId], (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user) return res.status(404).json({ error: 'User not found' });

      db.all('SELECT * FROM habits WHERE user_id = ?', [userId], (err, habits) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ user, habits });
      });
  });
});

module.exports = router;

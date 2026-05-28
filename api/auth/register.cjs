const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql } = require('../db.cjs');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await sql.query(
      `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, joined_at, profile, is_onboarded`,
      [name, email, passwordHash]
    );

    if (!result || result.length === 0) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    const user = result[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        joinedAt: user.joined_at,
        profile: user.profile,
        isOnboarded: user.is_onboarded,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    if (error.message.includes('duplicate key')) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

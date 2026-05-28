const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql } = require('../db.cjs');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const result = await sql.query(
      `SELECT id, name, email, password_hash, joined_at, profile, is_onboarded FROM users WHERE email = $1`,
      [email]
    );

    if (!result || result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({
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
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

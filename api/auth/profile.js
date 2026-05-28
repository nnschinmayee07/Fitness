const jwt = require('jsonwebtoken');
const { sql } = require('../db.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.slice(7);
  const { profile } = req.body;

  if (!profile) {
    return res.status(400).json({ error: 'Profile data required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await sql(
      `UPDATE users SET profile = $1, is_onboarded = true WHERE id = $2 RETURNING id, name, email, joined_at, profile, is_onboarded`,
      [JSON.stringify(profile), decoded.userId]
    );

    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result[0];
    return res.status(200).json({
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
    console.error('Profile update error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

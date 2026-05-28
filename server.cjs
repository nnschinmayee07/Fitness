require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// Mount API route handlers
app.all('/api/auth/login',    require('./api/auth/login.cjs'));
app.all('/api/auth/register', require('./api/auth/register.cjs'));
app.all('/api/auth/me',       require('./api/auth/me.cjs'));
app.all('/api/auth/profile',  require('./api/auth/profile.cjs'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

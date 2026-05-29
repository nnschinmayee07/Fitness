require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// Mount API route handlers
app.all('/api/auth/login',    require('./api/auth/login.js'));
app.all('/api/auth/register', require('./api/auth/register.js'));
app.all('/api/auth/me',       require('./api/auth/me.js'));
app.all('/api/auth/profile',  require('./api/auth/profile.js'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

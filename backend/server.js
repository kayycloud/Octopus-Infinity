require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

let users = require('./users.json');

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ success: true, message: 'Login berhasil', user: username });
  }
  res.status(401).json({ success: false, message: 'Login gagal' });
});

app.post('/api/action', (req, res) => {
  const { target, type } = req.body;
  if (!target.startsWith('62')) {
    return res.status(400).json({ success: false, message: 'Nomor tidak valid' });
  }
  // Simulasi aksi - bisa disambung ke bot nanti
  return res.json({ success: true, message: `${type} dikirim ke ${target}` });
});

app.get('/api/status', (req, res) => {
  return res.json({ status: 'Server Aktif' });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ Server jalan di port ${PORT}`)
})

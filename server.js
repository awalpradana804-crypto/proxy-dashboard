const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let gameConfig = {
  runSpeed: 6.0,
  maxRunSpeed: 10,
  sensitivity: 9.5,
  maxSensitivity: 999.99,
  version: 'OB55',
  status: 'online'
};

app.get('/api/config', (req, res) => res.json(gameConfig));

app.post('/api/config', (req, res) => {
  const { runSpeed, sensitivity, maxRunSpeed, maxSensitivity } = req.body;
  if (runSpeed !== undefined) gameConfig.runSpeed = runSpeed;
  if (sensitivity !== undefined) gameConfig.sensitivity = sensitivity;
  if (maxRunSpeed !== undefined) gameConfig.maxRunSpeed = maxRunSpeed;
  if (maxSensitivity !== undefined) gameConfig.maxSensitivity = maxSensitivity;
  res.json({ success: true, config: gameConfig });
});

app.get('/api/device', (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || '-';
  res.json({
    ip: ip,
    userAgent: req.headers['user-agent'] || '-',
    platform: process.platform,
    timestamp: new Date().toISOString()
  });
});

app.get('/localConfig.json', (req, res) => {
  const host = process.env.RAILWAY_PUBLIC_DOMAIN 
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/` 
    : `http://localhost:${PORT}/`;
  res.json({ verAddr: host, testCodePatch: true });
});

app.listen(PORT, () => console.log(`✅ Server jalan di port ${PORT}`));

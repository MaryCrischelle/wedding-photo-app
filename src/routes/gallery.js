const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const uploadsDir = path.join(__dirname, '../../uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Unable to read uploads.' });
    const images = files.filter(f => f.match(/\.(jpg|jpeg|png)$/i)).map(f => `/uploads/${f}`);
    res.json({ images });
  });
});

module.exports = router;

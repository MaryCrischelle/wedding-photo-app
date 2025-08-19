const express = require('express');
const path = require('path');
const uploadRouter = require('./routes/upload');
const galleryRouter = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json());

app.use('/api/upload', uploadRouter);
app.use('/api/gallery', galleryRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

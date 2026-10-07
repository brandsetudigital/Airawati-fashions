const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { protect, adminOnly } = require('../middleware/auth');

// Ensure upload directory exists in both frontend/public/images/uploads and backend/public/uploads
const uploadDirFrontend = path.join(__dirname, '../../frontend/public/images/uploads');
const uploadDirBackend = path.join(__dirname, '../public/uploads');

[uploadDirFrontend, uploadDirBackend].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
      console.warn('Failed to create directory:', dir, e.message);
    }
  }
});

// @desc    Upload product image (Base64 data or multipart)
// @route   POST /api/upload
router.post('/', async (req, res) => {
  try {
    const { image, filename } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    // If it's a URL already, return it directly
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/images/'))) {
      return res.status(200).json({ success: true, url: image });
    }

    // Parse base64 data: data:image/png;base64,iVBORw0KGgo...
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // Fallback: return as data URL if format is different
      return res.status(200).json({ success: true, url: image });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const ext = mimeType.split('/')[1] || 'jpg';
    const cleanExt = ext === 'jpeg' ? 'jpg' : ext;
    const safeName = (filename || 'product')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 30);
    const uniqueFilename = `upload_${Date.now()}_${safeName}.${cleanExt}`;

    // Write to frontend public directory so Vite serves it immediately
    let savedPath = null;
    try {
      const targetPath = path.join(uploadDirFrontend, uniqueFilename);
      fs.writeFileSync(targetPath, buffer);
      savedPath = `/images/uploads/${uniqueFilename}`;
    } catch (err) {
      console.warn('Could not write to frontend public, writing to backend uploads:', err.message);
    }

    // Also write to backend directory for permanent local copy
    try {
      const backendTargetPath = path.join(uploadDirBackend, uniqueFilename);
      fs.writeFileSync(backendTargetPath, buffer);
      if (!savedPath) {
        savedPath = `/uploads/${uniqueFilename}`;
      }
    } catch (err) {
      console.warn('Could not write to backend uploads:', err.message);
    }

    const finalUrl = savedPath || image;

    res.status(200).json({
      success: true,
      url: finalUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

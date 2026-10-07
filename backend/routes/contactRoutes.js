const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createMessage);
router.get('/', protect, adminOnly, getMessages);

module.exports = router;

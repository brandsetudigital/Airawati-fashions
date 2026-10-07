const express = require('express');
const router = express.Router();
const {
  createConsultation,
  getConsultations,
  updateConsultationStatus
} = require('../controllers/boutiqueController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/consultation', createConsultation);
router.get('/consultations', protect, adminOnly, getConsultations);
router.patch('/consultations/:id', protect, adminOnly, updateConsultationStatus);

module.exports = router;

const BlouseConsultation = require('../models/BlouseConsultation');

exports.createConsultation = async (req, res) => {
  try {
    const consultation = await BlouseConsultation.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Consultation request submitted! Our master tailor will contact you shortly.',
      consultation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getConsultations = async (req, res) => {
  try {
    const consultations = await BlouseConsultation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: consultations.length, consultations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const consultation = await BlouseConsultation.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

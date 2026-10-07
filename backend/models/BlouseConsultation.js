const mongoose = require('mongoose');

const blouseConsultationSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      default: ''
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    customerEmail: {
      type: String,
      default: 'customer@airawati.com',
      trim: true
    },
    customerPhone: {
      type: String,
      required: true
    },
    blouseTitle: {
      type: String,
      default: 'Custom Heritage Blouse'
    },
    blouseSku: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'M'
    },
    preferredDate: {
      type: String,
      default: ''
    },
    timeSlot: {
      type: String,
      default: '10:00 AM - 12:00 PM'
    },
    fabricChoice: {
      type: String,
      default: 'Pure Mashru Silk'
    },
    neckDesign: {
      type: String,
      default: 'Sweetheart Neck'
    },
    sleeveLength: {
      type: String,
      default: 'Elbow Length'
    },
    measurementsNotes: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['New', 'In Consultation', 'In Stitching', 'Completed', 'Cancelled'],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BlouseConsultation', blouseConsultationSchema);

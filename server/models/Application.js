const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Allows guest/fallback mode
  },
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  ctc: {
    type: String,
    default: '10 LPA',
  },
  status: {
    type: String,
    enum: [
      'Bookmarked',
      'Applied',
      'OA Scheduled',
      'OA Cleared',
      'Technical Round',
      'HR Round',
      'Offer Received',
      'Rejected',
    ],
    default: 'Applied',
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  nextRoundDate: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    default: '',
  },
  timeline: [
    {
      status: String,
      date: { type: Date, default: Date.now },
      note: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

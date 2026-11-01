const mongoose = require('mongoose');

const DriveSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: '',
  },
  tier: {
    type: String,
    enum: ['Super Dream (15+ LPA)', 'Dream (8-15 LPA)', 'Regular (4-8 LPA)'],
    default: 'Dream (8-15 LPA)',
  },
  role: {
    type: String,
    required: true,
  },
  ctc: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: 'Pan India / Hybrid',
  },
  eligibleBranches: {
    type: [String],
    default: ['CSE', 'IT', 'ECE'],
  },
  minCgpa: {
    type: Number,
    default: 7.0,
  },
  maxBacklogs: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  driveDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Upcoming', 'Closed'],
    default: 'Active',
  },
  rounds: [
    {
      roundNumber: Number,
      name: String,
      description: String,
      duration: String,
    },
  ],
  testPattern: {
    type: String,
    default: 'Online Assessment: 20 Aptitude MCQs, 2 DSA Coding Questions (60 Mins)',
  },
  requiredSkills: {
    type: [String],
    default: ['DSA', 'OOPs', 'DBMS', 'Problem Solving'],
  },
  jobDescription: {
    type: String,
    default: '',
  },
  pastInterviewTips: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Drive || mongoose.model('Drive', DriveSchema);

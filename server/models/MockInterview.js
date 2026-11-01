const mongoose = require('mongoose');

const MockInterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    default: 'General Tech Company',
  },
  difficulty: {
    type: String,
    enum: ['Standard Campus', 'Challenging (Tier 1)', 'Behavioral / HR'],
    default: 'Standard Campus',
  },
  questions: [
    {
      questionText: String,
      category: String,
      studentAnswer: String,
      score: Number,
      strengths: [String],
      improvements: [String],
      starAdherence: String,
      modelAnswer: String,
      followUpQuestion: String,
    },
  ],
  overallScore: {
    type: Number,
    default: 0,
  },
  summaryFeedback: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.MockInterview || mongoose.model('MockInterview', MockInterviewSchema);

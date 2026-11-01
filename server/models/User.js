const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    default: 'National Institute of Technology',
  },
  branch: {
    type: String,
    default: 'Computer Science and Engineering',
  },
  semester: {
    type: Number,
    default: 7,
  },
  cgpa: {
    type: Number,
    default: 8.4,
  },
  backlogs: {
    type: Number,
    default: 0,
  },
  skills: {
    type: [String],
    default: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Data Structures & Algorithms'],
  },
  targetRoles: {
    type: [String],
    default: ['Software Development Engineer', 'Full Stack Developer'],
  },
  targetCompanies: {
    type: [String],
    default: ['Google', 'Microsoft', 'Amazon', 'TCS Digital', 'Deloitte'],
  },
  resumeText: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: 'Final year engineering student preparing for campus recruitment drives with strong interest in web technologies and systems.',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

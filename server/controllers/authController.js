const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || 'college_placement_assistant_secret_key_2026';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Demo fallback user in memory when DB is not yet connected
let fallbackDemoUser = {
  _id: 'demo-student-id-01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  college: 'National Institute of Technology',
  branch: 'Computer Science and Engineering',
  semester: 7,
  cgpa: 8.45,
  backlogs: 0,
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Data Structures & Algorithms', 'System Design Basics'],
  targetRoles: ['Software Development Engineer', 'Full Stack Developer'],
  targetCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS Digital', 'Deloitte'],
  resumeText: `AARAV SHARMA
aarav.sharma@campus.edu | +91 9876543210 | Bangalore, India | linkedin.com/in/aarav-sharma | github.com/aarav-code

EDUCATION
National Institute of Technology, B.Tech in Computer Science and Engineering (2023 - 2027)
CGPA: 8.45 / 10.0 | Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks.

TECHNICAL SKILLS
Languages: C++, Java, JavaScript, Python, SQL
Frameworks & Tools: React.js, Node.js, Express.js, MongoDB, Git, Docker, RESTful APIs

EXPERIENCE & PROJECTS
• Campus Placement Portal (Full Stack Developer):
  Built a full-stack MERN portal to track company recruitment drives. Implemented JWT authentication and real-time status updates, reducing placement cell query latency by 40%.
• Distributed Task Queue Service:
  Engineered an asynchronous job queue in Node.js and Redis processing 1,000+ jobs/minute with exponential backoff and error tracking.
• Algorithmic Problem Solving:
  Solved 450+ questions across LeetCode and GeeksforGeeks with focus on Dynamic Programming, Binary Trees, and Graph Traversal.`,
  bio: 'Final year CSE undergraduate passionate about building scalable full-stack web platforms and distributed backend systems. Preparing actively for campus placement drives.',
};

// @desc    Register a new student
// @route   POST /api/auth/register
const registerStudent = async (req, res) => {
  try {
    const { name, email, password, branch, cgpa, college } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (mongoose.connection.readyState >= 1) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Student with this email already exists' });
      }

      const user = await User.create({
        name,
        email,
        password,
        branch: branch || 'Computer Science and Engineering',
        cgpa: cgpa ? parseFloat(cgpa) : 8.0,
        college: college || 'Engineering College',
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        cgpa: user.cgpa,
        skills: user.skills,
        token: generateToken(user._id),
      });
    }

    // In-memory demo register fallback
    fallbackDemoUser = {
      ...fallbackDemoUser,
      name,
      email,
      branch: branch || fallbackDemoUser.branch,
      cgpa: cgpa ? parseFloat(cgpa) : fallbackDemoUser.cgpa,
      college: college || fallbackDemoUser.college,
    };

    return res.status(201).json({
      ...fallbackDemoUser,
      token: generateToken(fallbackDemoUser._id),
      note: 'Demo mode active. Add MONGO_URI in Atlas to persist across restarts.',
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

// @desc    Authenticate student & get token
// @route   POST /api/auth/login
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (mongoose.connection.readyState >= 1) {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          branch: user.branch,
          cgpa: user.cgpa,
          skills: user.skills,
          targetRoles: user.targetRoles,
          targetCompanies: user.targetCompanies,
          resumeText: user.resumeText,
          token: generateToken(user._id),
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Fallback demo login
    return res.json({
      ...fallbackDemoUser,
      token: generateToken(fallbackDemoUser._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

// @desc    Instant Demo Login (One-click login for recruiters and students to test)
// @route   POST /api/auth/demo
const demoLogin = async (req, res) => {
  try {
    if (mongoose.connection.readyState >= 1) {
      let demoUser = await User.findOne({ email: 'aarav.sharma@campus.edu' });
      if (!demoUser) {
        demoUser = await User.create({
          ...fallbackDemoUser,
          password: 'password123',
        });
      }

      return res.json({
        _id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        college: demoUser.college,
        branch: demoUser.branch,
        cgpa: demoUser.cgpa,
        skills: demoUser.skills,
        targetRoles: demoUser.targetRoles,
        targetCompanies: demoUser.targetCompanies,
        resumeText: demoUser.resumeText,
        bio: demoUser.bio,
        token: generateToken(demoUser._id),
      });
    }

    return res.json({
      ...fallbackDemoUser,
      token: generateToken(fallbackDemoUser._id),
    });
  } catch (error) {
    console.error('Demo login error:', error);
    return res.json({
      ...fallbackDemoUser,
      token: generateToken(fallbackDemoUser._id),
    });
  }
};

// @desc    Get current student profile
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState >= 1 && req.user) {
      const user = await User.findById(req.user._id).select('-password');
      if (user) {
        return res.json(user);
      }
    }
    return res.json(fallbackDemoUser);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.json(fallbackDemoUser);
  }
};

// @desc    Update student profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { name, college, branch, semester, cgpa, backlogs, skills, targetRoles, targetCompanies, resumeText, bio } = req.body;

    if (mongoose.connection.readyState >= 1 && req.user) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = name ?? user.name;
        user.college = college ?? user.college;
        user.branch = branch ?? user.branch;
        user.semester = semester ?? user.semester;
        user.cgpa = cgpa !== undefined ? parseFloat(cgpa) : user.cgpa;
        user.backlogs = backlogs !== undefined ? parseInt(backlogs, 10) : user.backlogs;
        user.skills = Array.isArray(skills) ? skills : user.skills;
        user.targetRoles = Array.isArray(targetRoles) ? targetRoles : user.targetRoles;
        user.targetCompanies = Array.isArray(targetCompanies) ? targetCompanies : user.targetCompanies;
        user.resumeText = resumeText ?? user.resumeText;
        user.bio = bio ?? user.bio;

        const updated = await user.save();
        return res.json(updated);
      }
    }

    // In-memory update
    fallbackDemoUser = {
      ...fallbackDemoUser,
      ...(name && { name }),
      ...(college && { college }),
      ...(branch && { branch }),
      ...(semester && { semester: Number(semester) }),
      ...(cgpa !== undefined && { cgpa: parseFloat(cgpa) }),
      ...(backlogs !== undefined && { backlogs: parseInt(backlogs, 10) }),
      ...(skills && { skills: Array.isArray(skills) ? skills : fallbackDemoUser.skills }),
      ...(targetRoles && { targetRoles: Array.isArray(targetRoles) ? targetRoles : fallbackDemoUser.targetRoles }),
      ...(targetCompanies && { targetCompanies: Array.isArray(targetCompanies) ? targetCompanies : fallbackDemoUser.targetCompanies }),
      ...(resumeText !== undefined && { resumeText }),
      ...(bio && { bio }),
    };

    return res.json(fallbackDemoUser);
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: error.message || 'Error updating profile' });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  demoLogin,
  getProfile,
  updateProfile,
};

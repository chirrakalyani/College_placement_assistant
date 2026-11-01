const mongoose = require('mongoose');
const Drive = require('../models/Drive');
const { sampleDrives } = require('../data/fallbackData');

// @desc    Get all campus placement drives
// @route   GET /api/drives
const getDrives = async (req, res) => {
  try {
    let drives = [];

    if (mongoose.connection.readyState >= 1) {
      drives = await Drive.find().sort({ driveDate: 1 });

      // If database is empty, seed it with sample drives
      if (!drives || drives.length === 0) {
        console.log('🌱 Seeding initial campus drives into MongoDB Atlas...');
        const cleanSample = sampleDrives.map(({ _id, ...rest }) => rest);
        drives = await Drive.insertMany(cleanSample);
      }
    } else {
      drives = sampleDrives;
    }

    // Apply query filters if provided
    const { search, tier, branch, minCgpa } = req.query;
    let filtered = [...drives];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.companyName.toLowerCase().includes(q) ||
          d.role.toLowerCase().includes(q) ||
          (d.requiredSkills && d.requiredSkills.some((s) => s.toLowerCase().includes(q)))
      );
    }

    if (tier && tier !== 'All') {
      filtered = filtered.filter((d) => d.tier.includes(tier));
    }

    if (branch && branch !== 'All') {
      filtered = filtered.filter(
        (d) => d.eligibleBranches.includes(branch) || d.eligibleBranches.includes('All Branches')
      );
    }

    if (minCgpa) {
      const cutoff = parseFloat(minCgpa);
      filtered = filtered.filter((d) => d.minCgpa <= cutoff);
    }

    return res.json(filtered);
  } catch (error) {
    console.error('Get drives error:', error);
    return res.json(sampleDrives);
  }
};

// @desc    Get single drive by id
// @route   GET /api/drives/:id
const getDriveById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState >= 1 && mongoose.isValidObjectId(id)) {
      const drive = await Drive.findById(id);
      if (drive) return res.json(drive);
    }

    const fallback = sampleDrives.find((d) => d._id === id || d._id.toString() === id);
    if (fallback) return res.json(fallback);

    return res.status(404).json({ message: 'Drive not found' });
  } catch (error) {
    console.error('Get drive error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Check student eligibility for a specific drive
// @route   POST /api/drives/:id/check-eligibility
const checkEligibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { cgpa, branch, backlogs } = req.body;

    let drive = null;
    if (mongoose.connection.readyState >= 1 && mongoose.isValidObjectId(id)) {
      drive = await Drive.findById(id);
    }
    if (!drive) {
      drive = sampleDrives.find((d) => d._id === id || d._id.toString() === id) || sampleDrives[0];
    }

    const studentCgpa = parseFloat(cgpa ?? 8.0);
    const studentBacklogs = parseInt(backlogs ?? 0, 10);
    const studentBranch = (branch || 'CSE').toUpperCase();

    // Check CGPA
    const isCgpaEligible = studentCgpa >= drive.minCgpa;
    const cgpaDiff = (studentCgpa - drive.minCgpa).toFixed(2);

    // Check Branch
    const normalizedEligible = drive.eligibleBranches.map((b) => b.toUpperCase());
    const isBranchEligible =
      normalizedEligible.includes('ALL') ||
      normalizedEligible.includes('ALL BRANCHES') ||
      normalizedEligible.some(
        (b) => studentBranch.includes(b) || b.includes(studentBranch)
      );

    // Check Backlogs
    const isBacklogEligible = studentBacklogs <= drive.maxBacklogs;

    const isOverallEligible = isCgpaEligible && isBranchEligible && isBacklogEligible;

    const reasons = [];
    if (!isCgpaEligible) {
      reasons.push(`CGPA is ${studentCgpa}, but minimum required is ${drive.minCgpa}`);
    }
    if (!isBranchEligible) {
      reasons.push(
        `Branch (${branch}) is not in eligible list: ${drive.eligibleBranches.join(', ')}`
      );
    }
    if (!isBacklogEligible) {
      reasons.push(
        `You have ${studentBacklogs} active backlog(s), company allows maximum of ${drive.maxBacklogs}`
      );
    }

    return res.json({
      companyName: drive.companyName,
      role: drive.role,
      isOverallEligible,
      checks: {
        cgpa: {
          eligible: isCgpaEligible,
          student: studentCgpa,
          required: drive.minCgpa,
          margin: `${cgpaDiff >= 0 ? '+' : ''}${cgpaDiff}`,
        },
        branch: {
          eligible: isBranchEligible,
          student: branch,
          eligibleList: drive.eligibleBranches,
        },
        backlogs: {
          eligible: isBacklogEligible,
          student: studentBacklogs,
          maxAllowed: drive.maxBacklogs,
        },
      },
      reasons,
      advice: isOverallEligible
        ? `You are fully eligible for ${drive.companyName}! Make sure to review the test pattern: ${drive.testPattern}`
        : `Currently not meeting all criteria for ${drive.companyName}. Review the flagged requirements above.`,
    });
  } catch (error) {
    console.error('Check eligibility error:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDrives,
  getDriveById,
  checkEligibility,
};

const mongoose = require('mongoose');
const Application = require('../models/Application');
const { sampleApplications, collegePlacementStats } = require('../data/fallbackData');

let memoryApplications = [...sampleApplications];

// @desc    Get all applications for the student
// @route   GET /api/applications
const getApplications = async (req, res) => {
  try {
    if (mongoose.connection.readyState >= 1) {
      let apps = await Application.find().sort({ appliedDate: -1 });
      if (!apps || apps.length === 0) {
        const clean = sampleApplications.map(({ _id, ...rest }) => rest);
        apps = await Application.insertMany(clean);
      }
      return res.json(apps);
    }

    return res.json(memoryApplications);
  } catch (error) {
    console.error('Get applications error:', error);
    return res.json(memoryApplications);
  }
};

// @desc    Track a new company application
// @route   POST /api/applications
const createApplication = async (req, res) => {
  try {
    const { companyName, role, ctc, status, notes, nextRoundDate } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({ message: 'Company name and role are required' });
    }

    const newAppData = {
      companyName,
      role,
      ctc: ctc || 'Not specified',
      status: status || 'Applied',
      notes: notes || '',
      nextRoundDate: nextRoundDate || null,
      appliedDate: new Date(),
      timeline: [
        {
          status: status || 'Applied',
          date: new Date(),
          note: 'Application tracked in placement portal',
        },
      ],
    };

    if (mongoose.connection.readyState >= 1) {
      const app = await Application.create(newAppData);
      return res.status(201).json(app);
    }

    const app = {
      _id: `app-${Date.now()}`,
      ...newAppData,
    };
    memoryApplications.unshift(app);
    return res.status(201).json(app);
  } catch (error) {
    console.error('Create application error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status and notes
// @route   PUT /api/applications/:id
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, nextRoundDate } = req.body;

    if (mongoose.connection.readyState >= 1 && mongoose.isValidObjectId(id)) {
      const app = await Application.findById(id);
      if (app) {
        if (status && status !== app.status) {
          app.timeline.push({
            status,
            date: new Date(),
            note: notes || `Moved to ${status}`,
          });
          app.status = status;
        }
        if (notes !== undefined) app.notes = notes;
        if (nextRoundDate !== undefined) app.nextRoundDate = nextRoundDate;

        const updated = await app.save();
        return res.json(updated);
      }
    }

    // In-memory update
    const idx = memoryApplications.findIndex((a) => a._id === id || a._id.toString() === id);
    if (idx !== -1) {
      const current = memoryApplications[idx];
      const updatedTimeline = [...(current.timeline || [])];
      if (status && status !== current.status) {
        updatedTimeline.push({
          status,
          date: new Date().toISOString(),
          note: notes || `Updated to ${status}`,
        });
      }

      memoryApplications[idx] = {
        ...current,
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(nextRoundDate !== undefined && { nextRoundDate }),
        timeline: updatedTimeline,
      };
      return res.json(memoryApplications[idx]);
    }

    return res.status(404).json({ message: 'Application not found' });
  } catch (error) {
    console.error('Update application error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState >= 1 && mongoose.isValidObjectId(id)) {
      await Application.findByIdAndDelete(id);
      return res.json({ message: 'Application deleted successfully' });
    }

    memoryApplications = memoryApplications.filter((a) => a._id !== id && a._id.toString() !== id);
    return res.json({ message: 'Application removed' });
  } catch (error) {
    console.error('Delete application error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard metrics & stats
// @route   GET /api/applications/stats
const getPlacementStats = async (req, res) => {
  try {
    let apps = memoryApplications;
    if (mongoose.connection.readyState >= 1) {
      apps = await Application.find();
    }

    const totalApplied = apps.length;
    const inProgress = apps.filter((a) =>
      ['Applied', 'OA Scheduled', 'OA Cleared', 'Technical Round', 'HR Round'].includes(a.status)
    ).length;
    const interviews = apps.filter((a) =>
      ['OA Scheduled', 'Technical Round', 'HR Round'].includes(a.status)
    ).length;
    const offers = apps.filter((a) => a.status === 'Offer Received').length;
    const rejected = apps.filter((a) => a.status === 'Rejected').length;

    return res.json({
      personalStats: {
        totalApplied,
        inProgress,
        interviewsScheduled: interviews,
        offersReceived: offers,
        rejected,
      },
      campusStats: collegePlacementStats,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.json({
      personalStats: { totalApplied: 4, inProgress: 3, interviewsScheduled: 2, offersReceived: 1, rejected: 0 },
      campusStats: collegePlacementStats,
    });
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getPlacementStats,
};

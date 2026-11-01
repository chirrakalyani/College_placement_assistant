const express = require('express');
const router = express.Router();
const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getPlacementStats,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', getPlacementStats);
router.get('/', protect, getApplications);
router.post('/', protect, createApplication);
router.put('/:id', protect, updateApplication);
router.delete('/:id', protect, deleteApplication);

module.exports = router;

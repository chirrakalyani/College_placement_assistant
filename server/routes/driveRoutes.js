const express = require('express');
const router = express.Router();
const {
  getDrives,
  getDriveById,
  checkEligibility,
} = require('../controllers/driveController');

router.get('/', getDrives);
router.get('/:id', getDriveById);
router.post('/:id/check-eligibility', checkEligibility);

module.exports = router;

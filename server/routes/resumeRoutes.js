const express = require('express');
const router = express.Router();
const {
  analyzeResume,
  rewriteBullet,
} = require('../controllers/resumeController');

router.post('/analyze', analyzeResume);
router.post('/rewrite-bullet', rewriteBullet);

module.exports = router;

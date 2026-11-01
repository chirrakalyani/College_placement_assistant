const express = require('express');
const router = express.Router();
const { askCounselor } = require('../controllers/counselorController');

router.post('/ask', askCounselor);

module.exports = router;

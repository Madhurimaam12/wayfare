const express = require('express');
const router = express.Router();
const TravelPolicy = require('../models/TravelPolicy');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  const policies = await TravelPolicy.find({ isActive: true });
  res.json({ success: true, count: policies.length, data: policies });
});

module.exports = router;
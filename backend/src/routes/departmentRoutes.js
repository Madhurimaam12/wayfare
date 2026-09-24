const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  const departments = await Department.find({ isActive: true });
  res.json({ success: true, count: departments.length, data: departments });
});

module.exports = router;
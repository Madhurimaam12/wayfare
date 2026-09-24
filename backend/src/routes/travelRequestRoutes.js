const express = require('express');
const router = express.Router();
const TravelRequest = require('../models/TravelRequest');
const { protect } = require('../middleware/auth');

// Create travel request
router.post('/', protect, async (req, res) => {
  try {
    const count = await TravelRequest.countDocuments();
    const requestNumber = `TR${String(count + 1).padStart(5, '0')}`;

    const request = await TravelRequest.create({
      ...req.body,
      requestNumber,
      employeeId: req.user._id,
      departmentId: req.user.departmentId,
      managerId: req.user.managerId,
      status: 'submitted'
    });

    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('Create travel request error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get my travel requests
router.get('/my', protect, async (req, res) => {
  try {
    const requests = await TravelRequest.find({ employeeId: req.user._id })
      .sort('-createdAt');
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get pending (for managers)
router.get('/pending', protect, async (req, res) => {
  try {
    const requests = await TravelRequest.find({ status: 'submitted' })
      .populate('employeeId', 'firstName lastName email')
      .sort('-createdAt');
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
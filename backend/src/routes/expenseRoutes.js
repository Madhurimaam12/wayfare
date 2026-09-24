const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Expense = require('../models/Expense');
const { protect, authorize } = require('../middleware/auth');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/receipts');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `receipt-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Create expense
router.post('/', protect, upload.single('receipt'), async (req, res) => {
  try {
    const { category, amount, date, description, requestId } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Receipt file is required' });
    }

    const expense = await Expense.create({
      employeeId: req.user._id,
      requestId: requestId || undefined,
      category,
      amount: parseFloat(amount),
      date: new Date(date),
      description,
      receiptUrl: `/uploads/receipts/${req.file.filename}`,
      status: 'submitted'
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get my expenses
router.get('/my', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ employeeId: req.user._id })
      .sort('-createdAt');
    res.json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all pending (finance/admin)
router.get('/pending', protect, authorize('finance_officer', 'admin'), async (req, res) => {
  try {
    const expenses = await Expense.find({ status: { $in: ['submitted', 'under_review'] } })
      .populate('employeeId', 'firstName lastName email')
      .sort('-createdAt');
    res.json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Approve expense
router.put('/:id/approve', protect, authorize('finance_officer', 'admin'), async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        reviewerId: req.user._id,
        reviewComments: req.body.comments || 'Approved'
      },
      { new: true }
    );
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reject expense
router.put('/:id/reject', protect, authorize('finance_officer', 'admin'), async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        reviewerId: req.user._id,
        reviewComments: req.body.comments || 'Rejected'
      },
      { new: true }
    );
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
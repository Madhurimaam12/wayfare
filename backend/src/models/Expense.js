const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'TravelRequest' },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    enum: ['accommodation', 'transport', 'meals', 'miscellaneous'],
    required: true
  },
  date: { type: Date, required: true },
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  description: { type: String, required: true },
  receiptUrl: String,
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'reimbursed'],
    default: 'submitted'
  },
  policyCompliant: { type: Boolean, default: true },
  policyViolations: [String],
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewComments: String,
  reimbursedDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
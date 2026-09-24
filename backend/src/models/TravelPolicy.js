const mongoose = require('mongoose');

const TravelPolicySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  type: {
    type: String,
    enum: ['accommodation', 'transport', 'meals', 'advance', 'general'],
    required: true
  },
  description: String,
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  applicableRoles: [{
    type: String,
    enum: ['admin', 'manager', 'employee', 'travel_coordinator', 'finance_officer']
  }],
  limits: {
    min: { type: Number, default: 0 },
    max: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    threshold: { type: Number, default: 0 }
  },
  rules: {
    requiresReceipt: { type: Boolean, default: true },
    requiresApproval: { type: Boolean, default: true },
    advanceAllowed: { type: Boolean, default: false },
    maxAdvancePercentage: { type: Number, default: 50 }
  },
  travelType: [{ type: String, enum: ['domestic', 'international'] }],
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('TravelPolicy', TravelPolicySchema);
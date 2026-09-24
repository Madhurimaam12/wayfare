const mongoose = require('mongoose');

const TravelRequestSchema = new mongoose.Schema({
  requestNumber: { type: String, required: true, unique: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  travelType: { type: String, enum: ['domestic', 'international'], required: true },
  purpose: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  estimatedCost: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'pending_approval', 'approved', 'rejected', 'cancelled'],
    default: 'submitted'
  },
  approvalChain: [{
    approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    level: Number,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    comments: String,
    date: Date
  }],
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('TravelRequest', TravelRequestSchema);
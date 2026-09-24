const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  description: String,
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parentDepartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);
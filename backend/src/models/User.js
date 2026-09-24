const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee', 'travel_coordinator', 'finance_officer'],
    default: 'employee'
  },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phoneNumber: String,
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
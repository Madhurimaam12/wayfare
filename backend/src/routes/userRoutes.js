const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// Get all users (admin + finance)
router.get('/', protect, authorize('admin', 'finance_officer'), async (req, res) => {
  try {
    const users = await User.find()
      .populate('departmentId', 'name code')
      .select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single user
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('departmentId', 'name code')
      .select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user
router.put('/:id', protect, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, role, departmentId, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Check permissions
    const isAdmin = req.user.role === 'admin';
    const isSelf = req.user._id.toString() === user._id.toString();

    if (!isAdmin && !isSelf) {
      return res.status(403).json({ success: false, message: 'You can only update your own profile' });
    }

    // Update allowed fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    // Admin-only fields
    if (isAdmin) {
      if (role) user.role = role;
      if (departmentId) user.departmentId = departmentId;
      if (isActive !== undefined) user.isActive = isActive;
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .populate('departmentId', 'name code')
      .select('-password');

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user (soft delete — admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isActive = false;
    await user.save();

    res.json({ success: true, message: 'User deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
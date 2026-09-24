const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { asyncHandler, ValidationError } = require('../utils/errorHandler');

const register = asyncHandler(async (req, res) => {
  const { employeeId, firstName, lastName, email, password, role, departmentId } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { employeeId }] });
  if (userExists) {
    throw new ValidationError('User with this email or employee ID already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    employeeId,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: role || 'employee',
    departmentId
  });

  const token = generateToken(user._id, user.role);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        employeeId: user.employeeId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId
      },
      token
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ValidationError('Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ValidationError('Invalid credentials');
  }

  if (!user.isActive) {
    throw new ValidationError('Account is deactivated');
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id, user.role);

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        employeeId: user.employeeId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId
      },
      token
    }
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('departmentId').select('-password');
  res.status(200).json({ success: true, data: user });
});

module.exports = { register, login, getMe };
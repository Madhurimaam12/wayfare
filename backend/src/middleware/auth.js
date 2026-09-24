const { verifyToken } = require('../utils/jwt');
const { AuthenticationError } = require('../utils/errorHandler');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      throw new AuthenticationError('Not authorized, no token provided');
    }
    
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password').populate('departmentId');
    
    if (!user) {
      throw new AuthenticationError('User not found');
    }
    
    if (!user.isActive) {
      throw new AuthenticationError('Account is deactivated');
    }
    
    req.user = user;
    next();
  } catch (error) {
    next(new AuthenticationError(error.message));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AuthenticationError('You do not have permission to perform this action'));
    }
    next();
  };
};

module.exports = { protect, authorize };
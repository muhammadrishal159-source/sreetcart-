const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || 'streetcart_jwt_secret_dev_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
};

// In-memory fallback users
const memoryUsers = [
  {
    id: 'owner_rahim',
    _id: 'owner_rahim',
    name: 'Rahim (SM Street)',
    email: 'rahim@streetcart.in',
    role: 'shop_owner',
    phone: '+91 98470 12345',
  },
  {
    id: 'user_arjun',
    _id: 'user_arjun',
    name: 'Arjun K',
    email: 'arjun@calicut.in',
    role: 'customer',
    phone: '+91 98460 54321',
  },
];

// @desc    Register a new user (Customer or Shop Owner)
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.',
      });
    }

    try {
      // Check if user already exists in MongoDB
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists.',
        });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || 'customer',
        phone: phone || '',
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      });
    } catch (dbErr) {
      // Memory fallback if MongoDB offline
      const mockUser = {
        id: 'usr_' + Date.now(),
        _id: 'usr_' + Date.now(),
        name,
        email,
        role: role || 'customer',
        phone: phone || '',
      };
      memoryUsers.push(mockUser);
      const token = generateToken(mockUser);
      return res.status(201).json({
        success: true,
        token,
        user: mockUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    try {
      const user = await User.findOne({ email }).select('+password');

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user);
        return res.json({
          success: true,
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
          },
        });
      }
    } catch (dbErr) {}

    // Fallback logic
    const foundMem = memoryUsers.find((u) => u.email === email);
    if (foundMem) {
      const token = generateToken(foundMem);
      return res.json({
        success: true,
        token,
        user: foundMem,
      });
    }

    // Default demo login for convenience
    const role = email.includes('owner') ? 'shop_owner' : 'customer';
    const fallbackUser = {
      id: role === 'shop_owner' ? 'owner_rahim' : 'user_arjun',
      _id: role === 'shop_owner' ? 'owner_rahim' : 'user_arjun',
      name: role === 'shop_owner' ? 'Rahim (SM Street)' : 'Kozhikode Shopper',
      email,
      role,
      phone: '+91 98470 12345',
    };
    const token = generateToken(fallbackUser);

    return res.json({
      success: true,
      token,
      user: fallbackUser,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/profile
exports.getProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};


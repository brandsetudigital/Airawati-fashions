const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'airawati_secret_jwt_key_2026', {
    expiresIn: '30d'
  });
};

// @desc    Register a new customer
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    // Generate random 4-digit verification code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const user = await User.create({
      name,
      email,
      password,
      phone: phone ? phone.trim() : '',
      verificationCode,
      isVerified: true // Set true directly so users can immediately use app or test OTP
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      verificationCode,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login customer
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        addresses: user.addresses || [],
        cart: user.cart || [],
        wishlist: user.wishlist || []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin login
// @route   POST /api/auth/admin-login
exports.adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const queryEmail = cleanEmail === 'admin' ? 'admin@airawati.com' : cleanEmail;

    // Check if user exists in database
    let user = await User.findOne({ email: queryEmail }).select('+password');

    // Self-healing: if admin account is missing in current MongoDB instance, create it
    if (!user && (queryEmail === 'admin@airawati.com' || cleanEmail === 'admin')) {
      user = await User.create({
        name: 'Aditi Sharma',
        email: 'admin@airawati.com',
        password: 'admin123',
        phone: '+91 8982065895',
        role: 'admin',
        avatar: '/images/admin_avatar.jpg',
        isVerified: true
      });
      user = await User.findById(user._id).select('+password');
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    // Check password against hash or standard master demo credentials
    const isMasterPassword = password === 'admin123' || password === 'admin' || password === 'Admin@123';
    const isMatch = (await user.matchPassword(password)) || isMasterPassword;

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    // Elevate role to admin if using master password or standard admin email
    if (user.role !== 'admin') {
      if (isMasterPassword || queryEmail === 'admin@airawati.com') {
        user.role = 'admin';
        await user.save();
      } else {
        return res.status(401).json({ success: false, message: 'Access denied. Account does not have admin privileges.' });
      }
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: `Admin portal authenticated: ${user.name}`,
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify OTP / Code
// @route   POST /api/auth/verify-code
exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Accept exact code or demo fallback code 1234
    if (user.verificationCode === code || code === '1234') {
      user.isVerified = true;
      await user.save();

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Email verified successfully!',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          addresses: user.addresses || [],
          cart: user.cart || [],
          wishlist: user.wishlist || []
        }
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid verification code' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update User Profile & Address
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, password, addresses } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone ? phone.trim() : '';
    if (password && password.trim().length >= 6) {
      user.password = password.trim();
    }
    if (addresses) user.addresses = addresses;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses,
        cart: user.cart || [],
        wishlist: user.wishlist || []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get User's Cart and Wishlist
// @route   GET /api/auth/cart-wishlist
exports.getCartAndWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      cart: user.cart || [],
      wishlist: user.wishlist || []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Sync / Save User's Cart and Wishlist
// @route   PUT /api/auth/cart-wishlist
exports.updateCartAndWishlist = async (req, res) => {
  try {
    const { cart, wishlist } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (Array.isArray(cart)) {
      user.cart = cart;
    }
    if (Array.isArray(wishlist)) {
      user.wishlist = wishlist;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cart and Wishlist synchronized',
      cart: user.cart || [],
      wishlist: user.wishlist || []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

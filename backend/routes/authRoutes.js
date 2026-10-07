const express = require('express');
const router = express.Router();
const {
  register,
  login,
  adminLogin,
  verifyCode,
  getMe,
  updateProfile,
  getCartAndWishlist,
  updateCartAndWishlist
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/verify-code', verifyCode);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.get('/cart-wishlist', protect, getCartAndWishlist);
router.put('/cart-wishlist', protect, updateCartAndWishlist);

module.exports = router;

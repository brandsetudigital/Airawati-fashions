const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, adminOnly, optionalAuth } = require('../middleware/auth');

// Customer / Guest can place order
router.post('/', optionalAuth, createOrder);

// Customer gets own orders
router.get('/my-orders', protect, getMyOrders);

// Customer can cancel order
router.patch('/:id/cancel', optionalAuth, cancelOrder);

// Get single order
router.get('/:id', getOrderById);

// Admin operations
router.get('/', protect, adminOnly, getAllOrders);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;

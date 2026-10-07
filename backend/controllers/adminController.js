const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get real-time dashboard analytics
// @route   GET /api/admin/dashboard-stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    // Calculate Total Revenue
    const revenueAgg = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Low Stock Alert Count
    const lowStockCount = await Product.countDocuments({
      $expr: { $lte: ['$stock', '$lowStockAlert'] }
    });

    // Recent 6 Orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(6);

    // Sales by Category aggregation
    const categoryAgg = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalUnitsSold: { $sum: '$unitsSold' },
          productCount: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers,
        lowStockCount,
        recentOrders,
        categoryAgg
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get customer list with stats (Admin)
// @route   GET /api/admin/customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password');

    // Attach order summary for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (c) => {
        const escapedEmail = c.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const orders = await Order.find({
          $or: [
            { user: c._id },
            { customerEmail: { $regex: new RegExp(`^${escapedEmail}$`, 'i') } }
          ]
        });
        const totalSpent = orders.reduce((sum, o) => sum + (o.orderStatus !== 'Cancelled' ? o.totalAmount : 0), 0);
        return {
          id: c._id,
          name: c.name,
          email: c.email,
          phone: c.phone || '',
          city: c.addresses && c.addresses.length > 0 ? c.addresses[0].city : (orders.length > 0 && orders[0].shippingAddress?.city ? orders[0].shippingAddress.city : 'India'),
          ordersCount: orders.length,
          totalSpent,
          joined: c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2024',
          status: 'Active'
        };
      })
    );

    res.status(200).json({
      success: true,
      count: customersWithStats.length,
      customers: customersWithStats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

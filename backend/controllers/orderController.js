const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Create new order & decrement product stock
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod = 'Online / UPI',
      subtotal,
      taxGst = 0,
      shippingCost = 0,
      discountAmount = 0,
      totalAmount
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your cart is empty. No items to order.' });
    }

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Please provide all shipping and customer details.' });
    }

    // Resolve user ID if authenticated or by registered email match
    let orderUserId = req.user ? req.user._id : null;
    if (!orderUserId && customerEmail) {
      const sanitizedEmail = customerEmail.trim().toLowerCase();
      const userDoc = await User.findOne({
        email: { $regex: new RegExp(`^${sanitizedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
      });
      if (userDoc) {
        orderUserId = userDoc._id;
      }
    }

    // Check stock availability & decrement for each product
    for (const item of items) {
      let product;
      if (item.product) {
        product = await Product.findById(item.product);
      } else if (item.sku) {
        product = await Product.findOne({ sku: item.sku });
      } else if (item.id) {
        product = await Product.findById(item.id).catch(() => null);
        if (!product) {
          product = await Product.findOne({ title: item.title });
        }
      }

      if (product) {
        const qty = item.quantity || 1;
        if (product.stock < qty) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.title}. Only ${product.stock} available.`
          });
        }
        // Decrement stock
        product.stock = Math.max(0, product.stock - qty);
        product.unitsSold = (product.unitsSold || 0) + qty;
        product.inStock = product.stock > 0;
        if (product.stock === 0) {
          product.status = 'Out of Stock';
        }
        await product.save();
      }
    }

    // Generate Unique Order Number e.g. AWT + 5 digits
    const orderNumber = `AWT${Math.floor(10000 + Math.random() * 90000)}`;

    const order = await Order.create({
      orderNumber,
      user: orderUserId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      items: items.map((it) => ({
        product: it.product || it._id || it.id,
        sku: it.sku || '',
        title: it.title,
        shortTitle: it.shortTitle || it.title,
        image: it.image,
        price: Number(it.price),
        quantity: Number(it.quantity || 1),
        fabric: it.fabric || 'Pure Silk Handloom'
      })),
      subtotal: Number(subtotal || totalAmount),
      taxGst: Number(taxGst),
      shippingCost: Number(shippingCost),
      discountAmount: Number(discountAmount),
      totalAmount: Number(totalAmount),
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Pending',
      shippingAddress,
      orderDateFormatted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    });

    res.status(201).json({
      success: true,
      message: `Order ${orderNumber} placed successfully!`,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
exports.getMyOrders = async (req, res) => {
  try {
    const userEmail = (req.user.email || '').trim();
    const escapedEmail = userEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const orders = await Order.find({
      $or: [
        { user: req.user._id },
        { customerEmail: { $regex: new RegExp(`^${escapedEmail}$`, 'i') } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order by orderNumber or ID
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }

    if (!order) {
      order = await Order.findOne({ orderNumber: id.toUpperCase() });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;

    const query = {};

    if (status && status !== 'All') {
      query.orderStatus = status;
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { customerPhone: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status & tracking (Admin)
// @route   PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, trackingNumber } = req.body;

    let order = null;
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: id.toUpperCase() });
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: id });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // If changing to Cancelled from non-cancelled, restore stock
    if (status === 'Cancelled' && order.orderStatus !== 'Cancelled') {
      for (const item of order.items) {
        if (item.product) {
          const product = await Product.findById(item.product);
          if (product) {
            product.stock += item.quantity;
            product.unitsSold = Math.max(0, product.unitsSold - item.quantity);
            product.inStock = product.stock > 0;
            product.status = product.stock > 0 ? 'Active' : 'Out of Stock';
            await product.save();
          }
        }
      }
    }

    if (status) order.orderStatus = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;

    await order.save();

    res.status(200).json({
      success: true,
      message: `Order ${order.orderNumber} updated to ${order.orderStatus}`,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel order (Customer)
// @route   PATCH /api/orders/:id/cancel
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancelReason } = req.body;

    let order = null;
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: id.toUpperCase() });
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: id });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {
      return res.status(400).json({ success: false, message: 'Dispatched or delivered orders cannot be cancelled directly.' });
    }

    // Restore stock
    for (const item of order.items) {
      if (item.product) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          product.unitsSold = Math.max(0, product.unitsSold - item.quantity);
          product.inStock = product.stock > 0;
          product.status = product.stock > 0 ? 'Active' : 'Out of Stock';
          await product.save();
        }
      }
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order ${order.orderNumber} has been cancelled.`,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

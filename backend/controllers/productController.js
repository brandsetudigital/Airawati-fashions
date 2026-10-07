const Product = require('../models/Product');

// @desc    Get all products with dynamic search, filter, sort & pagination
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      fabric,
      mood,
      minPrice,
      maxPrice,
      inStock,
      featured,
      status,
      sort,
      page = 1,
      limit = 50
    } = req.query;

    const query = {};

    // Search query
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortTitle: { $regex: search, $options: 'i' } },
        { fabric: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'All' && category !== 'all') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Fabric / Material filter
    if (fabric && fabric !== 'All' && fabric !== 'all') {
      query.fabric = { $regex: fabric, $options: 'i' };
    }

    // Mood filter
    if (mood && mood !== 'All' && mood !== 'all') {
      query.mood = mood.toLowerCase();
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // In stock filter
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

    // Featured filter
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Status filter (admin might ask for Draft / Out of Stock / Active)
    if (status && status !== 'All') {
      query.status = status;
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'popularity') sortOption = { unitsSold: -1 };

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by ID or SKU
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    // Check if ID is a valid MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    // If not found by ObjectId, search by SKU or title match
    if (!product) {
      product = await Product.findOne({
        $or: [{ sku: id.toUpperCase() }, { sku: id }]
      });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const {
      sku,
      title,
      shortTitle,
      category,
      fabric,
      purity,
      price,
      originalPrice,
      discount,
      stock = 10,
      lowStockAlert = 3,
      image,
      thumbnails,
      description,
      fabricDetails,
      careInstructions,
      mood,
      tags
    } = req.body;

    if (!title || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title, price, category, and primary image are required'
      });
    }

    // Generate SKU if not provided
    const productSku = sku || `AWT-${category.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const existingProduct = await Product.findOne({ sku: productSku });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: `SKU ${productSku} already exists` });
    }

    const product = await Product.create({
      sku: productSku,
      title,
      shortTitle: shortTitle || title,
      category: category.toLowerCase(),
      fabric: fabric || 'Pure Silk Handloom',
      purity: purity || 'Pure Silk Handloom',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.2),
      discount: discount || '',
      stock: Number(stock),
      lowStockAlert: Number(lowStockAlert),
      image,
      thumbnails: thumbnails && thumbnails.length > 0 ? thumbnails : [image],
      description: description || '',
      fabricDetails: fabricDetails || '',
      careInstructions: careInstructions || 'Dry clean only to maintain zari luster',
      mood: mood || 'festive',
      tags: tags || ['Handloom', 'Silk'],
      status: Number(stock) > 0 ? 'Active' : 'Out of Stock'
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);
    if (!product) {
      product = await Product.findOne({ sku: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Update fields
    const updated = await Product.findByIdAndUpdate(product._id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);
    if (!product) {
      product = await Product.findOne({ sku: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(product._id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedId: product._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Quick Stock Update (Admin)
// @route   PATCH /api/products/:id/stock
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, delta } = req.body;

    let product = await Product.findById(id);
    if (!product) {
      product = await Product.findOne({ sku: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (stock !== undefined) {
      product.stock = Math.max(0, Number(stock));
    } else if (delta !== undefined) {
      product.stock = Math.max(0, product.stock + Number(delta));
    }

    product.inStock = product.stock > 0;
    product.status = product.stock > 0 ? 'Active' : 'Out of Stock';

    await product.save();

    res.status(200).json({
      success: true,
      message: `Stock updated for ${product.title}: ${product.stock} units`,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true
    },
    shortTitle: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      lowercase: true,
      trim: true
    },
    fabric: {
      type: String,
      default: 'Pure Silk Handloom'
    },
    purity: {
      type: String,
      default: 'Pure Silk Handloom'
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    discount: {
      type: String,
      default: ''
    },
    stock: {
      type: Number,
      required: true,
      default: 10,
      min: 0
    },
    inStock: {
      type: Boolean,
      default: true
    },
    lowStockAlert: {
      type: Number,
      default: 3
    },
    unitsSold: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 10
    },
    image: {
      type: String,
      required: [true, 'Primary image is required']
    },
    thumbnails: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      default: ''
    },
    fabricDetails: {
      type: String,
      default: ''
    },
    careInstructions: {
      type: String,
      default: 'Dry clean only to maintain zari luster'
    },
    tags: {
      type: [String],
      default: ['Handloom', 'Silk']
    },
    mood: {
      type: String,
      enum: ['wedding', 'festive', 'everyday', 'royal', 'classic'],
      default: 'festive'
    },
    status: {
      type: String,
      enum: ['Active', 'Draft', 'Out of Stock'],
      default: 'Active'
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Pre-save middleware to automatically calculate stockStatus & inStock
productSchema.pre('save', function (next) {
  this.inStock = this.stock > 0;
  if (this.stock === 0) {
    this.status = 'Out of Stock';
  } else if (this.status === 'Out of Stock' && this.stock > 0) {
    this.status = 'Active';
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' }, // Home, Work, etc.
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: 'Madhya Pradesh' },
  pincode: { type: String, required: true },
  phone: { type: String },
  isDefault: { type: Boolean, default: false }
});

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  shortTitle: { type: String, default: '' },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  image: { type: String, default: '' },
  fabric: { type: String, default: '' },
  quantity: { type: Number, default: 1 }
}, { _id: false });

const wishlistItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  shortTitle: { type: String, default: '' },
  price: { type: Number, default: 0 },
  image: { type: String, default: '' },
  fabric: { type: String, default: '' }
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    phone: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    },
    avatar: {
      type: String,
      default: '/images/admin_avatar.jpg'
    },
    addresses: [addressSchema],
    wishlist: [wishlistItemSchema],
    cart: [cartItemSchema],
    verificationCode: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

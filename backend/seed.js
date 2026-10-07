const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Category = require('./models/Category');

const CATEGORIES_DATA = [
  {
    slug: 'maheshwari',
    name: 'Maheshwar Sarees',
    subtitle: 'Traditional handwoven excellence',
    tag: 'Heritage Craft',
    image: '/images/category_saree_purple.png',
    count: '32 Sarees'
  },
  {
    slug: 'banarasi',
    name: 'Banarasi Sarees',
    subtitle: 'Luxurious silk masterpieces',
    tag: 'Bridal Heirloom',
    image: '/images/wedding_vibes.jpg',
    count: '28 Sarees'
  },
  {
    slug: 'chanderi',
    name: 'Chanderi Collection',
    subtitle: 'Light and elegant drapes',
    tag: 'Festive Drape',
    image: '/images/saree_peacock.jpg',
    count: '24 Sarees'
  },
  {
    slug: 'kanjivaram',
    name: 'Kanjivaram Heritage',
    subtitle: 'Pure mulberry silk with korvai borders',
    tag: 'Timeless Classic',
    image: '/images/hero_model.jpg',
    count: '18 Sarees'
  }
];

const PRODUCTS_DATA = [
  {
    sku: 'AWT-BAN-021',
    title: 'Royal Magenta Banarasi Pure Silk Bridal Saree with Antique Zari',
    shortTitle: 'Royal Magenta Banarasi',
    category: 'banarasi',
    fabric: 'Pure Silk Handloom',
    purity: 'Pure Silk Handloom',
    price: 14500,
    originalPrice: 17500,
    discount: '17% OFF',
    stock: 8,
    lowStockAlert: 3,
    unitsSold: 24,
    rating: 5.0,
    reviewsCount: 248,
    image: '/images/hero_model.jpg',
    thumbnails: ['/images/hero_model.jpg', '/images/saree_banarasi_coral_pink.jpg'],
    description: 'A masterpiece from Varanasi looms, crafted with authentic antique gold zari, intricate kadhwa weave, and a grand opulent pallu for unforgettable bridal majesty.',
    fabricDetails: '100% Katan Pure Silk, Hand-spun Zari, 6.2 meters including unstitched blouse piece',
    careInstructions: 'Dry clean only. Store wrapped in pure muslin cloth.',
    mood: 'wedding',
    tags: ['Bridal', 'Banarasi', 'Pure Silk', 'Heirloom'],
    featured: true,
    status: 'Active'
  },
  {
    sku: 'AWT-MAH-014',
    title: 'Maheshwari Silk-Cotton Handloom Saree with Reversible Zari Border',
    shortTitle: 'Royal Maheshwar Silk',
    category: 'maheshwari',
    fabric: 'Silk Cotton Blend',
    purity: 'Silk Cotton Handloom',
    price: 12500,
    originalPrice: 15500,
    discount: '19% OFF',
    stock: 14,
    lowStockAlert: 4,
    unitsSold: 18,
    rating: 4.9,
    reviewsCount: 184,
    image: '/images/category_saree_purple.png',
    thumbnails: ['/images/category_saree_purple.png', '/images/saree_maheshwari_pure_handloom.jpg'],
    description: 'Directly from the historic looms of Maheshwar, featuring traditional Narmada wave border motifs, delicate gossamer feel, and rich reversible zari pallu.',
    fabricDetails: '50% Mulberry Silk Warp, 50% Fine Cotton Weft, 5.5m Saree + 0.8m Blouse',
    careInstructions: 'Dry clean recommended. Gentle hand wash in cold water with mild detergent.',
    mood: 'festive',
    tags: ['Maheshwari', 'Silk Cotton', 'Narmada Wave', 'Handloom'],
    featured: true,
    status: 'Active'
  },
  {
    sku: 'AWT-KAN-019',
    title: 'Vandita Kanjivaram Pure Silk Saree with Heavy Gold Korvai Border',
    shortTitle: 'Vandita Kanjivaram Silk',
    category: 'kanjivaram',
    fabric: 'Pure Mulberry Silk',
    purity: 'Pure Silk Mark Certified',
    price: 11500,
    originalPrice: 14000,
    discount: '18% OFF',
    stock: 10,
    lowStockAlert: 4,
    unitsSold: 14,
    rating: 5.0,
    reviewsCount: 96,
    image: '/images/saree_kanjeevaram_zari_silk.jpg',
    thumbnails: ['/images/saree_kanjeevaram_zari_silk.jpg', '/images/saree_peacock.jpg'],
    description: 'Woven with three-ply silk yarn and pure silver zari electroplated with 24k gold. Displays peacock and rudraksha motifs inspired by ancient temple architecture.',
    fabricDetails: 'Certified Pure Kanchipuram Silk with Silk Mark tag, contrasting korvai weaving',
    careInstructions: 'Dry clean only. Roll in cotton saree bag.',
    mood: 'wedding',
    tags: ['Kanjivaram', 'Temple Border', 'Silk Mark', 'Gold Zari'],
    featured: true,
    status: 'Active'
  },
  {
    sku: 'AWT-CHA-008',
    title: 'Moksha Sky Chanderi Zari Buti Saree with Sheer Elegance',
    shortTitle: 'Moksha Sky Chanderi',
    category: 'chanderi',
    fabric: 'Chanderi Silk Cotton',
    purity: 'Chanderi Handloom',
    price: 2250,
    originalPrice: 2800,
    discount: '20% OFF',
    stock: 18,
    lowStockAlert: 5,
    unitsSold: 42,
    rating: 4.8,
    reviewsCount: 112,
    image: '/images/saree_mangalagiri_mint_green.jpg',
    thumbnails: ['/images/saree_mangalagiri_mint_green.jpg'],
    description: 'Feather-light Chanderi saree woven with fine silk warp and cotton weft, adorned with delicate golden ashrafi butis that shimmer in ambient light.',
    fabricDetails: 'Fine 300-count Cotton Silk blend, unstitched contrast blouse piece included',
    careInstructions: 'Dry clean only.',
    mood: 'everyday',
    tags: ['Chanderi', 'Lightweight', 'Ashrafi Buti'],
    featured: true,
    status: 'Active'
  },
  {
    sku: 'AWT-BAN-033',
    title: 'Rakashi Olive Banarasi Silk Saree with Antique Kadwa Weave',
    shortTitle: 'Rakashi Olive Banarasi',
    category: 'banarasi',
    fabric: 'Pure Silk Fabric',
    purity: 'Pure Handloom',
    price: 8150,
    originalPrice: 9900,
    discount: '18% OFF',
    stock: 6,
    lowStockAlert: 3,
    unitsSold: 11,
    rating: 4.9,
    reviewsCount: 65,
    image: '/images/saree_olive_green_cotton.jpg',
    thumbnails: ['/images/saree_olive_green_cotton.jpg'],
    description: 'Unique earthy olive tone woven with traditional Banarasi meenakari florals and antique matte zari border.',
    fabricDetails: 'Pure Handloom Silk, 6.3m total length',
    careInstructions: 'Dry clean only.',
    mood: 'festive',
    tags: ['Olive', 'Banarasi', 'Meenakari'],
    featured: false,
    status: 'Active'
  },
  {
    sku: 'AWT-COT-042',
    title: 'Jaitra Red Handloom Cotton Saree with Temple Border',
    shortTitle: 'Jaitra Red Cotton Saree',
    category: 'maheshwari',
    fabric: 'Pure Organic Cotton',
    purity: '100% Handloom Cotton',
    price: 3600,
    originalPrice: 4200,
    discount: '14% OFF',
    stock: 22,
    lowStockAlert: 5,
    unitsSold: 35,
    rating: 4.7,
    reviewsCount: 88,
    image: '/images/category_saree_orange.png',
    thumbnails: ['/images/category_saree_orange.png'],
    description: 'Breathable organic cotton woven on traditional pit looms in Maheshwar, finished with rich maroon temple borders.',
    fabricDetails: '100% Breathable Khadi Cotton',
    careInstructions: 'Gentle hand wash in cold water.',
    mood: 'everyday',
    tags: ['Cotton', 'Comfort', 'Temple Border'],
    featured: false,
    status: 'Active'
  },
  {
    sku: 'AWT-BAN-055',
    title: 'Chatrit Rust Banarasi Saree with Resham Meena Border',
    shortTitle: 'Chatrit Rust Banarasi',
    category: 'banarasi',
    fabric: 'Banarasi Art Silk',
    purity: 'Handloom Art Silk',
    price: 6450,
    originalPrice: 7800,
    discount: '17% OFF',
    stock: 5,
    lowStockAlert: 2,
    unitsSold: 9,
    rating: 4.8,
    reviewsCount: 42,
    image: '/images/category_saree_mustard.png',
    thumbnails: ['/images/category_saree_mustard.png'],
    description: 'Warm rust tone enriched with dual-tone resham thread work and antique gold brocade pallu.',
    fabricDetails: 'Art Silk with fine Resham embroidery',
    careInstructions: 'Dry clean only.',
    mood: 'festive',
    tags: ['Rust', 'Resham', 'Festive'],
    featured: false,
    status: 'Active'
  },
  {
    sku: 'AWT-MAH-062',
    title: 'Teal Green Maheshwari Handloom Saree with Royal Gold Pallu',
    shortTitle: 'Teal Green Maheshwari',
    category: 'maheshwari',
    fabric: 'Pure Silk Cotton',
    purity: 'Pure Handloom',
    price: 9800,
    originalPrice: 11900,
    discount: '18% OFF',
    stock: 12,
    lowStockAlert: 4,
    unitsSold: 16,
    rating: 5.0,
    reviewsCount: 130,
    image: '/images/category_saree_teal.png',
    thumbnails: ['/images/category_saree_teal.png'],
    description: 'Rich jewel-toned teal green drape featuring authentic bugdi border and intricate floral motifs in pure zari.',
    fabricDetails: 'Pure Handloom Silk Cotton',
    careInstructions: 'Dry clean recommended.',
    mood: 'royal',
    tags: ['Teal Green', 'Royal Zari', 'Maheshwari'],
    featured: true,
    status: 'Active'
  }
];

const INITIAL_ORDERS_DATA = [
  {
    orderNumber: 'AWT12345',
    customerName: 'Aditi Sharma',
    customerEmail: 'aditi.sharma@example.com',
    customerPhone: '+91 8982065895',
    items: [
      {
        sku: 'AWT-BAN-033',
        title: 'Rakashi Olive Banarasi Silk Saree',
        shortTitle: 'Rakashi Olive Banarasi',
        image: '/images/saree_olive_green_cotton.jpg',
        price: 8150,
        quantity: 1,
        fabric: 'Pure Silk Fabric'
      }
    ],
    subtotal: 8150,
    taxGst: 407,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: 8150,
    paymentMethod: 'Online / UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Confirmed',
    shippingAddress: {
      street: 'B-402, Lotus Grandeur, Linking Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      phone: '+91 8982065895'
    }
  },
  {
    orderNumber: 'AWT12344',
    customerName: 'Rohan Verma',
    customerEmail: 'rohan.v@example.com',
    customerPhone: '+91 97112 54321',
    items: [
      {
        sku: 'AWT-COT-042',
        title: 'Jaitra Red Cotton Saree',
        shortTitle: 'Jaitra Red Cotton Saree',
        image: '/images/category_saree_orange.png',
        price: 3600,
        quantity: 1,
        fabric: '100% Handloom Cotton'
      }
    ],
    subtotal: 3600,
    taxGst: 180,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: 3600,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Shipped',
    shippingAddress: {
      street: 'Flat 12A, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
      phone: '+91 97112 54321'
    }
  },
  {
    orderNumber: 'AWT12343',
    customerName: 'Priya Iyer',
    customerEmail: 'priya.iyer@example.com',
    customerPhone: '+91 94440 98765',
    items: [
      {
        sku: 'AWT-CHA-008',
        title: 'Moksha Sky Chanderi Saree',
        shortTitle: 'Moksha Sky Chanderi',
        image: '/images/saree_mangalagiri_mint_green.jpg',
        price: 2250,
        quantity: 1,
        fabric: 'Chanderi Silk Cotton'
      }
    ],
    subtotal: 2250,
    taxGst: 112,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: 2250,
    paymentMethod: 'Online / UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    shippingAddress: {
      street: '24, TTK Road, Alwarpet',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600018',
      phone: '+91 94440 98765'
    }
  },
  {
    orderNumber: 'AWT12342',
    customerName: 'Sunita Joshi',
    customerEmail: 'sunita.j@example.com',
    customerPhone: '+91 98220 45678',
    items: [
      {
        sku: 'AWT-KAN-019',
        title: 'Vandita Kanjivaram Silk Saree',
        shortTitle: 'Vandita Kanjivaram Silk',
        image: '/images/saree_kanjeevaram_zari_silk.jpg',
        price: 11500,
        quantity: 1,
        fabric: 'Pure Mulberry Silk'
      }
    ],
    subtotal: 11500,
    taxGst: 575,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: 11500,
    paymentMethod: 'COD',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      street: 'Plot 88, Model Colony, Shivajinagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411016',
      phone: '+91 98220 45678'
    }
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/airawati';
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Category.deleteMany();
    console.log('🧹 Existing collections cleared.');

    // 1. Seed Categories
    await Category.insertMany(CATEGORIES_DATA);
    console.log(`✅ ${CATEGORIES_DATA.length} Categories seeded.`);

    // 2. Seed Products
    await Product.insertMany(PRODUCTS_DATA);
    console.log(`✅ ${PRODUCTS_DATA.length} Products seeded.`);

    // 3. Seed Users
    // Admin User
    await User.create({
      name: 'Aditi Sharma',
      email: 'admin@airawati.com',
      password: 'admin123',
      phone: '+91 8982065895',
      role: 'admin',
      avatar: '/images/admin_avatar.jpg',
      isVerified: true
    });

    // Customer User
    await User.create({
      name: 'Aditi Sharma',
      email: 'aditi.sharma@example.com',
      password: 'password123',
      phone: '+91 8982065895',
      role: 'customer',
      avatar: '/images/admin_avatar.jpg',
      isVerified: true,
      addresses: [
        {
          label: 'Home',
          street: 'B-402, Lotus Grandeur, Linking Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050',
          phone: '+91 8982065895',
          isDefault: true
        }
      ]
    });
    console.log('✅ Admin (admin@airawati.com / admin123) and Customer users created.');

    // 4. Seed Orders
    await Order.insertMany(INITIAL_ORDERS_DATA);
    console.log(`✅ ${INITIAL_ORDERS_DATA.length} Initial orders seeded.`);

    console.log('\n🎉 ALL DATABASE COLLECTIONS SEEDED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();

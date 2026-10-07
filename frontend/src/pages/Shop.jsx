import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import SareeCard from '../components/SareeCard';
import CollectionSlider from '../components/CollectionSlider';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import api from '../services/api';


const HANDLOOM_CARDS = [
  {
    id: 1,
    title: 'Maheshwar Sarees',
    subtitle: 'Traditional handwoven excellence',
    status: 'Explore Collection',
    isAvailable: true,
    material: 'Silk',
    image: '/images/handloom_collection_1.jpg',
  },
  {
    id: 2,
    title: 'Banarasi Sarees',
    subtitle: 'Luxurious silk masterpieces',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Banarasi',
    image: '/images/handloom_collection_2.jpg',
  },
  {
    id: 3,
    title: 'Chanderi Collection',
    subtitle: 'Light and elegant drapes',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Chanderi',
    image: '/images/handloom_collection_3.jpg',
  },
  {
    id: 4,
    title: 'Maheshwar Sarees',
    subtitle: 'Traditional handwoven excellence',
    status: 'Explore Collection',
    isAvailable: true,
    material: 'Silk',
    image: '/images/handloom_collection_4.jpg',
  },
  {
    id: 5,
    title: 'Banarasi Sarees',
    subtitle: 'Luxurious silk masterpieces',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Banarasi',
    image: '/images/handloom_collection_5.jpg',
  },
  {
    id: 6,
    title: 'Chanderi Collection',
    subtitle: 'Light and elegant drapes',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Chanderi',
    image: '/images/handloom_collection_6.jpg',
  },
];

export default function Shop() {
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [displayCount, setDisplayCount] = useState(12);

  const [productsList, setProductsList] = useState(PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Fetch live products from MongoDB backend (Strictly SAREES for this catalog)
  useEffect(() => {
    setIsLoadingProducts(true);
    api.products.getAll()
      .then((res) => {
        if (res && res.products && res.products.length > 0) {
          // Filter ONLY SAREES (exclude blouses and jewelry so they don't mix)
          const sareeOnly = res.products.filter((p) => {
            const cat = (p.category || '').toLowerCase();
            const title = (p.title || '').toLowerCase();
            const isBlouse = cat.includes('blouse') || cat.includes('boutique') || title.includes('blouse');
            const isAcc = cat.includes('accessories') || cat.includes('jewel') || cat.includes('potli') || cat.includes('belt') || title.includes('necklace') || title.includes('haram') || title.includes('earring');
            return !isBlouse && !isAcc;
          });

          if (sareeOnly.length > 0) {
            const live = sareeOnly.map((p) => ({
              id: p._id || p.id,
              sku: p.sku,
              title: p.title || p.name,
              shortTitle: p.shortTitle || p.title || p.name,
              category: p.category || 'Handloom',
              categoryId: p.category || 'all',
              fabric: p.fabric || 'Pure Silk Handloom',
              purity: p.purity || 'Handloom Authentic',
              price: Number(p.price),
              originalPrice: Number(p.originalPrice || Math.round(p.price * 1.2)),
              discount: p.discount || '15% OFF',
              image: p.image || '/images/hero_model.jpg',
              thumbnails: p.thumbnails && p.thumbnails.length > 0 ? p.thumbnails : [p.image || '/images/hero_model.jpg'],
              description: p.description || '',
              stock: p.stock !== undefined ? p.stock : 10,
              inStock: p.stock > 0,
              rating: p.rating || 5.0,
              reviewsCount: p.reviewsCount || 120
            }));
            setProductsList(live);
          }
        }
      })
      .catch((err) => {
        console.warn('Backend products notice, using fallback:', err.message);
      })
      .finally(() => setIsLoadingProducts(false));
  }, []);

  const materials = ['All', 'Silk', 'Cotton', 'Banarasi', 'Kanjivaram', 'Chanderi'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹10,000', min: 0, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: '₹20,000 - ₹30,000', min: 20000, max: 30000 },
    { label: 'Above ₹30,000', min: 30000, max: Infinity }
  ];

  // Filtering over live products
  const filteredProducts = productsList.filter((product) => {
    // Material filter
    if (selectedMaterial !== 'All') {
      const matLower = selectedMaterial.toLowerCase();
      const match =
        (product.fabric && product.fabric.toLowerCase().includes(matLower)) ||
        (product.categoryId && product.categoryId.toLowerCase().includes(matLower)) ||
        (product.category && product.category.toLowerCase().includes(matLower)) ||
        (product.title && product.title.toLowerCase().includes(matLower));
      if (!match) return false;
    }

    // Price filter
    if (selectedPrice !== 'All') {
      const range = priceRanges.find(r => r.label === selectedPrice);
      if (range) {
        if (product.price < range.min || product.price > range.max) return false;
      }
    }

    return true;
  });

  const handleMaterialChange = (m) => {
    setSelectedMaterial(m);
    setDisplayCount(12);
  };

  const handlePriceChange = (pr) => {
    setSelectedPrice(pr);
    setDisplayCount(12);
  };

  return (
    <div className="space-y-16 pb-16">

      {/* Hero Banner with Mandalas - Framed Matching Our Journey & Home */}
      <section className="relative w-full bg-[#FAF5F0] border-b border-[#C5A059]/20 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-3 sm:px-6">
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#C5A059]/30 min-h-[360px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] flex items-center justify-center"
            style={{
              backgroundColor: '#FDF0CE',
            }}
          >
            {/* Left Mandala - Pinned to left edge, touches top and bottom of banner */}
            <img 
              src="/images/shop_hero_mandala_left_clean.png" 
              alt="" 
              className="absolute left-0 top-0 h-full w-auto max-w-[22%] sm:max-w-[28%] md:max-w-[26%] object-contain object-left pointer-events-none select-none z-0 opacity-80 sm:opacity-100" 
            />

            {/* Right Mandala - Pinned to right edge, touches top and bottom of banner */}
            <img 
              src="/images/shop_hero_mandala_right_clean.png" 
              alt="" 
              className="absolute right-0 top-0 h-full w-auto max-w-[22%] sm:max-w-[28%] md:max-w-[26%] object-contain object-right pointer-events-none select-none z-0 opacity-80 sm:opacity-100" 
            />

            {/* Center Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto py-8">
              {/* Sparkle Tag */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C5A059] font-bold mb-2 sm:mb-3">
                <svg className="w-3.5 h-3.5 fill-[#C5A059]" viewBox="0 0 24 24">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
                <span>Handwoven Heritage</span>
              </div>

              {/* Heading: Handwoven (Line 1), Elegance (Line 2) */}
              <h1 className="font-serif tracking-tight leading-[0.92] text-center">
                <span className="block text-3xl sm:text-6xl md:text-7xl font-bold text-[#6E2017]">
                  Handwoven
                </span>
                <span className="block text-3xl sm:text-6xl md:text-7xl font-bold text-[#B04643] mt-1 sm:mt-1.5">
                  Elegance
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-stone-700/80 text-xs sm:text-sm md:text-base font-light tracking-wide mt-3 sm:mt-4 max-w-sm sm:max-w-md mx-auto">
                Timeless sarees crafted with care and tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Preview Gallery */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 text-center py-4 sm:py-6">
        {/* Top Sparkle Ornament */}
        <div className="flex items-center justify-center mb-1.5 text-[#C5A059]">
          <svg className="w-3.5 h-3.5 fill-[#C5A059]" viewBox="0 0 24 24">
            <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5L12 0Z" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E060D]">
          Our <span className="text-[#C84C32]">Collection</span>
        </h2>

        {/* Subtitle */}
        <p className="text-stone-600/90 text-xs sm:text-sm max-w-2xl mx-auto mt-2.5 mb-8 sm:mb-10 leading-relaxed font-light px-4">
          Thoughtfully curated handwoven sarees that celebrate tradition, craftsmanship, and timeless design. Each piece is created with attention to detail, natural fabrics, and skilled artistry.
        </p>

        {/* 7 Models Sliding Carousel with smooth infinite rotation */}
        <CollectionSlider />
      </section>

      {/* Our Handloom Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-px w-8 bg-[#C5A059]"></span>
          <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
          <span className="h-px w-8 bg-[#C5A059]"></span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D]">
          Our <span className="text-[#5C1329] italic font-normal">Handloom Collection</span>
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm mt-1 mb-8 max-w-xl mx-auto font-light">
          Explore our curated selection of handcrafted sarees
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {HANDLOOM_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                if (card.isAvailable) {
                  setSelectedMaterial(card.material);
                  const el = document.getElementById('shop-products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-[#C5A059]/25 bg-[#1E060D]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

              {/* Status Badge at Top Right */}
              {!card.isAvailable && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/50 backdrop-blur-md text-amber-200/90 border border-white/15 shadow-sm">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Card Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs text-stone-300 font-light pb-1">
                  {card.subtitle}
                </p>
                <div className="pt-1">
                  {card.isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6C687] group-hover:text-white transition-colors">
                      Explore Collection &rarr;
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/15 backdrop-blur-sm text-stone-200 border border-white/20">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section id="shop-products-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#C5A059]/20 shadow-sm">
          
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">Shop by Category</span>
            <h2 className="font-serif text-3xl font-bold text-[#1E060D] mt-1">
              Explore Our <span className="text-[#5C1329] italic font-normal">Collection</span>
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Showing {Math.min(displayCount, filteredProducts.length)} of {filteredProducts.length} handcrafted sarees
            </p>

            {/* Department Quick Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#5C1329] text-white shadow-xs flex items-center gap-1.5 cursor-default">
                <span>🥻</span>
                <span>Pure Handloom Sarees ({filteredProducts.length})</span>
              </span>
              <Link
                to="/boutique"
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-[#FAF2F4] border border-[#F0D5DA] text-stone-700 hover:text-[#5C1329] hover:border-[#5C1329] transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <span>✂️</span>
                <span>Boutique Blouses →</span>
              </Link>
              <Link
                to="/accessories"
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-[#FAF2F4] border border-[#F0D5DA] text-stone-700 hover:text-[#5C1329] hover:border-[#5C1329] transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <span>💎</span>
                <span>Jewellery & Accessories →</span>
              </Link>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="space-y-4 pb-6 border-b border-stone-200">
            {/* Material */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-stone-700 mr-2">By Material:</span>
              {materials.map((m) => (
                <button
                  key={m}
                  onClick={() => handleMaterialChange(m)}
                  className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                    selectedMaterial === m
                      ? 'bg-[#5C1329] text-white shadow-sm'
                      : 'bg-white border border-[#C5A059]/30 text-stone-700 hover:border-[#5C1329]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-stone-700 mr-2">By Price:</span>
              {priceRanges.map((pr) => (
                <button
                  key={pr.label}
                  onClick={() => handlePriceChange(pr.label)}
                  className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                    selectedPrice === pr.label
                      ? 'bg-[#5C1329] text-white shadow-sm'
                      : 'bg-white border border-[#C5A059]/30 text-stone-700 hover:border-[#5C1329]'
                  }`}
                >
                  {pr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-6 sm:mt-8">
            {filteredProducts.slice(0, displayCount).map((product) => (
              <SareeCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          {displayCount < filteredProducts.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setDisplayCount(prev => prev + 8)}
                className="px-8 py-3 border border-[#5C1329] text-[#5C1329] hover:bg-[#FAF6F0] rounded-full text-xs font-semibold tracking-wider transition-colors shadow-sm"
              >
                Load More Sarees ({filteredProducts.length - displayCount} Remaining)
              </button>
            </div>
          )}

        </div>
      </section>

      {/**/}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#5C1329] text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center shadow-luxury-lg border border-[#C5A059]/40">
          <div className="flex flex-col items-center">
            <Award className="w-8 h-8 text-[#C5A059] mb-3" />
            <h4 className="font-serif font-bold text-lg">Handwoven</h4>
            <p className="text-xs text-stone-200 mt-1">100% authentic handloom craftsmanship</p>
          </div>

          <div className="flex flex-col items-center md:border-x md:border-white/20 px-4">
            <HeartHandshake className="w-8 h-8 text-[#C5A059] mb-3" />
            <h4 className="font-serif font-bold text-lg">Direct from Artisans</h4>
            <p className="text-xs text-stone-200 mt-1">Supporting traditional weavers directly</p>
          </div>

          <div className="flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-3" />
            <h4 className="font-serif font-bold text-lg">Premium Quality</h4>
            <p className="text-xs text-stone-200 mt-1">Carefully curated and verified pure silk</p>
          </div>
        </div>
      </section>

      {/**/}
      <section className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-[#C5A059] mb-2 text-xl">&hearts;</div>
        <h3 className="font-serif text-2xl font-bold text-[#5C1329]">Join the Airawati Family</h3>
        <p className="text-stone-500 text-xs mt-1">Get updates on new saree launches, artisan stories, and exclusive offers</p>
        <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully! ✨"); }} className="mt-4 flex rounded-full overflow-hidden border border-[#C5A059]/40 bg-white p-1 shadow-sm">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 text-xs focus:outline-none bg-transparent"
          />
          <button type="submit" className="px-6 py-2.5 bg-[#5C1329] text-white text-xs font-semibold rounded-full hover:bg-[#430D1E] transition-colors">
            Subscribe
          </button>
        </form>
      </section>

    </div>
  );
}

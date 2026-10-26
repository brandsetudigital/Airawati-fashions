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
    image: '/handloom_collection_1.jpeg',
  },
  {
    id: 2,
    // title: 'Banarasi Sarees',
    subtitle: 'Luxurious silk masterpieces',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Banarasi',
    image: '/maheshvari.jpeg',
  },
  {
    id: 3,
    // title: 'Chanderi Collection',
    subtitle: 'Light and elegant drapes',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Chanderi',
    image: '/maheshwari.jpeg',
  },
  {
    id: 4,
    title: 'Banarasi Sarees',
    subtitle: 'Traditional handwoven excellence',
    status: 'Explore Collection',
    isAvailable: true,
    material: 'Silk',
    image: '/images/handloom_collection_4.jpg',
  },
  {
    id: 5,
    // title: 'Banarasi Sarees',
    subtitle: 'Luxurious silk masterpieces',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Banarasi',
    image: '/banarasi.jpeg',
  },
  {
    id: 6,
    // title: 'Chanderi Collection',
    subtitle: 'Light and elegant drapes',
    status: 'Coming Soon',
    isAvailable: false,
    material: 'Chanderi',
    image: '/banarsi.jpeg',
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
      {/* <section className="relative w-full bg-[#FAF5F0] border-b border-[#C5A059]/20 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-3 sm:px-6">
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#C5A059]/30 min-h-[360px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] flex items-center justify-center"
            style={{
              backgroundColor: '#FDF0CE',
            }} */}
          
            {/* Left Mandala - Pinned to left edge, touches top and bottom of banner */}
            {/* <img 
              src="/images/shop_hero_mandala_left_clean.png" 
              alt="" 
              className="absolute left-0 top-0 h-full w-auto max-w-[22%] sm:max-w-[28%] md:max-w-[26%] object-contain object-left pointer-events-none select-none z-0 opacity-80 sm:opacity-100" 
            /> */}

            {/* Right Mandala - Pinned to right edge, touches top and bottom of banner */}
            {/* <img 
              src="/images/shop_hero_mandala_right_clean.png" 
              alt="" 
              className="absolute right-0 top-0 h-full w-auto max-w-[22%] sm:max-w-[28%] md:max-w-[26%] object-contain object-right pointer-events-none select-none z-0 opacity-80 sm:opacity-100" 
            /> */}

            {/* Center Content */}
            {/* <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto py-8">
              {/* Sparkle Tag */}
              {/* <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C5A059] font-bold mb-2 sm:mb-3">
                <svg className="w-3.5 h-3.5 fill-[#C5A059]" viewBox="0 0 24 24">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
                <span>Handwoven Heritage</span>
              </div>  */}

              {/* Heading: Handwoven (Line 1), Elegance (Line 2) */}
              {/* <h1 className="font-serif tracking-tight leading-[0.92] text-center">
                <span className="block text-3xl sm:text-6xl md:text-7xl font-bold text-[#6E2017]">
                  Handwoven
                </span>
                <span className="block text-3xl sm:text-6xl md:text-7xl font-bold text-[#B04643] mt-1 sm:mt-1.5">
                  Elegance
                </span>
              </h1> */}

              {/* Subtitle */}
              {/* <p className="text-stone-700/80 text-xs sm:text-sm md:text-base font-light tracking-wide mt-3 sm:mt-4 max-w-sm sm:max-w-md mx-auto">
                Timeless sarees crafted with care and tradition.
              </p>
            </div>
          </div>
        </div>
      </section> */}




{/* ================= SHOP HERO BANNER - FULL SCREEN WIDTH ================= */}
<section className="relative w-full m-0 p-0 overflow-hidden bg-[#FDF0CE]">

  {/* Full Width Hero Image */}
  <div className="relative w-full h-[260px] sm:h-[380px] md:h-[480px] lg:h-[540px] xl:h-[600px] 2xl:h-[680px]">

    <img
      src="/shophead.png"
      alt="Handwoven Elegance - Timeless sarees crafted with care and tradition"
      className="absolute inset-0 block w-full h-full object-cover object-center"
      loading="eager"
      fetchPriority="high"
    />

  </div>

</section>





<section className="relative w-full overflow-hidden bg-[#FFFCF7] py-10 sm:py-14 lg:py-16">

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

    {/* Eyebrow Text */}
    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#A47A36] mb-3">
      Discover the Art of Indian Handloom
    </p>

    {/* Main Heading */}
    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-[#5C1329]">
      Our{" "}
      <span className="italic text-[#B74747]">
        Collection
      </span>
    </h2>

    {/* Elegant Heading Divider */}
    <div className="flex items-center justify-center gap-2.5 mt-4 mb-4 sm:mt-5 sm:mb-5">
      <span className="w-8 sm:w-12 h-px bg-[#C5A059]/70" />

      <svg
        className="w-4 h-4 text-[#C5A059]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C10 7 7 10 2 12C7 14 10 17 12 22C14 17 17 14 22 12C17 10 14 7 12 2Z" />
      </svg>

      <span className="w-8 sm:w-12 h-px bg-[#C5A059]/70" />
    </div>

    {/* Subtitle */}
    <p className="max-w-xl lg:max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-stone-600 font-light px-2 sm:px-4">
      Discover timeless sarees blending traditional craftsmanship with modern elegance.
    </p>

    {/* Collection Slider */}
    <div className="mt-8 sm:mt-10 lg:mt-12">
      <CollectionSlider />
    </div>

  </div>
</section>


{/* ================= OUR HANDLOOM COLLECTION ================= */}
<section className="relative w-full overflow-hidden bg-[#FFFCF7] py-10 sm:py-14 lg:py-16">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center mb-8 sm:mb-10 lg:mb-12">

     

      {/* Eyebrow Text */}
      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#A47A36] mb-3">
        Woven with Love & Tradition
      </p>


       <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-[#5C1329]">
        Our{" "}
        <span className="italic text-[#B74747]">
          UpComming Collection
        </span>
      </h2>

      {/* Heading Divider */}
      <div className="flex items-center justify-center gap-2 mt-4 mb-4">
        <span className="w-7 sm:w-10 h-px bg-[#C5A059]/70" />
        <span className="text-[#C5A059] text-sm">✦</span>
        <span className="w-7 sm:w-10 h-px bg-[#C5A059]/70" />
      </div>

      {/* Subtitle */}
      <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-stone-600 font-light">
       Discover our upcoming collection, where timeless tradition meets exquisite elegance.
      </p>

    </div>

    {/* Handloom Collection Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 text-left">

      {HANDLOOM_CARDS.map((card) => (
        <div
          key={card.id}
          onClick={() => {
            if (card.isAvailable) {
              setSelectedMaterial(card.material);

              const el = document.getElementById(
                'shop-products-section'
              );

              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          onKeyDown={(e) => {
            if (
              card.isAvailable &&
              (e.key === 'Enter' || e.key === ' ')
            ) {
              e.preventDefault();
              setSelectedMaterial(card.material);

              const el = document.getElementById(
                'shop-products-section'
              );

              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          role={card.isAvailable ? 'button' : undefined}
          tabIndex={card.isAvailable ? 0 : undefined}
          aria-label={
            card.isAvailable
              ? `Explore ${card.title} collection`
              : `${card.title}, coming soon`
          }
          className={`relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl
            bg-[#5C1329] border border-[#C5A059]/30
            shadow-md hover:shadow-xl
            transition-all duration-500 group
            ${card.isAvailable
              ? 'cursor-pointer hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]'
              : 'cursor-default'
            }`}
        >

          {/* Collection Image */}
          <img
            src={card.image}
            alt={card.title}
            className={`absolute inset-0 w-full h-full object-cover object-top
              transition-transform duration-700 ease-out
              ${card.isAvailable ? 'group-hover:scale-105' : ''}`}
            loading="lazy"
          />

          {/* Elegant Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Subtle Gold Border on Hover */}
          <div className="absolute inset-3 rounded-lg border border-white/0 group-hover:border-[#E6C687]/70 transition-colors duration-500 pointer-events-none" />

          {/* Coming Soon Badge */}
          {!card.isAvailable && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full
                text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider
                bg-black/50 backdrop-blur-md text-[#F2D9A0]
                border border-[#E6C687]/40">
                Coming Soon
              </span>
            </div>
          )}

          {/* Card Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">

            {/* Small Gold Ornament */}
            <div className="w-8 h-px bg-[#E6C687] mb-3" />

            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl
              font-medium text-white leading-tight tracking-wide">
              {card.title}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              {card.subtitle}
            </p>

            {/* Collection Action */}
            <div className="mt-4 pt-3 border-t border-white/25">

              {card.isAvailable ? (
                <span className="inline-flex items-center gap-2
                  text-[10px] sm:text-xs font-semibold uppercase tracking-wider
                  text-[#E6C687] group-hover:text-white transition-colors duration-300">
                  Explore Collection

                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2
                  text-[10px] sm:text-xs font-medium uppercase tracking-wider
                  text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  Coming Soon
                </span>
              )}

            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>
{/* ================= END HANDLOOM COLLECTION ================= */}









      {/* Product Catalog Grid */}
      <section id="shop-products-section" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#C5A059]/20 shadow-sm">

        

{/* Premium Collection Header */}
<div className="text-center mb-8 sm:mb-12 px-4">

  {/* Eyebrow */}
  <p className="text-[9px] sm:text-[11px] uppercase font-semibold tracking-[0.35em] text-[#A47A36] mb-3 sm:mb-4">
    A Legacy of Grace & Craftsmanship
  </p>

  {/* Main Heading */}
  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    font-medium leading-tight tracking-tight text-[#5C1329]">
    Timeless{" "}
    <span className="italic font-normal text-[#B74747]">
      Elegance
    </span>
  </h2>

  {/* Gold Ornament */}
  <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5">
    <span className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />

    <svg
      className="w-4 h-4 text-[#C5A059]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C10 7 7 10 2 12C7 14 10 17 12 22C14 17 17 14 22 12C17 10 14 7 12 2Z" />
    </svg>

    <span className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#C5A059]" />
  </div>

  {/* Subtitle */}
  <p className="text-xs sm:text-sm text-stone-500 font-light tracking-wide mt-4">
    Discover Our Exclusive Saree Collection
  </p>



            {/* Department Quick Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#5C1329] text-white shadow-xs flex items-center gap-1.5 cursor-default">
                {/* <span>🥻</span> */}
                <span>Pure Handloom Sarees ({filteredProducts.length})</span>
              </span>
              <Link
                to="/boutique"
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-[#FAF2F4] border border-[#F0D5DA] text-stone-700 hover:text-[#5C1329] hover:border-[#5C1329] transition-all flex items-center gap-1.5 shadow-2xs"
              >
                {/* <span>✂️</span> */}
                <span>Boutique Blouses →</span>
              </Link>
              <Link
                to="/accessories"
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-[#FAF2F4] border border-[#F0D5DA] text-stone-700 hover:text-[#5C1329] hover:border-[#5C1329] transition-all flex items-center gap-1.5 shadow-2xs"
              >
                {/* <span>💎</span> */}
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

{/*       
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
      </section> */}



    








    
{/* ================= AIRAWATI SIGNATURE PROMISE ================= */}
<section className="relative w-full overflow-hidden bg-[#FFFCF7] py-12 sm:py-16 lg:py-20">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Introduction */}
    <div className="text-center mb-9 sm:mb-12 lg:mb-14">

      <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.35em]
        font-semibold text-[#A47A36] mb-3">
        The Art of Fine Indian Handloom
      </p>

      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl
        font-medium leading-tight text-[#5C1329]">
        More Than a Saree,
        <span className="block italic text-[#B74747] mt-1">
          A Timeless Legacy
        </span>
      </h3>

      <p className="max-w-xl mx-auto mt-4 text-xs sm:text-sm
        leading-6 sm:leading-7 text-stone-600 font-light px-2">
        Every weave tells a story of heritage, artistry and
        the beauty of Indian tradition.
      </p>

      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />
        <span className="text-[#C5A059] text-sm">✦</span>
        <span className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#C5A059]" />
      </div>
    </div>

    {/* Signature Promise Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-7">

      {/* Card 1 */}
      <div className="group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-[#681B32] to-[#3D0B1B]
        border border-[#C5A059]/40 p-7 sm:p-8 lg:p-9
        text-center shadow-md hover:shadow-xl
        hover:-translate-y-1 transition-all duration-500">

        <div className="absolute top-0 left-1/2 -translate-x-1/2
          w-24 h-px bg-gradient-to-r from-transparent via-[#E6C687] to-transparent" />

        <div className="mx-auto flex items-center justify-center
          w-[68px] h-[68px] rounded-full border border-[#C5A059]/50
          bg-[#C5A059]/10 mb-5
          group-hover:bg-[#C5A059]/20 transition-colors duration-300">
          <Award className="w-8 h-8 text-[#E6C687]" strokeWidth={1.4} />
        </div>

        <p className="text-[9px] uppercase tracking-[0.25em]
          text-[#E6C687] mb-2">
          Rooted in Tradition
        </p>

        <h4 className="font-serif text-xl sm:text-2xl text-white">
          Handwoven Heritage
        </h4>

        <p className="text-xs sm:text-sm leading-6 text-stone-200/80
          mt-3 max-w-xs mx-auto font-light">
          Discover the beauty of traditional weaving and timeless Indian artistry.
        </p>

        <div className="w-8 h-px bg-[#C5A059]/70 mx-auto mt-5" />
      </div>

      {/* Card 2 */}
      <div className="group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-[#681B32] to-[#3D0B1B]
        border border-[#C5A059]/40 p-7 sm:p-8 lg:p-9
        text-center shadow-md hover:shadow-xl
        hover:-translate-y-1 transition-all duration-500">

        <div className="absolute top-0 left-1/2 -translate-x-1/2
          w-24 h-px bg-gradient-to-r from-transparent via-[#E6C687] to-transparent" />

        <div className="mx-auto flex items-center justify-center
          w-[68px] h-[68px] rounded-full border border-[#C5A059]/50
          bg-[#C5A059]/10 mb-5
          group-hover:bg-[#C5A059]/20 transition-colors duration-300">
          <HeartHandshake className="w-8 h-8 text-[#E6C687]" strokeWidth={1.4} />
        </div>

        <p className="text-[9px] uppercase tracking-[0.25em]
          text-[#E6C687] mb-2">
          Woven by Skilled Hands
        </p>

        <h4 className="font-serif text-xl sm:text-2xl text-white">
          Artisan Stories
        </h4>

        <p className="text-xs sm:text-sm leading-6 text-stone-200/80
          mt-3 max-w-xs mx-auto font-light">
          Celebrating the dedication, creativity and legacy of Indian artisans.
        </p>

        <div className="w-8 h-px bg-[#C5A059]/70 mx-auto mt-5" />
      </div>

      {/* Card 3 */}
      <div className="group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-[#681B32] to-[#3D0B1B]
        border border-[#C5A059]/40 p-7 sm:p-8 lg:p-9
        text-center shadow-md hover:shadow-xl
        hover:-translate-y-1 transition-all duration-500">

        <div className="absolute top-0 left-1/2 -translate-x-1/2
          w-24 h-px bg-gradient-to-r from-transparent via-[#E6C687] to-transparent" />

        <div className="mx-auto flex items-center justify-center
          w-[68px] h-[68px] rounded-full border border-[#C5A059]/50
          bg-[#C5A059]/10 mb-5
          group-hover:bg-[#C5A059]/20 transition-colors duration-300">
          <ShieldCheck className="w-8 h-8 text-[#E6C687]" strokeWidth={1.4} />
        </div>

        <p className="text-[9px] uppercase tracking-[0.25em]
          text-[#E6C687] mb-2">
          Thoughtfully Curated
        </p>

        <h4 className="font-serif text-xl sm:text-2xl text-white">
          Quality & Care
        </h4>

        <p className="text-xs sm:text-sm leading-6 text-stone-200/80
          mt-3 max-w-xs mx-auto font-light">
          Thoughtfully selected designs with a focus on detail, beauty and elegance.
        </p>

        <div className="w-8 h-px bg-[#C5A059]/70 mx-auto mt-5" />
      </div>

    </div>
  </div>
</section>
{/* ================= END AIRAWATI SIGNATURE PROMISE ================= */}





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

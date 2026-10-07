// frontend/src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import SareeCard from '../components/SareeCard';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import api from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCart();

  const [currentProduct, setCurrentProduct] = useState(() => {
    return PRODUCTS.find((p) => p.id === id || p.sku === id) || PRODUCTS[0];
  });

  useEffect(() => {
    if (id) {
      api.products.getById(id)
        .then((res) => {
          if (res && res.product) {
            const p = res.product;
            setCurrentProduct({
              id: p._id || p.id,
              sku: p.sku,
              title: p.title || p.name,
              shortTitle: p.shortTitle || p.title || p.name,
              category: p.category,
              fabric: p.fabric || 'Pure Silk Handloom',
              purity: p.purity || 'Handloom Authentic',
              price: Number(p.price),
              originalPrice: Number(p.originalPrice || Math.round(p.price * 1.2)),
              discount: p.discount || '15% OFF',
              image: p.image || '/images/hero_model.jpg',
              thumbnails: p.thumbnails && p.thumbnails.length > 0 ? p.thumbnails : [p.image || '/images/hero_model.jpg'],
              description: p.description || '',
              weaveStory: p.weaveStory || 'Masterfully handwoven by heritage artisans.',
              blousePiece: p.blousePiece || 'Matching unstitched 80cm blouse piece included.',
              length: p.length || '6.3 meters with running blouse piece',
              careInstructions: p.careInstructions || 'Dry clean only',
              stock: p.stock !== undefined ? p.stock : 10,
              rating: p.rating || 5.0,
              reviewsCount: p.reviewsCount || 120
            });
          }
        })
        .catch(() => {
          const found = PRODUCTS.find((p) => p.id === id || p.sku === id);
          if (found) setCurrentProduct(found);
        });
    }
  }, [id]);

  const product = currentProduct;
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Use all actual product angle thumbnails without injecting fake saree images
  const displayThumbnails = (product.thumbnails && product.thumbnails.length > 0)
    ? product.thumbnails
    : (product.image ? [product.image] : ['/images/hero_model.jpg']);

  const relatedSarees = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const isSaved = isInWishlist(product.id);

  const handlePrevImg = () => {
    setSelectedImageIdx((prev) => (prev === 0 ? displayThumbnails.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setSelectedImageIdx((prev) => (prev === displayThumbnails.length - 1 ? 0 : prev + 1));
  };

  const handleBuyNow = () => {
    // Navigates directly to Checkout with the EXACT product id and quantity
    navigate(`/checkout?id=${product.id}&qty=${qty}`);
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    showToast(`Added ${qty} × ${product.shortTitle || product.title} to bag!`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    } else {
      showToast('Product URL: ' + window.location.href);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Thank you for subscribing to Airawati!');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FFF5F2]/40 via-[#FAF6F0] to-[#FFF5F2]/20 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* TOP TITLE: "Order details" (Matching Screenshot 1) */}
        <div className="text-center pt-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6E1C24] tracking-tight">
            Order details
          </h1>
        </div>

        {/* MAIN PRODUCT ROW: 2 COLUMNS (Matching Screenshot 1) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start bg-white/70 p-5 sm:p-8 rounded-2xl border border-stone-200/80 shadow-sm">
          
          {/* LEFT COLUMN: MAIN IMAGE & 4 THUMBNAILS */}
          <div className="md:col-span-6 lg:col-span-5 space-y-3.5">
            {/* MAIN IMAGE DISPLAY WITH SQUARE DARK BURGUNDY ARROW BUTTONS */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm shadow-sm border border-stone-300">
              <img
                src={displayThumbnails[selectedImageIdx] || product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Square Burgundy Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrevImg}
                aria-label="Previous image"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#4A151B] hover:bg-[#380E13] text-white flex items-center justify-center transition-colors shadow-md z-10"
              >
                <ChevronLeft className="w-5 h-5 text-white stroke-[2.5]" />
              </button>

              {/* Square Burgundy Right Arrow Button */}
              <button
                type="button"
                onClick={handleNextImg}
                aria-label="Next image"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#4A151B] hover:bg-[#380E13] text-white flex items-center justify-center transition-colors shadow-md z-10"
              >
                <ChevronRight className="w-5 h-5 text-white stroke-[2.5]" />
              </button>
            </div>

            {/* THUMBNAILS ROW (Active one has burgundy border border-2 border-[#6E1C24]) */}
            <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1">
              {displayThumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 sm:w-24 aspect-[3/4] shrink-0 overflow-hidden transition-all rounded-sm cursor-pointer ${
                    selectedImageIdx === idx
                      ? 'border-2 border-[#6E1C24] shadow-sm scale-102'
                      : 'border border-stone-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Product angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT DETAILS */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-start space-y-4 pt-1">
            
            {/* Category */}
            <div className="text-[#1B4D3E] font-bold text-sm tracking-wider uppercase">
              Saree
            </div>

            {/* Title & In Stock Badge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-[#6E1C24] leading-snug">
                {product.title}
              </h2>
              <span className="shrink-0 border border-[#F3C0C0] bg-[#FFF2F2] text-[#8A2B35] text-xs font-bold px-3 py-1.5 rounded-md">
                In Stock
              </span>
            </div>

            {/* Rating Stars + Reviews Count */}
            <div className="flex items-center gap-2.5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-stone-700 font-semibold text-sm">
                ({product.reviewsCount || 248} reviews)
              </span>
            </div>

            {/* Price Row: Green Bold Price + Crossed-out Original Price */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1B4D3E]">
                {product.displayPrice || `₹${product.price.toLocaleString()}`}
              </span>
              {product.originalPrice && (
                <span className="text-stone-500 font-medium line-through text-base">
                  {product.displayOriginalPrice || `₹${product.originalPrice.toLocaleString()}`}
                </span>
              )}
            </div>

            {/* TWO THICK RED/ORANGE HORIZONTAL ACCENT STRIPES (Matching Screenshot 1) */}
            <div className="space-y-1.5 my-3">
              <div className="w-full h-1.5 bg-[#C04838] rounded-full"></div>
              <div className="w-full h-1.5 bg-[#C04838] rounded-full"></div>
            </div>

            {/* Purity Label */}
            <div className="text-sm font-bold text-[#1B4D3E]">
              Purity
            </div>

            {/* Quantity Selector + Add To Cart + Buy Now Buttons (In one horizontal row) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Pinkish Quantity Selector */}
              <div className="inline-flex items-center border border-[#F3C0C0] bg-[#FFEBEB] rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3.5 py-2 text-stone-900 hover:text-[#6E1C24] font-bold text-base"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-stone-900">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="px-3.5 py-2 text-stone-900 hover:text-[#6E1C24] font-bold text-base"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add To Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-[#4A151B] hover:bg-[#380E13] text-white px-6 sm:px-7 py-2.5 rounded-full text-sm font-bold shadow transition-colors"
              >
                Add To Cart
              </button>

              {/* Buy Now Button (Proceeds to Step 2: Checkout with this exact product) */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="bg-[#4A151B] hover:bg-[#380E13] text-white px-7 sm:px-8 py-2.5 rounded-full text-sm font-bold shadow transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Divider Line */}
            <hr className="border-stone-300 my-4" />

            {/* SKU & Category Details */}
            <div className="space-y-2 text-sm text-[#1B4D3E] font-medium">
              <p>
                <strong className="font-bold text-stone-900">SKU :</strong> {product.sku || 'GLDJ85ADC23C'}
              </p>
              <p className="font-bold text-stone-900">
                {product.purity || product.fabric || 'Pure Silk Handloom'}
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <strong className="font-bold text-stone-900">Share :</strong>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1 text-stone-700 hover:text-[#6E1C24] transition-colors"
                  title="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-1 transition-colors ${
                    isSaved ? 'text-[#6E1C24]' : 'text-stone-700 hover:text-[#6E1C24]'
                  }`}
                  title={isSaved ? 'In wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: YOU MAY ALSO LIKE (Matching Screenshot 2) */}
        <section className="pt-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E1C24] uppercase tracking-wider mb-8">
            YOU MAY ALSO LIKE
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
            {relatedSarees.map((saree) => (
              <SareeCard key={saree.id} product={saree} />
            ))}
          </div>
        </section>

        {/* NEWSLETTER: Join the Airawati Family (Matching Screenshot 2) */}
        <section className="pt-6 pb-10 text-center max-w-xl mx-auto space-y-3">
          <Heart className="w-6 h-6 text-[#6E1C24] mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#6E1C24]">
            Join the Airawati Family
          </h3>
          <p className="text-sm font-medium text-stone-700">
            Get updates on new saree launches, artisan stories, and exclusive offers
          </p>

          <form onSubmit={handleNewsletterSubmit} className="pt-2">
            <div className="flex items-center rounded-full border border-stone-300 bg-white p-1.5 shadow-sm max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#6E1C24] to-[#99222B] hover:opacity-95 text-white px-7 py-2.5 rounded-full text-sm font-bold transition-opacity"
              >
                Subscribe
              </button>
            </div>
          </form>
        </section>

      </div>
    </div>
  );
}

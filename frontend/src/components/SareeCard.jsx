// frontend/src/components/SareeCard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SareeCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();
  const isSaved = isInWishlist(product.id);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigates to Product Details ("Order details" page) for the EXACT selected product
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#C5A059]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      
      {/* IMAGE CONTAINER WITH FLOATING ICONS */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>

        {/* TOP RIGHT ICONS: WISHLIST & CART */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
              isSaved ? 'bg-[#5C1329] text-white' : 'bg-white/90 text-stone-700 hover:bg-white hover:text-[#5C1329]'
            }`}
            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleAddToCart}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/90 text-stone-700 hover:bg-white hover:text-[#5C1329] backdrop-blur-md transition-all shadow-sm"
            title="Add to Bag"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PURITY BADGE */}
        {product.purity && (
          <span className="absolute bottom-3 left-3 bg-[#5C1329]/95 backdrop-blur-sm text-[#FAF6F0] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase border border-[#C5A059]/40 shadow-sm">
            {product.purity}
          </span>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-[#A87B28] tracking-wider block">
            {product.fabric || 'Pure Handloom'}
          </span>
          <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 line-clamp-1 mt-1 leading-snug">
            <Link to={`/product/${product.id}`} className="hover:text-[#5C1329] transition-colors">
              {product.shortTitle || product.title}
            </Link>
          </h3>

          {/* RATING */}
          <div className="flex items-center gap-1.5 mt-1.5 text-[#C5A059]">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-stone-600">({product.reviewsCount || 120})</span>
          </div>

          {/* PRICE */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif font-bold text-base sm:text-lg text-[#5C1329]">
              {product.displayPrice || `₹${product.price.toLocaleString()}`}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm font-medium text-stone-500 line-through">
                {product.displayOriginalPrice || `₹${product.originalPrice.toLocaleString()}`}
              </span>
            )}
          </div>
        </div>

        {/* BUY NOW ACTION BUTTON */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <button
            onClick={handleBuyNow}
            className="w-full py-2.5 bg-[#5C1329] hover:bg-[#430D1E] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider transition-colors shadow-sm text-center"
          >
            Buy now
          </button>
        </div>

      </div>

    </div>
  );
}

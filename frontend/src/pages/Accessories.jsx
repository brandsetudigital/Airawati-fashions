// frontend/src/pages/Accessories.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { ACCESSORIES, BOUTIQUE_ACCESSORIES } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Accessories() {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCart();
  const navigate = useNavigate();
  
  // Combine boutique accessories (from Screenshot 5) with jewelry pieces
  const combinedInitial = [
    ...BOUTIQUE_ACCESSORIES,
    ...ACCESSORIES
  ];

  const [allAccessories, setAllAccessories] = useState(combinedInitial);
  const [selectedAcc, setSelectedAcc] = useState(combinedInitial[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [qty, setQty] = useState(1);

  // Fetch live accessories from Admin backend
  useEffect(() => {
    let isMounted = true;
    api.products.getAll()
      .then((res) => {
        if (!isMounted || !res || !res.products) return;
        const adminAcc = res.products.filter(p => {
          const cat = (p.category || '').toLowerCase();
          const title = (p.title || '').toLowerCase();
          const isSaree = cat.includes('banarasi') || cat.includes('maheshwari') || cat.includes('chanderi') || cat.includes('kanjivaram') || cat.includes('saree') || title.includes('saree');
          const isBlouse = (cat.includes('blouse') || cat.includes('boutique') || title.includes('blouse')) && !title.includes('latkan') && !title.includes('brooch');
          if (isSaree || isBlouse) return false;

          return cat.includes('accessories') || cat.includes('jewel') || cat.includes('potli') || cat.includes('belt') || title.includes('jewel') || title.includes('necklace') || title.includes('haram') || title.includes('potli') || title.includes('earring') || title.includes('choker') || title.includes('bangle');
        }).map((p, idx) => ({
          id: p._id || p.id,
          sku: p.sku || `AC-00${idx + 5}`,
          title: p.shortTitle || p.title,
          category: p.category || 'Accessories',
          price: p.price,
          displayPrice: `₹${Number(p.price).toLocaleString('en-IN')}`,
          image: p.image || '/images/acc_potli_bag.jpg',
          inStock: p.stock > 0,
          stockCount: p.stock,
          description: p.description || 'Handcrafted luxury accessory.'
        }));

        if (adminAcc.length > 0) {
          // Put newly added admin accessories FIRST!
          const merged = [...adminAcc];
          combinedInitial.forEach(ac => {
            if (!merged.some(m => m.id === ac.id || m.sku === ac.sku || m.title === ac.title)) {
              merged.push(ac);
            }
          });
          setAllAccessories(merged);
          // Highlight the latest added piece in the hero showcase
          setSelectedAcc(merged[0]);
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  const categories = [
    'All',
    'Handmade Jewellery',
    'Temple Jewellery',
    'Potli Bags',
    'Waist Belts',
    'Blouse Accessories',
    'Royal Filigree',
    'Kundan Polki'
  ];

  const filteredAccessories = allAccessories.filter(item => {
    if (selectedCategory === 'All') return true;
    const cat = (item.category || '').toLowerCase();
    const title = (item.title || '').toLowerCase();
    const target = selectedCategory.toLowerCase();

    if (target.includes('jewel')) {
      return cat.includes('jewel') || title.includes('jewel') || title.includes('necklace') || title.includes('haram') || title.includes('earring') || title.includes('choker') || title.includes('set') || cat.includes('accessories');
    }
    if (target.includes('temple')) {
      return cat.includes('temple') || title.includes('temple') || title.includes('haram');
    }
    if (target.includes('potli')) {
      return cat.includes('potli') || title.includes('potli') || title.includes('bag');
    }
    if (target.includes('belt')) {
      return cat.includes('belt') || title.includes('belt') || title.includes('kamarbandh');
    }
    if (target.includes('blouse')) {
      return cat.includes('blouse') || title.includes('latkan') || title.includes('tassel') || title.includes('blouse');
    }
    if (target.includes('filigree')) {
      return cat.includes('filigree') || title.includes('filigree');
    }
    if (target.includes('kundan') || target.includes('polki')) {
      return cat.includes('kundan') || cat.includes('polki') || title.includes('kundan') || title.includes('polki');
    }
    return cat.includes(target) || title.includes(target);
  });

  const handleAddAndCheckout = (item, quantity = 1) => {
    addToCart(item, quantity);
    navigate(`/checkout?id=${encodeURIComponent(item.id || item.sku || '')}&qty=${quantity}`, {
      state: { product: item, qty: quantity }
    });
  };

  return (
    <div className="space-y-16 pb-20 bg-[#FDF9F7] min-h-screen text-stone-800">

      {/* Hero Banner with Golden Mandala on Left */}
      <section 
        className="relative w-full h-[280px] xs:h-[320px] sm:h-[360px] md:h-[400px] flex items-center justify-center overflow-hidden border-b border-[#C5A059]/20"
        style={{
          backgroundColor: '#FDF0CE',
        }}
      >
        <img 
          src="/images/shop_hero_mandala_left_clean.png" 
          alt="Golden Mandala" 
          className="absolute left-0 top-0 h-full w-auto max-w-[28%] sm:max-w-[40%] lg:max-w-[34%] object-contain object-left pointer-events-none select-none z-0 opacity-80 sm:opacity-100" 
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-center">
            <span className="text-[#5C1329]">Modern&amp;</span>
            <span className="text-[#B83227] ml-0.5 sm:ml-1">Confident</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-[#70594D] text-xs sm:text-sm md:text-base font-light tracking-wide max-w-md mx-auto leading-relaxed text-center">
            We're here to help you discover the perfect accessories to complete your look
          </p>
        </div>
      </section>

      {/* Main Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-[#C5A059]"></span>
            <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
            <span className="h-px w-8 bg-[#C5A059]"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D]">
            Explore <span className="text-[#B83227] italic font-normal">Accessories</span>
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1 font-light">
            Handcrafted temple jewelry, embroidered potli bags, and waist ornaments designed to complete your royal handloom look.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 pt-2 no-scrollbar px-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c
                  ? 'bg-[#5C1329] text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-700 hover:border-[#5C1329]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured Showcase */}
        {selectedAcc && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100/60 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start my-8">
            <div className="md:col-span-5 aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 shadow-xs">
              <img src={selectedAcc.image} alt={selectedAcc.title} className="w-full h-full object-cover" />
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B83227]">Handmade Heirloom</span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] font-mono text-stone-500 uppercase">SKU: {selectedAcc.sku || 'AIRA-ACC'}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E060D]">{selectedAcc.title}</h3>
              <p className="font-serif font-bold text-2xl text-[#5C1329]">{selectedAcc.displayPrice}</p>
              <p className="text-xs text-stone-600 leading-relaxed font-light">{selectedAcc.description}</p>

              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-semibold text-stone-700">Quantity</span>
                <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-[#FAF6F0]">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1 text-sm text-stone-700 hover:bg-stone-200 cursor-pointer">-</button>
                  <span className="px-3 text-xs font-bold text-stone-900">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-1 text-sm text-stone-700 hover:bg-stone-200 cursor-pointer">+</button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => addToCart(selectedAcc, qty)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#4A151B] hover:bg-[#5C1329] text-white rounded-xl text-xs font-semibold tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddAndCheckout(selectedAcc, qty)}
                  className="w-full sm:w-auto px-6 py-2.5 border border-[#4A151B] text-[#4A151B] hover:bg-[#FAF6F0] rounded-xl text-xs font-semibold tracking-wider transition-colors cursor-pointer text-center"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedAcc)}
                  className={`p-2.5 border rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                    isInWishlist(selectedAcc.id)
                      ? 'border-[#B83227] text-[#B83227] bg-rose-50'
                      : 'border-stone-200 text-stone-600 hover:border-[#5C1329]'
                  }`}
                  title="Toggle Wishlist"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Specs */}
              <div className="pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-1.5 font-light">
                <p><strong>Category :</strong> {selectedAcc.category || 'Luxury Handcrafted Accessories'}</p>
                <p><strong>Craftsmanship :</strong> Master artisans using authentic heritage techniques</p>
                <p><strong>Care :</strong> Store in soft dry pouch away from direct moisture</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Full Accessories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1E060D]">All Accessories</h3>
            <p className="text-xs text-stone-500 font-light">Browse our curated handmade accessories</p>
          </div>
          <span className="text-xs font-semibold text-[#5C1329] bg-[#5C1329]/10 px-3 py-1 rounded-full">
            {filteredAccessories.length} Items Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAccessories.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedAcc(item);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-xs hover:shadow-xl transition-all duration-300 p-3 flex flex-col justify-between group cursor-pointer"
            >
              {/* Image Container with Floating Heart & Cart Icons */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                      isInWishlist(item.id) ? 'text-[#B83227]' : 'text-stone-600 hover:text-[#B83227]'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center text-stone-600 hover:text-[#5C1329] transition-transform hover:scale-110 cursor-pointer"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Code */}
              <div className="pt-3 pb-1 space-y-1">
                <span className="text-[10px] font-mono text-stone-400 block">
                  {item.sku}
                </span>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#5C1329] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B83227]/60 shrink-0"></span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-serif font-bold text-sm text-[#5C1329]">
                    {item.displayPrice}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddAndCheckout(item);
                    }}
                    className="text-[11px] font-semibold text-[#B83227] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Buy</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

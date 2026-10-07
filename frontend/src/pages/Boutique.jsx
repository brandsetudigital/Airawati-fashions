// frontend/src/pages/Boutique.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Scissors, 
  Calendar, 
  Clock, 
  User, 
  X, 
  Ruler, 
  Sparkles,
  ArrowLeft,
  Check
} from 'lucide-react';
import { BLOUSES, BOUTIQUE_ACCESSORIES } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export default function Boutique() {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected blouse for customization screen (Screenshot 2 & 3)
  const [selectedBlouse, setSelectedBlouse] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeBlouseImg, setActiveBlouseImg] = useState('');

  // Live admin products loaded from backend
  const [liveBlouses, setLiveBlouses] = useState(BLOUSES);
  const [liveAccessories, setLiveAccessories] = useState(BOUTIQUE_ACCESSORIES);

  // Consultation booking form state
  const [consultForm, setConsultForm] = useState({
    fullName: '',
    phone: '',
    date: '',
    timeSlot: '10:00 AM - 12:00 PM'
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Newsletter state (Screenshot 4)
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Load products from backend and merge with curated boutique blouses & accessories
  useEffect(() => {
    let isMounted = true;
    api.products.getAll()
      .then((res) => {
        if (!isMounted || !res || !res.products) return;
        
        // Find blouses added by Admin in backend (strictly blouses)
        const adminBlouses = res.products.filter(p => {
          const cat = (p.category || '').toLowerCase();
          const title = (p.title || '').toLowerCase();
          const isSaree = cat.includes('banarasi') || cat.includes('maheshwari') || cat.includes('chanderi') || cat.includes('kanjivaram') || (cat.includes('saree') && !cat.includes('blouse'));
          const isAcc = cat.includes('accessories') || cat.includes('jewel') || title.includes('necklace') || title.includes('haram');
          if (isSaree || isAcc) return false;
          return cat.includes('blouse') || cat.includes('boutique') || title.includes('blouse');
        }).map((p, idx) => ({
          id: p._id || p.id,
          sku: p.sku || `BL-00${idx + 7}`,
          number: p.sku || `No. 00${idx + 7}`,
          title: p.shortTitle || p.title,
          subtitle: p.fabric || 'Pure handloom silk with artisanal tailoring',
          fabric: p.fabric || 'Pure Handloom Silk',
          price: p.price,
          displayPrice: `₹${Number(p.price).toLocaleString('en-IN')}`,
          image: p.image || '/images/blouse_purple_custom.jpg',
          customImage: p.image || '/images/blouse_purple_custom.jpg',
          thumbnails: p.thumbnails && p.thumbnails.length > 0 ? p.thumbnails : [p.image || '/images/blouse_purple_custom.jpg'],
          inStock: p.stock > 0,
          stockCount: p.stock,
          leadTime: '3-5 Days Custom Tailoring',
          category: 'Boutique / Blouse',
          description: p.description || 'Artisan handcrafted blouse with bespoke tailoring.',
          sizes: ['XXS', 'XS', 'M', 'L', 'XL', 'XXL']
        }));

        if (adminBlouses.length > 0) {
          // Put newly added admin blouses FIRST at the top!
          const merged = [...adminBlouses];
          BLOUSES.forEach(ab => {
            if (!merged.some(m => m.id === ab.id || m.sku === ab.sku || m.title === ab.title)) {
              merged.push(ab);
            }
          });
          setLiveBlouses(merged);
        }

        // Find accessories / jewellery added by Admin in backend (strictly accessories)
        const adminAccessories = res.products.filter(p => {
          const cat = (p.category || '').toLowerCase();
          const title = (p.title || '').toLowerCase();
          const isSaree = cat.includes('banarasi') || cat.includes('maheshwari') || cat.includes('chanderi') || cat.includes('kanjivaram') || title.includes('saree');
          const isBlouse = cat.includes('blouse') || cat.includes('boutique') || title.includes('blouse');
          if (isSaree || isBlouse) return false;
          return cat.includes('accessories') || cat.includes('jewel') || cat.includes('potli') || cat.includes('belt') || title.includes('jewel') || title.includes('necklace') || title.includes('haram') || title.includes('potli');
        }).map((p, idx) => ({
          id: p._id || p.id,
          sku: p.sku || `AC-00${idx + 5}`,
          title: p.shortTitle || p.title,
          category: p.category || 'Accessories',
          price: p.price,
          displayPrice: `₹${Number(p.price).toLocaleString('en-IN')}`,
          image: p.image || '/images/acc_potli_bag.jpg',
          thumbnails: p.thumbnails && p.thumbnails.length > 0 ? p.thumbnails : [p.image || '/images/acc_potli_bag.jpg'],
          inStock: p.stock > 0,
          stockCount: p.stock,
          description: p.description || 'Handcrafted accessory'
        }));

        if (adminAccessories.length > 0) {
          // Put newly added admin accessories FIRST!
          const mergedAcc = [...adminAccessories];
          BOUTIQUE_ACCESSORIES.forEach(ac => {
            if (!mergedAcc.some(m => m.id === ac.id || m.sku === ac.sku || m.title === ac.title)) {
              mergedAcc.push(ac);
            }
          });
          setLiveAccessories(mergedAcc);
        }
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  // Handle URL query param for design (?design=BL-001)
  useEffect(() => {
    const designParam = searchParams.get('design');
    if (designParam) {
      const found = liveBlouses.find(b => b.sku.toLowerCase() === designParam.toLowerCase() || b.id === designParam);
      if (found) {
        setSelectedBlouse(found);
        setActiveBlouseImg(found.image || (found.thumbnails && found.thumbnails[0]) || '');
      }
    }
  }, [searchParams, liveBlouses]);

  const handleSelectDesign = (blouse) => {
    setSelectedBlouse(blouse);
    setActiveBlouseImg(blouse.image || (blouse.thumbnails && blouse.thumbnails[0]) || '');
    setBookingConfirmed(false);
    setSearchParams({ design: blouse.sku });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGallery = () => {
    setSelectedBlouse(null);
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBlouseToBag = (blouse, size = selectedSize) => {
    if (!blouse.inStock) {
      showToast("This blouse design is currently out of stock!");
      return;
    }
    addToCart({
      id: `${blouse.id}-${size}`,
      title: `${blouse.title} (Size: ${size})`,
      shortTitle: blouse.title,
      price: blouse.price,
      originalPrice: Math.round(blouse.price * 1.25),
      image: blouse.customImage || blouse.image,
      fabric: blouse.fabric,
      category: 'Boutique / Blouse',
      sku: blouse.sku,
      selectedSize: size
    }, 1);
  };

  const handleAddAccessoryToBag = (acc) => {
    if (!acc.inStock) {
      showToast("This accessory is out of stock!");
      return;
    }
    addToCart({
      id: acc.id,
      title: acc.title,
      shortTitle: acc.title,
      price: acc.price,
      originalPrice: Math.round(acc.price * 1.2),
      image: acc.image,
      category: 'Accessories',
      sku: acc.sku
    }, 1);
  };

  const handleBookConsultation = (e) => {
    e.preventDefault();
    if (!consultForm.fullName.trim() || !consultForm.phone.trim()) {
      showToast("Please enter your name and phone number!");
      return;
    }
    if (!consultForm.date) {
      showToast("Please select your preferred consultation date!");
      return;
    }

    const bookingId = `AIRA-ST-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingDetails = {
      bookingId,
      blouse: selectedBlouse,
      size: selectedSize,
      ...consultForm,
      bookedAt: new Date().toISOString()
    };

    // Save consultation to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('airawati_stitch_consultations') || '[]');
      existing.unshift(bookingDetails);
      localStorage.setItem('airawati_stitch_consultations', JSON.stringify(existing));
    } catch (err) {}

    // Save consultation to MongoDB backend
    api.boutique.createConsultation({
      bookingId,
      customerName: consultForm.fullName.trim(),
      customerPhone: consultForm.phone.trim(),
      customerEmail: consultForm.email || 'customer@airawati.com',
      blouseTitle: selectedBlouse?.title || 'Custom Blouse',
      blouseSku: selectedBlouse?.sku || '',
      size: selectedSize,
      preferredDate: consultForm.date,
      timeSlot: consultForm.timeSlot,
      fabricChoice: selectedBlouse?.fabric || 'Pure Silk',
      status: 'New'
    }).catch(err => console.warn('Boutique consultation offline fallback:', err.message));

    setConfirmedBookingData(bookingDetails);
    setBookingConfirmed(true);
    showToast(`Consultation booked successfully! Booking ID: ${bookingId}`);
  };

  const handleSubscribeNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    showToast("Welcome to the Airawati family! You're now subscribed.");
    setNewsletterEmail('');
  };

  const sizes = ['XXS', 'XS', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-[#FDF9F7] text-stone-800 pb-20">

      {/* ============================================================== */}
      {/* 1. TOP HEADER (Customization Header matching Screenshots 1 & 2) */}
      {/* ============================================================== */}
      <section className="pt-10 pb-6 px-4 max-w-5xl mx-auto text-center">
        {/* Sparkle Icon with Gold Divider Lines */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-[#C5A059]/40"></span>
          <span className="text-[#C5A059] text-base select-none">✦</span>
          <span className="h-px w-10 bg-[#C5A059]/40"></span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E060D]">
          Customize <span className="text-[#B83227] italic font-normal">Your Blouse</span>
        </h1>

        <p className="mt-3 text-stone-600 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed">
          Select a blouse design that speaks to you. Next, you'll choose your size and book a personalized consultation with our master tailor.
        </p>

        {/* Back to all designs button when inside detail view */}
        {selectedBlouse && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleBackToGallery}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#5C1329]/20 hover:border-[#5C1329] text-[#5C1329] text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Designs</span>
            </button>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 2. MAIN CONTENT AREA: DETAIL VIEW (Screenshots 2 & 3) OR GRID (1) */}
      {/* ============================================================== */}
      {selectedBlouse ? (
        /* DETAIL & CUSTOMIZATION SCREEN (Screenshots 2 & 3) */
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          
          {/* Main Blouse Detail Card (Screenshot 2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-rose-100/60 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Blouse Image & Angle Thumbnails */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-stone-100 bg-[#FAF4F2]">
                <img
                  src={activeBlouseImg || selectedBlouse.customImage || selectedBlouse.image}
                  alt={selectedBlouse.title}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Angle thumbnails if multiple images exist */}
              {selectedBlouse.thumbnails && selectedBlouse.thumbnails.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-md w-full justify-center pb-1">
                  {selectedBlouse.thumbnails.map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveBlouseImg(thumb)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        (activeBlouseImg === thumb || (!activeBlouseImg && idx === 0))
                          ? 'border-[#5C1329] ring-2 ring-[#5C1329]/20 scale-105'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                      title={`Angle View ${idx + 1}`}
                    >
                      <img src={thumb} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Blouse Information & Size Selection */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <span className="text-[11px] font-mono text-stone-400 tracking-wider block mb-1">
                  {selectedBlouse.number || selectedBlouse.sku}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E060D]">
                  {selectedBlouse.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed font-light">
                  {selectedBlouse.description || selectedBlouse.subtitle}
                </p>
              </div>

              {/* Price Box Badge (Matching Screenshot 2 exactly: #4A151B) */}
              <div className="bg-[#4A151B] text-white rounded-xl p-4 shadow-sm inline-block w-full sm:max-w-xs">
                <div className="text-sm sm:text-base font-bold tracking-wide">
                  Starting from {selectedBlouse.displayPrice}
                </div>
                <div className="text-[10px] text-rose-200/80 font-light mt-0.5">
                  *Price may vary based on customization
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800">Select Your Size</span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-stone-400 hover:text-[#5C1329] underline transition-colors cursor-pointer text-[11px]"
                  >
                    View Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#5C1329] text-white shadow-sm ring-2 ring-[#5C1329]/30'
                            : 'bg-[#FAF0EE] text-stone-700 hover:bg-[#F2E0DC]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Bag & Buy Now Direct Purchase Option */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleAddBlouseToBag(selectedBlouse)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white border border-[#5C1329] text-[#5C1329] hover:bg-[#FAF2F4] rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag (Size {selectedSize})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const customBlouseItem = {
                      ...selectedBlouse,
                      id: `${selectedBlouse.id}-${selectedSize}`,
                      title: `${selectedBlouse.title} (Size: ${selectedSize})`,
                      shortTitle: selectedBlouse.title,
                      selectedSize
                    };
                    addToCart(customBlouseItem, 1);
                    navigate(`/checkout?id=${encodeURIComponent(customBlouseItem.id)}&qty=1`, {
                      state: { product: customBlouseItem, qty: 1 }
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#4A151B] hover:bg-[#5C1329] text-white rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Book Your Consultation Card (Screenshot 2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-rose-100/60">
            <div className="mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E060D]">
                Book Your Consultation
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 font-light">
                Our tailor will call you to finalize design details and measurements.
              </p>
            </div>

            {bookingConfirmed ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Stitch Consultation Confirmed!</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Thank you, <strong>{confirmedBookingData.fullName}</strong>. Our master tailor will call you on <strong>{confirmedBookingData.phone}</strong> on <strong>{confirmedBookingData.date}</strong> ({confirmedBookingData.timeSlot}) to take your personalized measurements for <strong>{selectedBlouse.title} (Size: {selectedSize})</strong>.
                </p>
                <div className="text-[11px] font-mono text-emerald-600">
                  Booking Reference: <strong>{confirmedBookingData.bookingId}</strong>
                </div>
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="text-xs text-emerald-800 underline font-semibold mt-2 cursor-pointer"
                >
                  Book another slot or update details
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="space-y-4 max-w-3xl">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={consultForm.fullName}
                    onChange={(e) => setConsultForm({ ...consultForm, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F7] text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F7] text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329] focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={consultForm.date}
                      onChange={(e) => setConsultForm({ ...consultForm, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F7] text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Time Slot
                    </label>
                    <select
                      value={consultForm.timeSlot}
                      onChange={(e) => setConsultForm({ ...consultForm, timeSlot: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#FAF9F7] text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329] focus:bg-white transition-all"
                    >
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                      <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                      <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#4A151B] hover:bg-[#5C1329] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Book Stitch Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* What Happens Next Section (Screenshot 3) */}
          <section className="space-y-6 pt-4">
            <div className="text-center">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E060D]">
                What Happens Next
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-light">
                Your journey to a perfectly customized blouse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xs border border-rose-100/50 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-[#B83227] flex items-center justify-center mb-4 shadow-2xs">
                  <CheckCircle className="w-6 h-6 text-[#B83227]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1E060D] mb-1.5">
                  Review &amp; Confirm
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  We'll review your selected design and size preferences
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xs border border-rose-100/50 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-[#B83227] flex items-center justify-center mb-4 shadow-2xs">
                  <Phone className="w-6 h-6 text-[#B83227]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1E060D] mb-1.5">
                  Tailor Consultation
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Our expert will call to discuss measurements and final details
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xs border border-rose-100/50 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-[#B83227] flex items-center justify-center mb-4 shadow-2xs">
                  <Scissors className="w-6 h-6 text-[#B83227]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1E060D] mb-1.5">
                  Craft &amp; Deliver
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Your custom blouse will be handcrafted and delivered
                </p>
              </div>
            </div>
          </section>

          {/* YOU MAY ALSO LIKE Section (Screenshot 3) */}
          <section className="space-y-6 pt-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#5C1329] tracking-wider text-center uppercase">
              You May Also Like
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {liveBlouses
                .filter(b => b.sku !== selectedBlouse.sku)
                .slice(0, 3)
                .map((blouse) => (
                  <div
                    key={blouse.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-stone-100 transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Blouse Image with Heart & Cart Buttons */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                      <img
                        src={blouse.image}
                        alt={blouse.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Right Heart & Cart Round Buttons */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(blouse);
                          }}
                          className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                            isInWishlist(blouse.id) ? 'text-[#B83227]' : 'text-stone-600 hover:text-[#B83227]'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddBlouseToBag(blouse);
                          }}
                          className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center text-stone-600 hover:text-[#5C1329] transition-transform hover:scale-110 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Blouse Details & Select Design Button */}
                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-stone-400 block mb-0.5">
                          {blouse.sku}
                        </span>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#5C1329] transition-colors line-clamp-1">
                          {blouse.title}
                        </h4>
                        <p className="text-xs text-stone-500 font-light line-clamp-1 mt-0.5">
                          {blouse.subtitle}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectDesign(blouse)}
                        className="w-full py-2.5 bg-[#4A151B] hover:bg-[#5C1329] text-white rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Select Design</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>

        </div>
      ) : (
        /* MAIN GALLERY GRID (Screenshot 1) */
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {liveBlouses.map((blouse) => (
              <div
                key={blouse.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-100 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with Top Right Heart & Cart */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img
                    src={blouse.image}
                    alt={blouse.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Right Floating Action Icons */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(blouse)}
                      className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                        isInWishlist(blouse.id) ? 'text-[#B83227]' : 'text-stone-600 hover:text-[#B83227]'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlouseToBag(blouse)}
                      className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center text-stone-600 hover:text-[#5C1329] transition-transform hover:scale-110 cursor-pointer"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Content & Action Button (Matching Screenshot 1) */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mb-0.5">
                      {blouse.sku}
                    </span>
                    <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#5C1329] transition-colors">
                      {blouse.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light line-clamp-1 mt-0.5">
                      {blouse.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(blouse)}
                    className="w-full py-2.5 bg-[#4A151B] hover:bg-[#5C1329] text-white rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <span>Select Design</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. EXPLORE ACCESSORIES SECTION (Screenshot 5)                  */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Sparkle Icon */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#C5A059]/40"></span>
            <span className="text-[#C5A059] text-sm select-none">✦</span>
            <span className="h-px w-8 bg-[#C5A059]/40"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D]">
            Explore <span className="text-[#B83227] italic font-normal">Accessories</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-light">
            Select accessories that match your saree and complete your look.
          </p>
        </div>

        {/* Accessories Cards Grid (Screenshot 5) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveAccessories.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-100 transition-all duration-300 flex flex-col justify-between group p-3"
            >
              {/* Image with Heart & Cart Buttons */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={acc.image}
                  alt={acc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(acc)}
                    className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                      isInWishlist(acc.id) ? 'text-[#B83227]' : 'text-stone-600 hover:text-[#B83227]'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddAccessoryToBag(acc)}
                    className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-xs flex items-center justify-center text-stone-600 hover:text-[#5C1329] transition-transform hover:scale-110 cursor-pointer"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Code with bullet (Screenshot 5) */}
              <div className="pt-3 pb-1">
                <span className="text-[10px] font-mono text-stone-400 block mb-0.5">
                  {acc.sku}
                </span>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#5C1329] transition-colors">
                    {acc.title}
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B83227]/60"></span>
                </div>
                {acc.displayPrice && (
                  <p className="text-xs text-stone-500 font-semibold mt-1">
                    {acc.displayPrice}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all → Pill Button (Screenshot 5) */}
        <div className="flex justify-center pt-2">
          <Link
            to="/accessories"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4A151B] to-[#B83227] hover:from-[#5C1329] hover:to-[#9e271e] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. JOIN THE AIRAWATI FAMILY NEWSLETTER (Screenshot 4)           */}
      {/* ============================================================== */}
      <section className="max-w-2xl mx-auto px-4 text-center pt-20 pb-4 space-y-4">
        <div className="flex justify-center">
          <Heart className="w-6 h-6 text-[#5C1329]" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E060D]">
          Join the Airawati Family
        </h3>

        <p className="text-xs sm:text-sm text-stone-500 font-light max-w-md mx-auto">
          Get updates on new saree launches, artisan stories, and exclusive offers
        </p>

        {subscribed ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-full inline-block px-6">
            ✓ Thank you for subscribing to Airawati!
          </div>
        ) : (
          <form
            onSubmit={handleSubscribeNewsletter}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-5 py-3 rounded-full bg-white border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329] shadow-2xs"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#94261d] to-[#B83227] hover:bg-[#801b13] text-white text-xs font-semibold tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      {/* ============================================================== */}
      {/* 5. SIZE GUIDE MODAL                                           */}
      {/* ============================================================== */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#5C1329]" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Blouse Size Guide
                </h3>
              </div>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500 font-light">
              Measurements in inches. Our tailor will confirm your exact body fit during the stitch consultation call.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF2F4] text-[#5C1329] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Bust (in)</th>
                    <th className="py-2.5 px-3">Waist (in)</th>
                    <th className="py-2.5 px-3">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  <tr><td className="py-2 px-3 font-semibold">XXS</td><td className="py-2 px-3">30 - 32</td><td className="py-2 px-3">24 - 26</td><td className="py-2 px-3">13.5</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">XS</td><td className="py-2 px-3">32 - 34</td><td className="py-2 px-3">26 - 28</td><td className="py-2 px-3">14.0</td></tr>
                  <tr className="bg-[#FAF9F7]"><td className="py-2 px-3 font-semibold text-[#5C1329]">M (Standard)</td><td className="py-2 px-3">36 - 38</td><td className="py-2 px-3">30 - 32</td><td className="py-2 px-3">14.5</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">L</td><td className="py-2 px-3">38 - 40</td><td className="py-2 px-3">32 - 34</td><td className="py-2 px-3">15.0</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">XL</td><td className="py-2 px-3">40 - 42</td><td className="py-2 px-3">34 - 36</td><td className="py-2 px-3">15.5</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">XXL</td><td className="py-2 px-3">42 - 44</td><td className="py-2 px-3">36 - 38</td><td className="py-2 px-3">16.0</td></tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="px-5 py-2 bg-[#5C1329] text-white rounded-xl text-xs font-semibold hover:bg-[#430D1E] transition-all cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

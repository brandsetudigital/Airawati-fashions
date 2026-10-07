// frontend/src/components/HeroSlider.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 3;
  const slideTimerRef = useRef(null);

  // Auto slide every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => clearInterval(slideTimerRef.current);
  }, [isPaused, totalSlides]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-12">
      {/* OUTER LUXURY FRAME (Matching Figma Screenshot with burgundy outline and logo notch) */}
      <div 
        className="relative border border-[#5C1329]/40 rounded-sm p-3 sm:p-5 pt-7 sm:pt-8 bg-[#FAF6F0]/60 shadow-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* BRAND LOGO ON TOP-LEFT OF FRAME */}
        <div className="absolute -top-5 sm:-top-6 left-6 sm:left-10 bg-[#FAF6F0] px-3 py-1 flex items-center z-20 shadow-xs rounded-sm border border-[#C5A059]/30">
          <img 
            src="/images/airawati_logo.png" 
            alt="Airawati" 
            className="h-8 sm:h-9 w-auto object-contain" 
          />
        </div>

        {/* SLIDER VIEWPORT */}
        <div className="relative overflow-hidden rounded-md min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] bg-stone-900 shadow-md">
          
          {/* SLIDE 1: GLAM UP FOR THIS ONAM (Screenshot 1) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Link to="/shop" className="block w-full h-full relative group overflow-hidden">
              <div className="w-full h-full flex flex-col md:flex-row">
                
                {/* Left Side: Deep Crimson / Maroon with Decorative Lotus Motifs */}
                <div className="relative w-full md:w-[58%] lg:w-[56%] bg-[#8B0821] text-white flex flex-col justify-center items-center text-center p-4 sm:p-10 lg:p-14 z-10 overflow-hidden flex-1 md:flex-none">
                  
                  {/* Decorative Corner Lotus Rangoli (Top-Left) */}
                  <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none opacity-90">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                      <path d="M0 0 C30 10 50 30 60 60 C40 50 20 40 0 0 Z" fill="#E87A5D" opacity="0.8"/>
                      <path d="M0 0 C40 5 60 20 75 45 C50 40 25 30 0 0 Z" fill="#C5A059" opacity="0.9"/>
                      <circle cx="20" cy="20" r="3" fill="#FFEAA7"/>
                      <circle cx="35" cy="15" r="2.5" fill="#FFEAA7"/>
                      <circle cx="15" cy="35" r="2.5" fill="#FFEAA7"/>
                      <circle cx="48" cy="28" r="2" fill="#FFEAA7"/>
                    </svg>
                  </div>

                  {/* Decorative Corner Lotus Rangoli (Bottom-Left) */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none opacity-90">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full rotate-90">
                      <path d="M0 0 C30 10 50 30 60 60 C40 50 20 40 0 0 Z" fill="#E87A5D" opacity="0.8"/>
                      <path d="M0 0 C40 5 60 20 75 45 C50 40 25 30 0 0 Z" fill="#C5A059" opacity="0.9"/>
                      <circle cx="20" cy="20" r="3" fill="#FFEAA7"/>
                      <circle cx="35" cy="15" r="2.5" fill="#FFEAA7"/>
                      <circle cx="15" cy="35" r="2.5" fill="#FFEAA7"/>
                    </svg>
                  </div>

                  {/* Slide 1 Center Text (Figma Exact Matching Typography) */}
                  <div className="relative z-10 max-w-lg space-y-4 sm:space-y-6">
                    <h2 className="font-serif text-lg sm:text-2xl lg:text-3xl text-white tracking-[0.18em] uppercase font-normal leading-relaxed">
                      GLAM UP FOR THIS ONAM <br />
                      <span className="text-white/95">IN NEW COLLECTION</span>
                    </h2>

                    <div className="py-1 sm:py-3">
                      <span className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#E8C374] block tracking-tight drop-shadow-sm font-['Cormorant_Garamond']">
                        20% to 80% off
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-white/95 tracking-[0.25em] uppercase font-light">
                      ON ALL SAREES
                    </h3>

                    <div className="pt-2 sm:pt-4">
                      <span className="inline-block border border-[#C5A059] text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#5C1329] text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold px-6 py-2.5 rounded-full transition-all group-hover:scale-105">
                        Explore Festive Weaves &rarr;
                      </span>
                    </div>
                  </div>

                  {/* Curved Wave Divider on the right of maroon panel (Desktop) */}
                  <div className="hidden md:block absolute top-0 -right-8 bottom-0 w-16 z-20 pointer-events-none">
                    <svg viewBox="0 0 50 500" preserveAspectRatio="none" className="w-full h-full">
                      <path
                        d="M 0 0 Q 40 250 0 500 L 0 0 Z"
                        fill="#8B0821"
                      />
                      <path
                        d="M 0 0 Q 40 250 0 500"
                        stroke="#C5A059"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                {/* Right Side: Photo of Smiling Women Celebrating in Sarees with Petals */}
                <div className="w-full md:w-[42%] lg:w-[44%] h-44 sm:h-80 md:h-auto relative overflow-hidden bg-stone-900 shrink-0">
                  <img
                    src="/images/onam_women.jpg"
                    alt="Women Celebrating Onam in Airawati Sarees"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden"></div>
                </div>

              </div>
            </Link>
          </div>

          {/* SLIDE 2: FESTIVE JEWELRY & ACCESSORIES SALE (Screenshot 2) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Link to="/accessories" className="block w-full h-full relative group overflow-hidden">
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 bg-[#1E060D]">
                
                {/* Left Column (3 Cols): 2 Stacked Images */}
                <div className="hidden md:flex md:col-span-3 flex-col border-r border-[#C5A059]/40">
                  {/* Top: Gold Antique Choker */}
                  <div className="flex-1 overflow-hidden relative border-b border-[#C5A059]/30">
                    <img
                      src="/images/gold_choker.jpg"
                      alt="Antique Gold Choker"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Bottom: Gold Diamond Ring */}
                  <div className="flex-1 overflow-hidden relative bg-stone-100">
                    <img
                      src="/images/diamond_ring.jpg"
                      alt="Gold Solitaire Diamond Ring"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Center Column (6 Cols): Maroon Sale Showcase */}
                <div className="col-span-1 md:col-span-6 bg-[#630E1F] text-white flex flex-col justify-center items-center text-center p-6 sm:p-10 relative">
                  
                  {/* Gold Festive Tree / Spire Motif */}
                  <div className="mb-2 text-[#C5A059]">
                    <svg className="w-8 h-8 mx-auto" viewBox="0 0 40 40" fill="currentColor">
                      <path d="M20 2 L22 8 L27 8 L23 12 L25 18 L20 14 L15 18 L17 12 L13 8 L18 8 Z" />
                      <path d="M20 14 L24 22 L16 22 Z" />
                      <path d="M20 20 L26 30 L14 30 Z" />
                      <rect x="18" y="30" width="4" height="6" />
                    </svg>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#E8C374] font-bold tracking-[0.2em] uppercase mb-4">
                    SALE
                  </h2>

                  {/* "UPTO 50% OFF" with vertical "UPTO" */}
                  <div className="flex items-center justify-center gap-3 my-2 sm:my-3">
                    <div className="text-[10px] sm:text-xs font-bold text-[#E8C374] tracking-widest uppercase [writing-mode:vertical-lr] rotate-180">
                      UPTO
                    </div>
                    <span className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-[#E8C374] leading-none">
                      50
                    </span>
                    <div className="text-left font-serif text-lg sm:text-2xl text-[#E8C374] font-semibold leading-tight">
                      <span>%</span> <br />
                      <span className="text-xs sm:text-sm tracking-wider uppercase font-sans">OFF</span>
                    </div>
                  </div>

                  {/* Gold Gradient Pill Button */}
                  <div className="mt-4 sm:mt-6">
                    <span className="inline-block bg-gradient-to-r from-[#DAB062] via-[#E8C77B] to-[#C59B4E] text-[#1E060D] font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform group-hover:scale-105 transition-all">
                      SHOP NOW!
                    </span>
                  </div>

                  {/* Website Tagline */}
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#E8C374]/80 mt-6 sm:mt-8 font-medium">
                    WWW.AIRAWATI.COM
                  </p>
                </div>

                {/* Right Column (3 Cols): 2 Stacked Images */}
                <div className="hidden md:flex md:col-span-3 flex-col border-l border-[#C5A059]/40">
                  {/* Top: Gold Pendant with Green Beads */}
                  <div className="flex-1 overflow-hidden relative border-b border-[#C5A059]/30">
                    <img
                      src="/images/gold_pendant.jpg"
                      alt="Gold Pendant with Emerald Beads"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Bottom: Heavy Temple Jewelry Choker */}
                  <div className="flex-1 overflow-hidden relative bg-stone-900">
                    <img
                      src="/images/temple_jewelry.jpg"
                      alt="Temple Jewelry Choker"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

              </div>
            </Link>
          </div>

          {/* SLIDE 3: OUR SIGNATURE BLOUSE BOUTIQUE (Screenshot 3 & 4) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Link to="/boutique" className="block w-full h-full relative group overflow-hidden">
              <div className="w-full h-full bg-[#FAF0DC] relative flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden">
                
                {/* Islamic/Indian Gold Jaal Lattice Background Watermark */}
                <div 
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#C5A059 1px, transparent 1px), radial-gradient(#C5A059 1px, #FAF0DC 1px)`,
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 12px 12px'
                  }}
                ></div>

                {/* Ornate Gold Lotus Arch Outline in Center */}
                <div className="absolute inset-x-8 sm:inset-x-16 top-4 bottom-12 border-2 border-[#C5A059]/50 rounded-[40px] pointer-events-none hidden sm:block"></div>

                {/* Top Heading */}
                <div className="relative z-10 text-center pt-2">
                  <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#A66E38] tracking-wide">
                    Our Signature <br className="sm:hidden" /> Blouse Boutique
                  </h2>
                </div>

                {/* 3 Circular Blouse Photos (Matching Figma Screenshot 3) */}
                <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-6 lg:gap-8 my-3 sm:my-6">
                  
                  {/* Left Circle: Blue / Designer Blouse */}
                  <div className="w-16 h-16 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-[#C5A059]/40 shadow-md bg-stone-100 group-hover:scale-105 transition-transform duration-500 shrink-0">
                    <img
                      src="/images/designer_blouse.jpg"
                      alt="Designer Blouse"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Center Circle (Larger): Purple Velvet Backless with Net Lattice & Pearls */}
                  <div className="w-24 h-24 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden border-2 sm:border-4 border-[#C5A059] shadow-xl bg-purple-950 group-hover:scale-110 transition-transform duration-500 z-10 shrink-0">
                    <img
                      src="/images/blouse_purple.jpg"
                      alt="Royal Purple Velvet Backless Blouse with Pearl Latkan"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right Circle: Yellow Silk Collar Blouse */}
                  <div className="w-16 h-16 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-[#C5A059]/40 shadow-md bg-stone-100 group-hover:scale-105 transition-transform duration-500 shrink-0">
                    <img
                      src="/images/hero_model.jpg"
                      alt="Handcrafted Silk Blouse"
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>

                {/* Bottom Row: FLAT 50% OFF Pill on Left, Subtitle on Right */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="border-2 border-[#C5A059] bg-white/70 backdrop-blur-xs px-6 sm:px-8 py-2.5 rounded-full shadow-xs">
                    <span className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#A66E38] tracking-widest uppercase">
                      FLAT 50% OFF
                    </span>
                  </div>

                  <p className="font-serif text-xs sm:text-sm lg:text-base text-[#A66E38] font-medium tracking-wide text-center sm:text-right">
                    A Boutique for Thoughtfully Crafted Blouses
                  </p>
                </div>

              </div>
            </Link>
          </div>

          {/* LEFT & RIGHT ARROWS (Subtle On-Hover Controls) */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#5C1329] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#5C1329] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* 3 PAGINATION DOTS AT BOTTOM RIGHT (Matching User Screenshots . . .) */}
        <div className="flex items-center justify-end gap-2 pt-3 pr-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all rounded-full ${
                currentSlide === idx
                  ? 'w-2.5 h-2.5 bg-[#8B0821] ring-2 ring-[#8B0821]/30'
                  : 'w-1.5 h-1.5 bg-[#C5A059]/60 hover:bg-[#8B0821]'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

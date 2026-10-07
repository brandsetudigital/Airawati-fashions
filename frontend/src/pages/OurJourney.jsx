// frontend/src/pages/OurJourney.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function OurJourney() {
  const processSteps = [
    {
      num: '1',
      title: 'Traditional Weaving',
      desc: 'Master artisans hand-weave each piece using time-honored techniques passed down through generations',
      image: '/images/journey_process_spinning.jpg',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      )
    },
    {
      num: '2',
      title: 'Design & Creation',
      desc: 'Shipped with care directly from our artisan partners to your doorstep',
      image: '/images/journey_process_weaving.jpg',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4 5 5 0 015-5c.966 0 1.87.278 2.636.758L16 4.364a2 2 0 112.828 2.828l-8.394 5.364A5 5 0 0111 17a4 4 0 01-4 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-2-2" />
        </svg>
      )
    },
    {
      num: '3',
      title: 'Quality Assurance',
      desc: 'Every saree undergoes rigorous quality checks and professional Airawati photoshoots',
      image: '/images/journey_process_yarn_bundles.jpg',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      num: '4',
      title: 'Direct Delivery',
      desc: 'Shipped with care directly from our artisan partners to your doorstep',
      image: '/images/journey_process_delivery_yarn.jpg',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h2" />
        </svg>
      )
    }
  ];

  const visionCards = [
    {
      title: 'Global Recognition',
      desc: 'Taking authentic Indian handloom to the world stage while preserving its traditional essence',
      badgeBg: 'bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]',
      lineColor: 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: 'Sustainable Fashion',
      desc: 'Championing eco-friendly, zero-waste practices that honor nature and tradition',
      badgeBg: 'bg-gradient-to-br from-[#22C55E] to-[#16A34A]',
      lineColor: 'bg-gradient-to-r from-[#22C55E] to-[#16A34A]',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      title: 'Artisan Empowerment',
      desc: 'Creating thriving communities by ensuring fair wages and dignified working conditions',
      badgeBg: 'bg-gradient-to-br from-[#E11D48] to-[#F43F5E]',
      lineColor: 'bg-gradient-to-r from-[#E11D48] to-[#F43F5E]',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Innovation in Tradition',
      desc: 'Blending timeless techniques with contemporary designs for the modern wardrobe',
      badgeBg: 'bg-gradient-to-br from-[#EA580C] to-[#F97316]',
      lineColor: 'bg-gradient-to-r from-[#EA580C] to-[#F97316]',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-24 pb-20">

      {/* 1. HERO BANNER - From Home To Handloom (Perfect Framing, No Crop, Balanced Proportions) */}
      <section className="relative w-full bg-[#FAF5F0] border-b border-[#C5A059]/20 py-4 sm:py-6 lg:py-8">
        <h1 className="sr-only">From Home To Handloom - The Airawati Story</h1>
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-3 sm:px-6">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#C5A059]/30 bg-[#F5ECE5]">
            <img 
              src="/images/journey_hero_home_to_handloom.jpg" 
              alt="From Home To Handloom - A journey that began at home, grew with belief, and reached many hearts through trusted hands" 
              className="w-full h-auto block" 
            />
          </div>
        </div>
      </section>

      {/* 2. THE WOMAN BEHIND AIRAWATI */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#C5A059]/30 shadow-luxury-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <h3 className="font-serif text-3xl font-bold text-[#1E060D]">
              The Woman Behind <span className="text-[#5C1329] italic font-normal">Airawati</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Guided by a vision to preserve the endangered art of handloom weaving, our founder spent months traveling to weaving clusters along the banks of the Narmada and the lanes of Varanasi. Meeting master weavers in their homes, she witnessed the devotion and centuries of skill that goes into every single drape.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Today, Airawati supports over 50 weaver families directly, providing dignified sustainable livelihoods while sharing India's rich textiles with the modern world.
            </p>
            <p className="font-serif text-sm font-bold text-[#5C1329] italic pt-2">— Founder, Airawati</p>
          </div>

          <div className="md:col-span-5 aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#C5A059]/30 bg-stone-100 group">
            <img 
              src="/images/woman_behind_airawati_founders.jpg" 
              alt="The Woman Behind Airawati - Founders in Handwoven Sarees" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>
      </section>

      {/* 3. WHERE IT ALL BEGAN - OUR BEGINNING (Matching Screenshot 1) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-[#C5A059]/50"></span>
            <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
            <span className="h-px w-8 bg-[#C5A059]/50"></span>
          </div>
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] text-[#C04838] block mb-1">
            Where It All Began
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-[#1E2530]">Our</span>{' '}
            <span className="text-[#C04838]">Beginning</span>
          </h2>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left: Image with Overlapping Location Pin Badge */}
          <div className="lg:col-span-5 relative group">
            <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[28px] overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100">
              <img 
                src="/images/journey_maheshwar_dyed_yarn.jpg" 
                alt="Maheshwar Handloom Yarn Dyeing" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            {/* Terracotta Location Pin Badge */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:right-2 w-12 h-12 sm:w-14 sm:h-14 bg-[#D14A29] rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Right: Story Details & 2 Feature Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B1513]">
              From Maheshwar with Love
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Our journey began in the sacred town of <strong className="font-semibold text-stone-800">Maheshwar</strong>, nestled on the banks of the Narmada River. Here, where Queen Ahilyabai Holkar once patronized the finest weavers, we discovered our calling.
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Airawati Fashion was born from a simple yet powerful vision: to bring authentic handloom sarees directly from the artisans' looms to your doorstep. We started by working intimately with master weavers in Maheshwar, learning every intricate detail of the traditional craft.
            </p>

            {/* 2 Feature Cards Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Direct Connection Card */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow space-y-2">
                <div className="w-8 h-8 flex items-center justify-center text-[#D14A29]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1E2530]">Direct Connection</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  We work directly with artisans, ensuring fair wages and preserving traditional techniques
                </p>
              </div>

              {/* Authentic Quality Card */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow space-y-2">
                <div className="w-8 h-8 flex items-center justify-center text-[#D14A29]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1E2530]">Authentic Quality</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  Every saree is handwoven with genuine materials, shipped with care and authenticity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FROM LOOM TO HOME - OUR PROCESS (Matching Screenshots 2, 3, 4, 5) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-[#C5A059]/50"></span>
            <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
            <span className="h-px w-8 bg-[#C5A059]/50"></span>
          </div>
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] text-[#C04838] block mb-1">
            From Loom to Home
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-[#1E2530]">Our</span>{' '}
            <span className="text-[#C04838]">Process</span>
          </h2>
        </div>

        {/* 4 Alternating Process Steps */}
        <div className="space-y-16 sm:space-y-20">
          {processSteps.map((step, idx) => {
            const isEven = idx % 2 === 1; // 0: Left Image, 1: Right Image, 2: Left Image, 3: Right Image
            return (
              <div 
                key={step.num}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center"
              >
                {/* Image Column */}
                <div className={`md:col-span-6 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="relative group">
                    <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    {/* Terracotta Number Badge */}
                    <div 
                      className={`absolute -top-3 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#9E3524] text-white flex items-center justify-center font-serif font-bold text-sm sm:text-base shadow-lg ${
                        isEven ? '-left-2' : '-right-2'
                      }`}
                    >
                      {step.num}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`md:col-span-6 ${isEven ? 'md:order-1' : 'md:order-2'} space-y-3`}>
                  {/* Purple Gradient App Badge */}
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2530] tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light max-w-md">
                    {step.desc}
                  </p>

                  {/* Fading Pink/Red Accent Line */}
                  <div className="pt-2">
                    <div className="h-0.5 w-full max-w-md bg-gradient-to-r from-rose-500 via-rose-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. LOOKING FORWARD - OUR VISION & THE AIRAWATI PROMISE (Matching Screenshot Exactly) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-[#C5A059]/50"></span>
            <span className="text-[#C5A059] text-sm">✦</span>
            <span className="h-px w-8 bg-[#C5A059]/50"></span>
          </div>
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-[#C04838] block mb-1">
            Looking Forward
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="text-[#1E2530]">Our</span>{' '}
            <span className="text-[#C04838]">Vision</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
            To become the global ambassador of authentic Indian handloom, weaving a future where tradition, sustainability, and modern elegance coexist
          </p>
        </div>

        {/* 4 Vision Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-[26px] p-6 sm:p-7 border border-stone-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center group"
            >
              <div className="space-y-3.5 flex flex-col items-center w-full">
                {/* Top Rounded Gradient Icon Badge */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${card.badgeBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {card.icon}
                </div>

                {/* Title */}
                <h4 className="font-serif font-bold text-base text-[#1E2530] pt-1">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-stone-500 font-light leading-relaxed max-w-[210px] mx-auto">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Centered Rounded Accent Pill */}
              <div className="pt-6 w-full flex justify-center">
                <div className={`h-1 w-20 sm:w-24 rounded-full ${card.lineColor}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* 6. THE AIRAWATI PROMISE BANNER (Matching Screenshot Exactly) */}
        <div className="mt-14 sm:mt-16 relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#6D1F28] via-[#8E2625] to-[#CE3C23] p-8 sm:p-14 text-white text-center shadow-2xl space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            The Airawati Promise
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-stone-100 font-light leading-relaxed max-w-3xl mx-auto">
            We envision a world where every handwoven saree tells a story of heritage, every artisan is celebrated, and every customer feels the pride of wearing authentic Indian craftsmanship. Airawati is not just a brand—it's a movement to preserve, promote, and elevate India's handloom legacy for generations to come.
          </p>

          {/* Centered Line and Tagline */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2 text-stone-200 text-xs sm:text-sm font-light">
            <span className="w-10 sm:w-20 h-px bg-white/40"></span>
            <span className="tracking-wide">Woven with Love, Delivered with Pride</span>
            <span className="w-10 sm:w-20 h-px bg-white/40"></span>
          </div>
        </div>
      </section>

    </div>
  );
}

// frontend/src/pages/Artisans.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ARTISANS } from '../data/mockData';

export default function Artisans() {
  const yarnToSareeSteps = [
    {
      num: '01',
      title: 'Yarn Selection',
      desc: 'Choosing the finest quality silk and cotton threads for strength and luster'
    },
    {
      num: '02',
      title: 'Natural Dyeing',
      desc: 'Using traditional dyeing techniques with natural and eco-friendly colors'
    },
    {
      num: '03',
      title: 'Loom Preparation',
      desc: 'Setting up the warp and preparing the loom for the intricate weaving process'
    },
    {
      num: '04',
      title: 'Hand Weaving',
      desc: 'Master artisans weave each thread with precision, creating unique patterns'
    },
    {
      num: '05',
      title: 'Finishing Touches',
      desc: 'Adding borders, pallus, and final embellishments with meticulous care'
    },
    {
      num: '06',
      title: 'Quality Check',
      desc: 'Each saree is inspected to meet our highest standards of excellence'
    }
  ];

  const communityArtisans = [
    { name: 'Lakshmi Devi', craft: 'Silver Filigree & Zari', image: '/images/artisan_lakshmi_devi.jpg' },
    { name: 'Ramesh Kumar', craft: 'Banarasi Katan Silk', image: '/images/artisan_ramesh_kumar.jpg' },
    { name: 'Suresh Verma', craft: 'Maheshwari & Metal Craft', image: '/images/artisan_suresh_verma.jpg' },
    { name: 'Sunita Bai', craft: 'Bandhani Tie-Dye', image: '/images/artisan_sunita_bai.jpg' },
    { name: 'Gopal Mehra', craft: 'Zari Border Master', image: '/images/artisan_gopal_mehra.jpg' },
    { name: 'Rekha Verma', craft: 'Pit Loom Artisan', image: '/images/artisan_rekha_verma.jpg' },
    { name: 'Chandresh Sen', craft: 'Hand Block Printing', image: '/images/artisan_chandresh_sen.jpg' },
    { name: 'Radhey Shyam', craft: 'Tassel & Latkan Crafter', image: '/images/artisan_yellow_pagri.jpg' }
  ];

  return (
    <div className="space-y-20 pb-16">

      {/* Hero Banner - The Hands Behind Every Airawati Saree (Framed Matching Our Journey & Home) */}
      <section className="relative w-full bg-[#FAF5F0] border-b border-[#C5A059]/20 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-3 sm:px-6">
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#C5A059]/30 min-h-[360px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] flex items-center justify-center text-white bg-cover bg-center"
            style={{ backgroundImage: "url('/images/artisans_hero_workshop.jpg')" }}
          >
            {/* Luxury Backdrop Overlay for clear readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40 backdrop-blur-[0.5px]"></div>
            
            {/* Center Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-3 sm:space-y-4 py-8">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#F9D783] font-bold">
                <span className="w-6 h-px bg-[#F9D783]/60"></span>
                <span>Master Artisans &amp; Heritage Weavers</span>
                <span className="w-6 h-px bg-[#F9D783]/60"></span>
              </div>

              <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                The Hands Behind <br className="hidden sm:block" />
                Every Airawati Saree
              </h1>
              <p className="text-stone-200 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed drop-shadow">
                Where heritage meets craftsmanship, and every thread tells a story of tradition, patience, and artistry.
              </p>
              <div className="pt-1">
                <a
                  href="#lakshmi-profile"
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 bg-[#5C1329] hover:bg-[#430D1E] text-white rounded-full text-xs font-semibold tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <span>Meet Our Artisans</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Woven with Love, Crafted with Pride */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D] leading-tight">
              Woven with Love, <br />
              <span className="text-[#5C1329] italic font-normal">Crafted with Pride</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              At Airawati, we believe in more than just creating beautiful sarees. We believe in nurturing relationships, preserving ancient traditions, and empowering the skilled artisans who bring our vision to life.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Every piece in our collection is the result of a direct partnership with master weavers from across India. We work closely with artisan communities, ensuring fair wages, sustainable practices, and the preservation of handloom techniques passed down through generations.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              When you wear an Airawati saree, you're not just wearing fabric — you're wearing history, culture, and the dedication of hands that have perfected their craft over decades.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-stone-100 border border-[#C5A059]/30 group">
            <img 
              src="/images/artisan_loom_weaving_hands.jpg" 
              alt="Artisan Hands Weaving on Traditional Loom" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-3 left-3 right-3 text-[11px] text-white/95 font-serif italic bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center justify-between">
              <span>Authentic Handloom Pit Loom</span>
              <span>Handcrafted with Precision</span>
            </div>
          </div>
        </div>
      </section>

      {/**/}
      <section id="lakshmi-profile" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-[#C5A059]"></span>
            <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
            <span className="h-px w-8 bg-[#C5A059]"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D]">
            Meet the <span className="text-[#5C1329] italic font-normal">Master Artisans</span>
          </h2>
          <p className="text-stone-500 text-xs mt-1">Stories from the heart of our artisan community</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#C5A059]/30 shadow-luxury-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div>
              <h3 className="font-serif text-3xl font-bold text-[#1E060D]">Lakshmi Devi</h3>
              <p className="text-xs font-bold text-[#C5A059] uppercase tracking-wider mt-0.5">Master Handloom Weaver &bull; 15 Years of Experience</p>
            </div>

            <blockquote className="font-serif text-lg italic text-[#5C1329] border-l-2 border-[#5C1329] pl-4 py-1 leading-snug">
              "I learned to weave from my mother when I was just twelve years old. The loom was like a second home to me."
            </blockquote>

            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Lakshmi Devi has been weaving Chanderi sarees for over three decades. Her expertise in intricate zari border work and her understanding of traditional patterns is unmatched. She leads a group of fifteen women in her village, passing on her knowledge to the younger generation.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Each saree that passes through Lakshmi's hands takes anywhere from 10 to 20 days to complete, depending on the complexity of the design. She takes immense pride in every piece, knowing it will become a part of someone's special celebration.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Working with Airawati has allowed her to continue her craft while earning a sustainable income that supports her family and preserves her village's weaving heritage.
            </p>
          </div>

          <div className="md:col-span-5 aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-2 border-[#C5A059]/40">
            <img src="/images/artisan_lakshmi_devi.jpg" alt="Lakshmi Devi" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* The Art of Handloom */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-px w-8 bg-[#C5A059]"></span>
          <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
          <span className="h-px w-8 bg-[#C5A059]"></span>
        </div>
        <h3 className="font-serif text-3xl font-bold text-[#1E060D] mb-2">
          The Art of <span className="text-[#5C1329] italic font-normal">Handloom</span>
        </h3>
        <p className="text-stone-500 text-xs mb-8">A glimpse into the intricate world of traditional weaving</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 1. Pink Loom & Roller */}
          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#C5A059]/30 bg-stone-100">
            <img 
              src="/images/handloom_pink_loom.jpg" 
              alt="Traditional Handloom Setup" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F9D783]">Loom Craft</span>
              <h4 className="font-serif text-white text-base font-bold">Traditional Handloom Setup</h4>
              <p className="text-stone-300 text-[11px] font-light leading-snug">Vibrant pure silk threads woven with authentic precision</p>
            </div>
          </div>

          {/* 2. Warp Threads by Hand */}
          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#C5A059]/30 bg-stone-100">
            <img 
              src="/images/handloom_warp_hands.jpg" 
              alt="Artisan Warping & Thread Alignment" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F9D783]">Artisan Precision</span>
              <h4 className="font-serif text-white text-base font-bold">Hand Warping &amp; Alignment</h4>
              <p className="text-stone-300 text-[11px] font-light leading-snug">Individual warp threads aligned by master weavers with generational skill</p>
            </div>
          </div>

          {/* 3. Master Pit Loom Weaving */}
          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#C5A059]/30 bg-stone-100">
            <img 
              src="/images/handloom_pit_loom_weaving.jpg" 
              alt="Authentic Pit Loom Weaving" 
              className="w-full h-full object-cover object-[center_55%] group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F9D783]">Heritage Craft</span>
              <h4 className="font-serif text-white text-base font-bold">Pit Loom Rhythm &amp; Shuttle</h4>
              <p className="text-stone-300 text-[11px] font-light leading-snug">Synchronized wooden shuttle creating heritage sarees thread by thread</p>
            </div>
          </div>
        </div>
      </section>

      {/* From Yarn to Saree Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Ornament */}
        <div className="flex items-center justify-center mb-1">
          <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2.5">
          <span className="text-[#1E2530]">From Yarn</span>{' '}
          <span className="text-[#B4332C]">to Saree</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-[#786F66] text-xs sm:text-sm font-light tracking-wide mb-12 sm:mb-16">
          The journey of creating a handwoven masterpiece
        </p>

        {/* 3-Column x 2-Row Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 sm:gap-y-14 md:gap-y-16 gap-x-8 sm:gap-x-12">
          {yarnToSareeSteps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center px-2 group">
              {/* Circular Number Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EFE8DD] flex items-center justify-center mb-4 sm:mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <span className="font-serif text-sm sm:text-base font-semibold text-[#A66352] tracking-wider">
                  {step.num}
                </span>
              </div>

              {/* Step Title */}
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#1E2530] mb-2">
                {step.title}
              </h4>

              {/* Step Description */}
              <p className="text-xs sm:text-[13px] text-[#786F66] font-light leading-relaxed max-w-[270px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Ornament */}
        <div className="flex items-center justify-center gap-3 pt-12 sm:pt-16">
          <span className="h-px w-14 sm:w-20 bg-[#C5A059]/40"></span>
          <span className="text-[#C5A059] text-base leading-none">&#10022;</span>
          <span className="h-px w-14 sm:w-20 bg-[#C5A059]/40"></span>
        </div>
      </section>

      {/* Our Artisan Community */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-px w-8 bg-[#C5A059]"></span>
          <span className="text-[#C5A059] text-xs font-serif italic">&#10022;</span>
          <span className="h-px w-8 bg-[#C5A059]"></span>
        </div>
        <h3 className="font-serif text-3xl font-bold text-[#1E060D] mb-2">
          Our <span className="text-[#5C1329] italic font-normal">Artisan Community</span>
        </h3>
        <p className="text-stone-500 text-xs mb-8">Meet the talented hands behind our collection</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {communityArtisans.map((art, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-[#C5A059]/20 shadow-sm hover:shadow-md transition-all duration-300 text-center group">
              <div className="aspect-square rounded-xl overflow-hidden bg-stone-100 mb-3 border border-stone-100/80">
                <img 
                  src={art.image} 
                  alt={art.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#1E060D]">{art.name}</h4>
              <p className="text-[10px] text-[#C5A059] font-medium tracking-wide mt-0.5">{art.craft}</p>
            </div>
          ))}
        </div>
      </section>

      {/**/}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-[#FAF6F0] border-y-2 border-[#C5A059]/40 py-10 px-6 text-center space-y-2">
          <blockquote className="font-serif text-xl sm:text-2xl italic text-[#5C1329] leading-snug">
            "A saree is not made in a day. It is woven with love, patience, and the wisdom of centuries."
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">— Lakshmi Devi, Master Weaver</p>
        </div>
      </section>

    </div>
  );
}

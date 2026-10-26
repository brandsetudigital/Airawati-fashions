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
            style={{ backgroundImage: "url('/acc-4.png')" }}
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

        {/* <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#C5A059]/30 shadow-luxury-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
        </div> */}








{/* ================= MEET OUR MASTER WEAVER ================= */}
<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FFFCF7] border border-[#C5A059]/25 shadow-[0_12px_45px_rgba(61,11,27,0.07)]">

    {/* Subtle Decorative Accent */}
    <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#C5A059]/40 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none" />

    <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 md:gap-10 p-5 sm:p-8 md:p-10 lg:p-12">

      {/* Artisan Image */}
      <div className="md:col-span-5 order-1">
        <div className="relative max-w-sm mx-auto md:max-w-none">

          <div className="absolute -inset-2 rounded-2xl border border-[#C5A059]/40" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-[#F5EBDD]">
            <img
              src="/images/artisan_lakshmi_devi.jpg"
              alt="Lakshmi Devi, master handloom weaver"
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* Image Caption */}
          <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-[#FFFCF7]/95 backdrop-blur-sm px-4 py-3 border border-[#C5A059]/25">
            <p className="font-serif text-base text-[#5C1329]">
              Woven with tradition
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-1">
              Crafted by skilled hands
            </p>
          </div>

        </div>
      </div>

      {/* Artisan Story */}
      <div className="md:col-span-7 order-2 space-y-5 sm:space-y-6">

        {/* Eyebrow */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A47A36]">
              The Hands Behind the Art
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-[#3D0B1B]">
            Meet
            <span className="block italic font-normal text-[#9B4659] mt-1">
               LakshmiDevi
            </span>
          </h3>

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.16em] font-medium text-[#A47A36] mt-3">
            Master Handloom Weaver
            <span className="mx-2 text-[#C5A059]">✦</span>
            15 Years of Experience
          </p>
        </div>

        {/* Artisan Quote */}
        <blockquote className="relative border-l-2 border-[#C5A059] pl-4 sm:pl-5 py-1">
          <span className="absolute -top-4 right-0 font-serif text-5xl text-[#C5A059]/25">
            ”
          </span>
          <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-[#5C1329]">
            “I learned to weave from my mother when I was just twelve years old. The loom was like a second home to me.”
          </p>
        </blockquote>

        {/* Story */}
        <div className="space-y-3 text-xs sm:text-sm leading-6 sm:leading-7 text-stone-600 font-light">
          <p>
            For Lakshmi Devi, weaving is more than a craft — it is a legacy passed down through generations. Her expertise in intricate zari borders and traditional Chanderi patterns brings every saree to life.
          </p>

          <p>
            Each creation takes 10 to 20 days, depending on its intricacy. With every thread, she weaves patience, heritage, and the joy of becoming part of someone's special moments.
          </p>

          <p>
            Through Airawati, Lakshmi continues to preserve her weaving heritage while supporting her family and inspiring the next generation of artisans.
          </p>
        </div>

        {/* Closing Detail */}
        <div className="flex items-center gap-3 pt-1">
          <span className="w-10 h-px bg-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A47A36]">
            A legacy in every thread
          </span>
        </div>

      </div>
    </div>
  </div>
</section>
{/* ================= END MASTER WEAVER SECTION ================= */}




      </section>


{/* ================= FROM YARN TO SAREE ================= */}
<section className="w-full bg-[#F8F1E8] py-10 sm:py-14 lg:py-20 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-14">

      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="w-9 sm:w-12 h-px bg-[#5C1329]/50" />
        <span className="text-[#5C1329] text-sm">✧</span>
        <span className="w-9 sm:w-12 h-px bg-[#5C1329]/50" />
      </div>

      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-semibold text-[#A47A36] mb-3">
        From Our Hands to Yours
      </p>

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-[#3D0B1B]">
        From Yarn{" "}
        <span className="italic font-normal text-[#8B3A50]">
          to Saree
        </span>
      </h2>

      <p className="max-w-xl mx-auto mt-3 sm:mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-stone-600 font-light">
        Discover the thoughtful process that transforms simple threads
        into heirloom-worthy handwoven sarees.
      </p>
    </div>

    {/* Responsive Process Cards — No Arrows */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">

      {yarnToSareeSteps.map((step) => (
        <article
          key={step.num}
          className="group relative min-w-0 min-h-[210px] sm:min-h-[230px]
          flex flex-col items-center justify-center text-center
          bg-[#FFFCF7] border border-[#C5A059]/30
          rounded-xl sm:rounded-2xl px-5 py-6 sm:px-6 sm:py-8
          transition-all duration-500 ease-out
          hover:-translate-y-1.5
          hover:border-[#5C1329]/40
          hover:shadow-[0_14px_35px_rgba(61,11,27,0.10)]
          active:scale-[0.99]"
        >

          {/* Animated Top Accent */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2
            w-0 h-[2px] rounded-full bg-[#C5A059]
            transition-all duration-500 group-hover:w-1/2"
          />

          {/* Number Badge */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            shrink-0 flex items-center justify-center rounded-full
            border border-[#C5A059]/60 bg-[#F8F0E5] mb-4 sm:mb-5
            transition-all duration-500
            group-hover:bg-[#5C1329]
            group-hover:border-[#5C1329]
            group-hover:scale-105"
          >
            <span className="font-serif text-sm sm:text-base md:text-lg
              text-[#5C1329] transition-colors duration-300
              group-hover:text-white"
            >
              {step.num}
            </span>
          </div>

          {/* Decorative Divider */}
          <span className="w-7 h-px bg-[#C5A059] mb-3 sm:mb-4
            transition-all duration-500
            group-hover:w-12 group-hover:h-[2px]"
          />

          {/* Step Title */}
          <h3 className="font-serif text-base sm:text-lg md:text-xl
            font-medium leading-snug text-[#3D0B1B] mb-2 sm:mb-3
            transition-colors duration-300
            group-hover:text-[#8B3A50]"
          >
            {step.title}
          </h3>

          {/* Step Description */}
          <p className="w-full max-w-sm text-xs sm:text-sm
            leading-5 sm:leading-6 text-stone-600 font-light"
          >
            {step.desc}
          </p>

          {/* Bottom Ornament */}
          <span className="mt-4 text-xs text-[#C5A059]/60
            transition-all duration-300
            group-hover:text-[#C5A059]
            group-hover:scale-110"
            aria-hidden="true"
          >
            ✧
          </span>

        </article>
      ))}

    </div>

    {/* Closing Statement */}
    <div className="flex flex-col items-center mt-8 sm:mt-10 lg:mt-14">
      <div className="flex items-center justify-center gap-3">
        <span className="w-8 sm:w-12 h-px bg-[#5C1329]/40" />
        <span className="text-[#A47A36] text-sm">✧</span>
        <span className="w-8 sm:w-12 h-px bg-[#5C1329]/40" />
      </div>

      <p className="mt-3 sm:mt-4 font-serif italic text-xs sm:text-sm md:text-base text-[#5C1329] text-center">
        Woven with tradition. Created to be treasured.
      </p>
    </div>

  </div>
</section>
{/* ================= END FROM YARN TO SAREE ================= */}

   

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

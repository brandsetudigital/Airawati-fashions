// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, Award, Truck, Coins, RotateCcw, Star, Instagram } from 'lucide-react';
import SareeCard from '../components/SareeCard';
import HeroSlider from '../components/HeroSlider';
import { PRODUCTS, CATEGORIES, ARTISANS, BLOUSES } from '../data/mockData';

const signatureCollection = [
  {
    id: 1,
    name: 'Maheshwari Saree',
    image: '/images/category_saree_purple.png',
    link: '/shop?category=maheshwari',
  },
  {
    id: 2,
    name: 'Maheshwari Saree',
    image: '/images/category_saree_mustard.png',
    link: '/shop?category=maheshwari',
  },
  {
    id: 3,
    name: 'Maheshwari Saree',
    image: '/images/category_saree_teal.png',
    link: '/shop?category=maheshwari',
  },
  {
    id: 4,
    name: 'Maheshwari Saree',
    image: '/images/category_saree_orange.png',
    link: '/shop?category=maheshwari',
  },
];

export default function Home() {
  const featuredSarees = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SLIDER (Matching Figma 3-Slide Auto Carousel) */}
      <HeroSlider />

      {/* 2. SIGNATURE COLLECTION / SHOP BY CATEGORY (Exact Figma Design with Royal Gold Filigree Motif) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Pure Vector Royal Gold Sparkle Ornament with horizontal accent lines */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="w-10 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]"></div>
            <div className="text-[#C5A059] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 C12 7.5 16.5 12 22 12 C16.5 12 12 16.5 12 22 C12 16.5 7.5 12 2 12 C7.5 12 12 7.5 12 2 Z"
                  fill="#C5A059"
                />
                <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
                <circle cx="12" cy="12" r="1" fill="#C5A059" />
              </svg>
            </div>
            <div className="w-10 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]"></div>
          </div>
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-[#D84C35] block mb-2">
            Shop By Category
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161616]">
            Discover our <span className="text-[#A32A2A] font-bold">Signature Collection</span>
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2.5 font-normal">
            Explore handloom collections shaped by tradition and craft.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {signatureCollection.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-col items-center text-center"
            >
              {/* Royal Gold Filigree Ornament Motif directly above the arched card */}
              <div className="w-full flex justify-center mb-2 sm:mb-2.5">
                <img
                  src="/images/category_arch_ornament.png"
                  alt="Filigree Motif"
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Arched Saree Model Card */}
              <div className="w-full aspect-[3/4.8] rounded-t-full overflow-hidden bg-stone-50 shadow-xs group-hover:shadow-md transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-xs sm:text-sm md:text-[15px] text-[#632026] group-hover:text-[#A32A2A] mt-3.5 transition-colors tracking-wide">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* View all Button with Crimson/Maroon Gradient */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#6E1C24] via-[#852129] to-[#B32E27] hover:from-[#58151C] hover:to-[#9E231D] text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/**/}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#C5A059] block mb-2">Featured Collection</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D]">
            Find the perfect Saree <span className="text-[#5C1329] italic font-normal">To match your mood</span>
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">
            From grand weddings to everyday elegance — discover handpicked sarees crafted for every celebration and moment.
          </p>
        </div>

        {/**/}
        {/* Responsive Grid with equal height stretch and zero empty gaps */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:h-[560px] lg:h-[620px]">
          {/* 1. Left Featured Pillar: WEDDING VIBES (Full Height) */}
          <div className="md:col-span-4 h-full relative rounded-2xl overflow-hidden shadow-md group min-h-[420px] md:min-h-0">
            <img
              src="/images/wedding_vibes.jpg"
              alt="Wedding Vibes"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <Link to="/shop?mood=wedding" className="inline-flex items-center gap-2 text-white font-serif font-bold text-lg hover:text-[#C5A059] transition-colors">
                <span>WEDDING VIBES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. Middle Column: Two Stacked Cards (Each splits 50% height evenly) */}
          <div className="md:col-span-4 h-full flex flex-col gap-5 min-h-[420px] md:min-h-0">
            <div className="relative rounded-2xl overflow-hidden flex-1 shadow-md group min-h-[200px] md:min-h-0">
              <img
                src="/images/saree_purple.jpg"
                alt="Maheshwari Silk Saree"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4">
                <Link to="/shop?category=maheshwari" className="inline-flex items-center gap-2 text-white font-serif font-semibold text-sm hover:text-[#C5A059]">
                  <span>Maheshwari Silk Saree</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden flex-1 shadow-md group min-h-[200px] md:min-h-0">
              <img
                src="/images/hero_model.jpg"
                alt="Maheshwari Cotton Silk Saree"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4">
                <Link to="/shop?category=chanderi" className="inline-flex items-center gap-2 text-white font-serif font-semibold text-sm hover:text-[#C5A059]">
                  <span>Maheshwari Cotton Silk Saree</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Right Featured Pillar: Maheshwari Handloom Saree (Full Height, Matching Left Pillar) */}
          <div className="md:col-span-4 h-full relative rounded-2xl overflow-hidden shadow-md group min-h-[420px] md:min-h-0">
            <img
              src="/images/saree_peacock.jpg"
              alt="Maheshwari Handloom Saree"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <Link to="/shop" className="inline-flex items-center gap-2 text-white font-serif font-bold text-base hover:text-[#C5A059] transition-colors">
                <span>Maheshwari Handloom Saree</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/**/}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#C5A059] block mb-2">New Arrivals &bull; Fresh Off The Loom</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D]">
            Unveil our newest collection of <span className="text-[#5C1329] italic font-normal">Handcrafted sarees</span>
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">Blending tradition with modern elegance</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredSarees.map((saree) => (
            <SareeCard key={saree.id} product={saree} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-block px-7 py-2.5 bg-[#5C1329] hover:bg-[#430D1E] text-white rounded-full text-xs font-semibold tracking-wider transition-colors shadow-sm"
          >
            View all &rarr;
          </Link>
        </div>
      </section>

      {/* 5. PERSONALIZED BLOUSES & ACCESSORIES (Matching Figma Screenshot Exactly) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#C5A059]">
            <span className="w-8 h-px bg-[#C5A059]/40"></span>
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="w-8 h-px bg-[#C5A059]/40"></span>
          </div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#8B0821] block mb-2">
            Boutique by Airawati
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E060D]">
            Personalized blouses <span className="text-[#8B0821] font-normal italic">and Accessories</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            Choose a design, share your size, and book a consultation with our tailor.
          </p>
        </div>

        {/* 4 Showcase Images Matching User's Screenshot Exactly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          {/* Card 1: Off-shoulder floral blouse */}
          <Link
            to="/boutique"
            className="block aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#C5A059]/20 group transition-all duration-500 translate-y-3 sm:translate-y-4"
          >
            <img
              src="/images/boutique_showcase_1.jpg"
              alt="Off-shoulder floral embroidered blouse"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Card 2: Champagne beige ruffled blouse */}
          <Link
            to="/boutique"
            className="block aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#C5A059]/20 group transition-all duration-500"
          >
            <img
              src="/images/boutique_showcase_2.jpg"
              alt="Champagne embroidered ruffled sleeve blouse"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Card 3: Geometric high-neck ruffle blouse */}
          <Link
            to="/boutique"
            className="block aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#C5A059]/20 group transition-all duration-500 translate-y-3 sm:translate-y-4"
          >
            <img
              src="/images/boutique_showcase_3.jpg"
              alt="Geometric high-neck brown ruffled blouse"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Card 4: Teal blue embroidered sleeveless blouse */}
          <Link
            to="/boutique"
            className="block aspect-[3/4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#C5A059]/20 group transition-all duration-500"
          >
            <img
              src="/images/boutique_showcase_4.jpg"
              alt="Teal blue bridal embroidered blouse with temple cuffs"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* Centered Gradient Pill Button (Matching Screenshot) */}
        <div className="text-center mt-12">
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B0821] to-[#C0392B] hover:from-[#6e061a] hover:to-[#a93226] text-white px-9 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-xl transition-all"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. MEET THE MASTER ARTISANS (Matching Figma Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-1 text-[#C5A059]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#8B0821] block mb-2">
            The Heart of Airawati
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E060D]">
            Meet the <span className="text-[#8B0821] font-normal italic">Master Artisans</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            From grand weddings to everyday elegance – discover handpicked sarees crafted for every celebration and moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Artisan 1: Ramesh Kumar */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#C5A059]/20 hover:shadow-md transition-all">
            <div className="aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src="/images/artisan_ramesh_kumar.jpg"
                alt="Ramesh Kumar - Master Weaver"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900">Ramesh Kumar</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-[#8B0821]/10 text-[#8B0821] font-bold text-[11px] px-3 py-0.5 rounded-full">
                  25 Years
                </span>
                <span className="text-stone-500 text-xs font-medium">Banarasi Weaving</span>
              </div>
              <p className="text-stone-600 text-xs mt-3 leading-relaxed">
                Master weaver preserving the centuries-old tradition of Banarasi silk weaving with dedication and passion.
              </p>
              <Link
                to="/artisans"
                className="mt-6 w-full bg-[#8B0821] hover:bg-[#6e061a] text-white py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Artisan 2: Suresh Verma */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#C5A059]/20 hover:shadow-md transition-all">
            <div className="aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src="/images/artisan_suresh_verma.jpg"
                alt="Suresh Verma - Heritage Metal & Loom Artisan"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900">Suresh Verma</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-[#8B0821]/10 text-[#8B0821] font-bold text-[11px] px-3 py-0.5 rounded-full">
                  30 Years
                </span>
                <span className="text-stone-500 text-xs font-medium">Maheshwari & Metal Craft</span>
              </div>
              <p className="text-stone-600 text-xs mt-3 leading-relaxed">
                Custodian of royal geometric zari borders inspired by the stone carvings and royal ghats of Maheshwar Fort.
              </p>
              <Link
                to="/artisans"
                className="mt-6 w-full bg-[#8B0821] hover:bg-[#6e061a] text-white py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Artisan 3: Lakshmi Devi */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#C5A059]/20 hover:shadow-md transition-all">
            <div className="aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src="/images/artisan_lakshmi_devi.jpg"
                alt="Lakshmi Devi - Silver Filigree & Zari Master"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-xl text-stone-900">Lakshmi Devi</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-[#8B0821]/10 text-[#8B0821] font-bold text-[11px] px-3 py-0.5 rounded-full">
                  20 Years
                </span>
                <span className="text-stone-500 text-xs font-medium">Chanderi Handloom</span>
              </div>
              <p className="text-stone-600 text-xs mt-3 leading-relaxed">
                Celebrated for gossamer silk-cotton translucency and delicate botanical motifs woven entirely with natural dyes.
              </p>
              <Link
                to="/artisans"
                className="mt-6 w-full bg-[#8B0821] hover:bg-[#6e061a] text-white py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR JOURNEY (Matching Figma Screenshot 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Oval Portrait + Founding Vision */}
          <div className="lg:col-span-6 space-y-6">
            <div className="w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4] rounded-[180px] sm:rounded-[220px] overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-[#FAF6F0] p-1.5">
              <img
                src="/images/journey_amber_saree.jpg"
                alt="Airawati Saree Heritage in Amber Chanderi Drape"
                className="w-full h-full object-cover object-top rounded-[175px] sm:rounded-[215px]"
              />
            </div>
            <div className="max-w-md mx-auto text-left">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Airawati Fashion started with a simple vision to connect Indian artisans with modern women through authentic handloom sarees, rooted in tradition and crafted with care.
              </p>
              <Link
                to="/journey"
                className="inline-flex items-center gap-2 font-serif text-sm font-bold text-[#8B0821] hover:text-[#C5A059] border-b border-[#8B0821] pb-0.5 mt-3 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Title + Paragraph + Arched Portrait */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#C5A059]">
                <Sparkles className="w-5 h-5" />
                <span className="w-8 h-px bg-[#C5A059]"></span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E060D] mb-4">
                Our <span className="text-[#8B0821] font-normal italic">Journey</span>
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Airawati Fashion is a modern handloom brand working directly with Indian artisans and weaving regions. We bring authentic, handcrafted sarees together on one platform, celebrating tradition, craftsmanship, and timeless elegance.
              </p>
            </div>

            <div className="w-full max-w-xs sm:max-w-sm ml-auto aspect-[3/4] rounded-t-full overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-[#FAF6F0] p-1">
              <img
                src="/images/journey_black_saree.jpg"
                alt="Airawati Journey Bride in Black Handloom Silk"
                className="w-full h-full object-cover object-top rounded-t-full"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 8. TRUST PILLARS & TESTIMONIALS (Matching Figma Screenshot 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* 5 Trust Pillars Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center border-b border-[#C5A059]/20 pb-14">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center text-[#8B0821] mb-2 shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1E060D]">Fast Shipping</h4>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center text-[#8B0821] mb-2 shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1E060D]">Premium Quality</h4>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center text-[#8B0821] mb-2 shadow-xs">
              <Coins className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1E060D]">Best Price</h4>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center text-[#8B0821] mb-2 shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1E060D]">Exclusive Designs</h4>
          </div>

          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center text-[#8B0821] mb-2 shadow-xs">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1E060D]">Easy Returns & Exchange</h4>
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mt-14 mb-10">
          <div className="flex items-center justify-center gap-2 mb-1 text-[#C5A059]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#8B0821] block mb-2">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E060D]">
            What Our <span className="text-[#8B0821] font-normal italic">Customers Say</span>
          </h2>
        </div>

        {/* 3 Customer Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#C5A059]/20 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#8B0821] text-white flex items-center justify-center font-serif text-2xl font-bold mb-4 shadow-xs">
                “
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic mb-4">
                "The Banarasi saree I purchased for my wedding was absolutely stunning! The quality is exceptional and you can feel the love and craftsmanship in every thread. Airawati made my special day even more memorable."
              </p>
            </div>
            <div>
              <div className="flex text-amber-500 gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Ananya Sharma</h4>
              <p className="text-[11px] text-stone-500">Mumbai, Maharashtra</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#C5A059]/20 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#8B0821] text-white flex items-center justify-center font-serif text-2xl font-bold mb-4 shadow-xs">
                “
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic mb-4">
                "The Maheshwari silk drape is featherlight with exquisite golden zari butis. Everyone at the reception complimented the drape. Truly royal craftsmanship and honest pricing!"
              </p>
            </div>
            <div>
              <div className="flex text-amber-500 gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Priya Patel</h4>
              <p className="text-[11px] text-stone-500">Ahmedabad, Gujarat</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#C5A059]/20 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#8B0821] text-white flex items-center justify-center font-serif text-2xl font-bold mb-4 shadow-xs">
                “
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed italic mb-4">
                "From packaging to the silk mark certificate, everything was so luxurious. Supporting these handloom artisans makes the drape even more meaningful. Will cherish forever."
              </p>
            </div>
            <div>
              <div className="flex text-amber-500 gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900">Meera Iyer</h4>
              <p className="text-[11px] text-stone-500">Bangalore, Karnataka</p>
            </div>
          </div>
        </div>

      </section>

      {/* 9. INSTAGRAM COMMUNITY FEED: @#AirawatiFashion (Matching Figma Screenshot Exactly) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#C5A059]">
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="flex items-center justify-center gap-1.5 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B0821] mb-2">
          <Instagram className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2.2]" />
          <span>#AirawatiFashion</span>
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mb-10 font-normal">
          Join our community and share your Airawati moments
        </p>

        {/* 4 Rounded Squircle Photos Matching Screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Card 1: Yellow saree model */}
          <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_1.jpg"
              alt="Airawati Community - Yellow Handloom Saree"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card 2: Traditional weavers at loom */}
          <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_2.jpg"
              alt="Airawati Community - Traditional Loom Weaving"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card 3: Magenta silk saree with yellow zari */}
          <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_3.jpg"
              alt="Airawati Community - Magenta and Gold Zari Saree"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Card 4: Black printed saree kneeling model */}
          <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_4.jpg"
              alt="Airawati Community - Royal Black Handcrafted Saree"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Instagram Follow Button (Matching Figma Button) */}
        <div className="mt-8">
          <a
            href="https://www.instagram.com/airawatifashions"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#8B0821] hover:bg-[#6e061a] text-white px-6 py-2 rounded-lg sm:rounded-md text-xs font-semibold shadow-xs hover:shadow-md transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @airawatifashions</span>
          </a>
        </div>
      </section>

      {/* 10. READY TO EXPERIENCE TIMELESS ELEGANCE CTA BANNER (Matching Figma Screenshot Exactly) */}
      <section className="relative overflow-hidden bg-[#5C1329] text-white py-16 sm:py-20 text-center">
        {/* Subtle decorative geometric floating outline squares in background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-8 left-16 w-24 h-24 border border-white rotate-12 rounded-2xl"></div>
          <div className="absolute bottom-8 right-24 w-32 h-32 border border-white -rotate-12 rounded-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rotate-45 rounded-xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center text-[#C5A059] mb-1">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to Experience <br />
            <span className="text-[#C5A059] font-normal italic">Timeless Elegance?</span>
          </h2>

          <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto font-light pb-2">
            Discover our exclusive collection of handwoven masterpieces
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-3 bg-white text-[#1E060D] hover:bg-stone-100 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-white/80 hover:bg-white/10 text-white rounded-full text-xs font-semibold transition-all"
            >
              <span>Contact us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. NEWSLETTER SUBSCRIBE */}
      <section className="max-w-2xl mx-auto px-4 text-center py-12">
        <div className="text-[#C5A059] mb-2 text-xl">&hearts;</div>
        <h3 className="font-serif text-2xl font-bold text-[#8B0821]">Join the Airawati Family</h3>
        <p className="text-stone-500 text-xs mt-1">Get updates on new saree launches, artisan stories, and exclusive offers</p>
        <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to the Airawati Family! ✨"); }} className="mt-4 flex rounded-full overflow-hidden border border-[#C5A059]/40 bg-white p-1 shadow-sm">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 text-xs focus:outline-none bg-transparent"
          />
          <button type="submit" className="px-6 py-2.5 bg-[#8B0821] text-white text-xs font-semibold rounded-full hover:bg-[#6e061a] transition-colors">
            Subscribe
          </button>
        </form>
      </section>

    </div>
  );
}


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
    // image: '/images/category_saree_purple.png',
    image: '/img/sh-4.png',
    link: '/shop?category=maheshwari',
  },
  {
    id: 2,
    name: 'Banarasi Saree',
    image: '/img/sh-2.png',
    link: '/shop?category=maheshwari',
  },
  {
    id: 3,
    name: 'Chanderi Saree',
    image: '/img/sh-1.png',
    link: '/shop?category=maheshwari',
  },
  {
    id: 4,
    name: 'Kanjivaram Saree',
    image: '/img/sh-5.png',
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
                  // src="/images/category_arch_ornament.png"
                   src="/img/dh-1.png"
                  alt="Filigree Motif"
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

             {/* Arched Saree Model Card */}
              {/* <div className="w-full aspect-[3/4.8] rounded-t-full overflow-hidden bg-stone-50 shadow-xs group-hover:shadow-md transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div> */}


<div
  className="
    group relative w-full aspect-[3/4.8]
    rounded-t-full
    bg-[#FBF7F0]
    shadow-[0_4px_18px_rgba(92,19,41,0.10)]
    transition-all duration-500
    hover:shadow-[0_8px_24px_rgba(197,160,89,0.20)]
  "
>
  {/* IMAGE */}
  <div className="absolute inset-0 overflow-hidden rounded-t-full">
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      className="
        h-full w-full object-cover object-top
        transition-transform duration-700 ease-out
        group-hover:scale-105
      "
    />

    {/* Soft overlay */}
    <div
      className="
        pointer-events-none absolute inset-0
        bg-gradient-to-t
        from-[#5C1329]/10 via-transparent to-[#FFF5DE]/10
      "
    />
  </div>

  {/* OUTER GOLDEN BORDER */}
  <div
    className="
      pointer-events-none absolute -inset-[5px]
      rounded-t-full
      border-2 border-[#C5A059]
      transition-all duration-500
      group-hover:border-[#A87928]
    "
  />

  {/* INNER FINE GOLD LINE */}
  <div
    className="
      pointer-events-none absolute -inset-[2px]
      rounded-t-full
      border border-[#E8C374]/80
    "
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
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#C5A059] block mb-2">Featured Collection</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E060D]">
            Find the perfect Saree <span className="text-[#5C1329] italic font-normal">To match your mood</span>
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">
            From grand weddings to everyday elegance — discover handpicked sarees crafted for every celebration and moment.
          </p>
        </div> */}









       
{/* ================= FEATURED COLLECTION HEADING ================= */}
<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

  <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">

    {/* Eyebrow */}
    <p className="text-[9px] sm:text-[11px] uppercase font-semibold
      tracking-[0.3em] sm:tracking-[0.4em] text-[#A47A36] mb-3">
      Curated for Every Occasion
    </p>

    {/* Main Heading */}
    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl
      lg:text-6xl font-medium leading-tight tracking-tight text-[#5C1329]">
      Find Your Perfect Saree
      <span className="block italic font-normal text-[#B74747] mt-1">
        Match Your Mood
      </span>
    </h2>

    {/* Gold Decorative Divider */}
    <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5">
      <span className="w-9 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />
      <span className="text-[#C5A059] text-sm">✦</span>
      <span className="w-9 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#C5A059]" />
    </div>

    {/* Description */}
    <p className="max-w-xl mx-auto text-xs sm:text-sm
      leading-6 sm:leading-7 text-stone-600 font-light mt-4 px-2">
      Discover timeless sarees for every occasion, from everyday elegance to grand celebrations.
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
                <span>Wedding Vibes</span>
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
                  <span>Banarasi Cotton Silk Saree</span>
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
                <span>Chanderi Handloom Saree</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
{/* ================= NEW ARRIVALS SECTION ================= */}
<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

  {/* Section Heading */}
  <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">

    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="w-8 sm:w-12 h-px bg-[#C5A059]" />
      <span className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-[#A47A36]">
        New Arrivals
      </span>
      <span className="w-8 sm:w-12 h-px bg-[#C5A059]" />
    </div>

    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-[#3D0B1B]">
      Fresh From The Loom
      <span className="block italic font-normal text-[#8B3A50] mt-1">
        Crafted to Captivate
      </span>
    </h2>

    <p className="max-w-lg mx-auto mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-stone-600 font-light px-3">
      Discover our newest sarees, where timeless Indian artistry meets modern elegance.
    </p>

    <div className="mt-5 text-[#C5A059] text-sm">✦</div>
  </div>

  {/* Saree Product Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-7">
    {featuredSarees.map((saree) => (
      <SareeCard key={saree.id} product={saree} />
    ))}
  </div>

  {/* View All Button */}
  <div className="text-center mt-9 sm:mt-12">
    <Link
      to="/shop"
      className="group inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3 border border-[#5C1329] text-[#5C1329] rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#5C1329] hover:text-white"
    >
      Explore All Sarees
      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  </div>

</section>
{/* ================= END NEW ARRIVALS SECTION ================= */}




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
              src="/img/b-1.jpg"
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
              src="/img/b-2.jpg"
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
              src="/img/b-3.jpg"
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
              src="/img/b-4.jpg"
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
                  60 Years
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
                <span>View </span>
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
                  75 Years
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
                <span>View</span>
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
                  50 Years
                </span>
                <span className="text-stone-500 text-xs font-medium">Chanderi Handloom</span>
              </div>
              <p className="text-stone-600 text-xs mt-3 leading-relaxed">
                Known for sheer silk-cotton fabrics and delicate botanical motifs made with natural dyes.
              </p>
              <Link
                to="/artisans"
                className="mt-6 w-full bg-[#8B0821] hover:bg-[#6e061a] text-white py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>View </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR JOURNEY (Matching Figma Screenshot 3) */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Oval Portrait + Founding Vision */}
          {/* <div className="lg:col-span-6 space-y-6">
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
          </div>  */}

          {/* Right Column: Title + Paragraph + Arched Portrait */}
          {/* <div className="lg:col-span-6 space-y-6">
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
          </div> */}

        {/* </div> */}
      {/* </section> */}




{/* 7. OUR JOURNEY */}
{/* <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"> */}

    {/* LEFT COLUMN: First on laptop, second on mobile/tablet */}
    {/* <div className="lg:col-span-6 order-2 lg:order-1 space-y-6"> */}

      {/* Oval Portrait */}
      {/* <div className="w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4] rounded-[180px] sm:rounded-[220px] overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-[#FAF6F0] p-1.5">
        <img
          src="/images/journey_amber_saree.jpg"
          alt="Airawati Saree Heritage in Amber Chanderi Drape"
          className="w-full h-full object-cover object-top rounded-[175px] sm:rounded-[215px]"
        />
      </div> */}

      {/* Founding Vision */}
      {/* <div className="max-w-md mx-auto text-left">
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Airawati Fashion started with a simple vision to connect Indian
          artisans with modern women through authentic handloom sarees,
          rooted in tradition and crafted with care.
        </p>

        <Link
          to="/journey"
          className="inline-flex items-center gap-2 font-serif text-sm font-bold text-[#8B0821] hover:text-[#C5A059] border-b border-[#8B0821] pb-0.5 mt-3 transition-colors"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div> */}

    {/* RIGHT COLUMN: First on mobile/tablet */}
    {/* <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">

      {/* Title + Paragraph */}
      {/* <div>
        <div className="flex items-center gap-2 mb-2 text-[#C5A059]">
          <Sparkles className="w-5 h-5" />
          <span className="w-8 h-px bg-[#C5A059]"></span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E060D] mb-4">
          Our{" "}
          <span className="text-[#8B0821] font-normal italic">
            Journey
          </span>
        </h2>

        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Airawati Fashion is a modern handloom brand working directly
          with Indian artisans and weaving regions. We bring authentic,
          handcrafted sarees together on one platform, celebrating
          tradition, craftsmanship, and timeless elegance.
        </p>
      </div> */} 

      {/* Arched Portrait */}
      {/* <div className="w-full max-w-xs sm:max-w-sm mx-auto lg:ml-auto lg:mr-0 aspect-[3/4] rounded-t-full overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-[#FAF6F0] p-1">
        <img
          src="/images/journey_black_saree.jpg"
          alt="Airawati Journey Bride in Black Handloom Silk"
          className="w-full h-full object-cover object-top rounded-t-full"
        />
      </div>

    </div> */}
  {/* </div> */}
{/* </section> */}








{/* 7. OUR JOURNEY — FULLY RESPONSIVE */}

<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 overflow-hidden">

  {/* MAIN HEADING — ALWAYS FIRST ON MOBILE */}

  <div className="mb-8 sm:mb-10 lg:mb-12 text-center">

    <div className="flex items-center justify-center gap-2 mb-3 text-[#C5A059]">
      <Sparkles className="w-5 h-5" />
      <span className="w-8 h-px bg-[#C5A059]" />
    </div>

    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#1E060D]">
      Our{" "}
      <span className="text-[#8B0821] font-normal italic">
        Journey
      </span>
    </h2>

  </div>

  {/* RESPONSIVE TWO-COLUMN LAYOUT */}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

    {/* LEFT COLUMN — LARGE AMBER IMAGE */}

    <div className="flex flex-col items-center gap-5 sm:gap-7">

      {/* LARGE OVAL PORTRAIT */}

      <div className="relative w-[82%] max-w-[300px] sm:max-w-sm lg:max-w-md aspect-[3/4] rounded-[180px] sm:rounded-[220px] overflow-hidden border-2 border-[#C5A059]/50 shadow-xl bg-[#FAF6F0] p-1.5">

        <img
          src="/images/journey_amber_saree.jpg"
          alt="Airawati Saree Heritage in Amber Chanderi Drape"
          loading="lazy"
          className="w-full h-full object-cover object-top rounded-[175px] sm:rounded-[215px]"
        />

      </div>

      {/* FOUNDING VISION */}

      <div className="w-full max-w-md text-center lg:text-left">

        <p className="font-serif text-base sm:text-lg text-[#5C1329] mb-2">
          Rooted in Tradition
        </p>

        <p className="text-stone-600 text-sm sm:text-base leading-6 sm:leading-7">
          Airawati Fashion started with a simple vision to connect Indian
          artisans with modern women through authentic handloom sarees,
          rooted in tradition and crafted with care.
        </p>

        <Link
          to="/journey"
          className="inline-flex items-center justify-center gap-2 font-serif text-sm sm:text-base font-bold text-[#8B0821] hover:text-[#C5A059] border-b border-[#8B0821] pb-1 mt-4 transition-colors duration-300"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>

    </div>

    {/* RIGHT COLUMN — DESCRIPTION + SMALL BLACK IMAGE */}

    <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8">

      {/* JOURNEY DESCRIPTION */}

      <div className="w-full max-w-xl text-center lg:text-left">

        <p className="text-stone-600 text-sm sm:text-base leading-6 sm:leading-8">
          Airawati Fashion is a modern handloom brand working directly
          with Indian artisans and weaving regions. We bring authentic,
          handcrafted sarees together on one platform, celebrating
          tradition, craftsmanship, and timeless elegance.
        </p>

        <div className="w-14 h-px bg-[#C5A059] mx-auto lg:mx-0 mt-5" />

      </div>

      {/* SMALL ARCHED BLACK SAREE IMAGE */}

      <div className="relative w-[68%] max-w-[230px] sm:max-w-xs lg:max-w-sm aspect-[3/4] mx-auto lg:ml-auto lg:mr-0 rounded-t-full overflow-hidden border-2 border-[#C5A059]/50 shadow-xl bg-[#FAF6F0] p-1.5">

        <img
          src="/images/journey_black_saree.jpg"
          alt="Airawati Black Handloom Silk Saree"
          loading="lazy"
          className="w-full h-full object-cover object-top rounded-t-full"
        />

      </div>

    </div>

  </div>

</section>
















      {/* 8. TRUST PILLARS & TESTIMONIALS (Matching Figma Screenshot 4) */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6"> */}
        
        {/* 5 Trust Pillars Row */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center border-b border-[#C5A059]/20 pb-14">
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
        </div> */}






   

{/* 8. OUR TRUST PILLARS */}
<section className="relative overflow-hidden bg-[#FFFCF7] px-3 py-6 sm:px-6 sm:py-10 lg:px-4 lg:py-16">

  {/* Decorative Background */}
  <div className="pointer-events-none absolute -left-12 top-10 hidden h-40 w-40 rounded-full border border-[#C5A059]/10 sm:block sm:h-56 sm:w-56" />

  <div className="pointer-events-none absolute -right-12 top-10 hidden h-40 w-40 rounded-full border border-[#C5A059]/10 sm:block sm:h-56 sm:w-56" />

  <div className="relative mx-auto max-w-7xl">



{/* Section Heading - All Screen Sizes */}
<div className="mb-6 px-2 text-center sm:mb-8 md:mb-10 lg:mb-14">

  {/* Small Top Label */}
  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8B0821] sm:mb-3 sm:text-[10px] sm:tracking-[0.35em] md:text-xs md:tracking-[0.4em]">
    Why Choose Us
  </p>

  {/* Main Heading */}
  <h2 className="font-serif text-2xl font-medium leading-tight tracking-tight text-[#1E060D] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
    Our{" "}
    <span className="font-normal italic text-[#8B0821]">
      Trust
    </span>{" "}
    Pillars
  </h2>

  {/* Gold Divider */}
  <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4 sm:gap-3 md:mt-5">
    <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#C5A059] sm:w-10 md:w-14" />

    <span className="text-xs text-[#C5A059] sm:text-sm">
      ✦
    </span>

    <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#C5A059] sm:w-10 md:w-14" />
  </div>

</div>


    {/* Trust Pillars Grid */}
    <div className="grid grid-cols-5 items-center gap-2 sm:gap-5 lg:gap-3">

      {[
        {
          title: "Fast Shipping",
          description:
            "Quick and secure delivery across India and worldwide.",
          Icon: Truck,
        },
        {
          title: "Premium Quality",
          description:
            "Authentic handlooms crafted with the finest materials.",
          Icon: Award,
        },
        {
          title: "Best Price",
          description:
            "Timeless sarees at fair and transparent pricing.",
          Icon: Coins,
        },
        {
          title: "Exclusive Designs",
          description:
            "Unique handwoven collections you won't find anywhere else.",
          Icon: Sparkles,
        },
        {
          title: "Easy Returns & Exchange",
          description:
            "Hassle-free returns for a worry-free shopping experience.",
          Icon: RotateCcw,
        },
      ].map(({ title, description, Icon }) => (

        <div
          key={title}
          title={title}
          className="group flex min-w-0 flex-col items-center justify-center rounded-xl border border-transparent p-1.5 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#C5A059]/50 hover:bg-white hover:shadow-[0_15px_40px_rgba(139,8,33,0.08)] sm:p-3 lg:px-3 lg:py-7"
        >

          {/* Icon Circle - All Screens */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/70 bg-[#FAF6F0] text-[#8B0821] shadow-[0_4px_15px_rgba(197,160,89,0.12)] transition-all duration-500 group-hover:scale-110 group-hover:border-[#C5A059] group-hover:bg-[#8B0821] group-hover:text-[#FAF6F0] group-hover:shadow-[0_8px_22px_rgba(139,8,33,0.2)] sm:h-14 sm:w-14 lg:mb-5 lg:h-[68px] lg:w-[68px]">

            <Icon
              className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[-8deg] sm:h-6 sm:w-6 lg:h-8 lg:w-8"
              strokeWidth={1.7}
            />

          </div>

          {/* Gold Ornament - Desktop Only */}
          <span className="mb-3 mt-4 hidden text-xs text-[#C5A059] transition-transform duration-300 group-hover:scale-125 lg:block">
            ◆
          </span>

          {/* Title - Desktop Only */}
          <h3 className="mb-2 hidden font-serif text-lg font-semibold leading-snug text-[#1E060D] transition-colors duration-300 group-hover:text-[#8B0821] lg:block">
            {title}
          </h3>

          {/* Description - Desktop Only */}
          <p className="hidden max-w-[220px] text-center text-sm leading-relaxed text-stone-600 lg:block">
            {description}
          </p>

          {/* Bottom Hover Accent - Desktop Only */}
          <span className="mt-4 hidden h-px w-0 bg-[#C5A059] transition-all duration-500 group-hover:w-12 lg:block" />

        </div>

      ))}

    </div>
  </div>
</section>


      {/* 9. INSTAGRAM COMMUNITY FEED: @#AirawatiFashion (Matching Figma Screenshot Exactly)
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
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Card 1: Yellow saree model */}
          {/* <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_1.jpg"
              alt="Airawati Community - Yellow Handloom Saree"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div> */} 

          {/* Card 2: Traditional weavers at loom */}
          {/* <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_2.jpg"
              alt="Airawati Community - Traditional Loom Weaving"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div> */}

          {/* Card 3: Magenta silk saree with yellow zari */}
          {/* <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_3.jpg"
              alt="Airawati Community - Magenta and Gold Zari Saree"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div> */}

          {/* Card 4: Black printed saree kneeling model */}
          {/* <div className="aspect-square rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-[#FAF6F0]">
            <img
              src="/images/insta_feed_4.jpg"
              alt="Airawati Community - Royal Black Handcrafted Saree"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div> */}

        {/* Instagram Follow Button (Matching Figma Button) */}
        {/* <div className="mt-8">
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
      </section> */} 



















{/* 9. INSTAGRAM COMMUNITY FEED */}
<section className="relative overflow-hidden bg-[#FFFCF7] px-4 py-10 sm:px-6 sm:py-14 lg:py-16">

  <div className="mx-auto max-w-7xl text-center">

    {/* Decorative Heading */}
    <div className="mb-3 flex items-center justify-center gap-3 text-[#C5A059]">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C5A059]" />
      <Sparkles className="h-5 w-5" />
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C5A059]" />
    </div>

    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8B0821] sm:text-xs sm:tracking-[0.4em]">
      Join Our Community
    </p>

    {/* Instagram Heading */}
    <h2 className="mb-3 flex flex-wrap items-center justify-center gap-2 font-serif text-2xl font-semibold leading-tight text-[#8B0821] sm:gap-3 sm:text-4xl lg:text-5xl">
      <Instagram className="h-6 w-6 shrink-0 sm:h-9 sm:w-9" strokeWidth={1.7} />
      <span>#AirawatiFashion</span>
    </h2>

    <p className="mx-auto mb-8 max-w-md text-xs leading-relaxed text-stone-600 sm:mb-10 sm:text-sm">
      Celebrate timeless elegance and discover the beauty of Indian handloom craftsmanship.
    </p>

    {/* Instagram Images */}
    <div className="mx-auto grid max-w-4xl grid-cols-2 justify-items-center gap-3 sm:gap-5 md:grid-cols-4 md:gap-4">

      {[
        {
          src: "/images/insta_feed_1.jpg",
          alt: "Yellow Handloom Saree",
        },
        {
          src: "/images/insta_feed_2.jpg",
          alt: "Traditional Handloom Weaving",
        },
        {
          src: "/images/insta_feed_3.jpg",
          alt: "Magenta and Gold Zari Saree",
        },
        {
          src: "/images/insta_feed_4.jpg",
          alt: "Black Handcrafted Saree",
        },
      ].map((item) => (
        <a
          key={item.src}
          href="https://www.instagram.com/airawatifashions"
          target="_blank"
          rel="noreferrer"
          aria-label={`View Airawati Fashion on Instagram: ${item.alt}`}
          className="group w-full max-w-[190px] rounded-2xl border border-[#C5A059]/30 bg-white p-1 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A059] hover:shadow-[0_12px_28px_rgba(139,8,33,0.12)] sm:max-w-[220px] sm:rounded-3xl sm:p-1.5"
        >

          <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-[22px]">

            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#5C1329]/0 transition-colors duration-500 group-hover:bg-[#5C1329]/40">
              <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <Instagram className="h-5 w-5" />
              </div>
            </div>

          </div>

          {/* Gold Accent */}
          <div className="mx-auto mt-1.5 h-0.5 w-0 rounded-full bg-[#C5A059] transition-all duration-500 group-hover:w-1/3 sm:mt-2" />

        </a>
      ))}

    </div>

    {/* Instagram Follow Button */}
    <div className="mt-8 sm:mt-10">

      <a
        href="https://www.instagram.com/airawatifashions"
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#8B0821] bg-[#8B0821] px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C5A059] hover:bg-[#6E061A] hover:shadow-lg sm:px-7 sm:py-3 sm:text-sm"
      >
        <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-8deg]" />
        <span>Follow @airawatifashions</span>
        <span className="text-[#E7C98A] transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>

      <p className="mt-4 font-serif text-xs italic text-stone-500 sm:text-sm">
        Woven with tradition. Styled by you.
      </p>

    </div>

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


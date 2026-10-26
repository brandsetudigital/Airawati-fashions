import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Our Story", to: "/journey" },
  { label: "Shop Sarees", to: "/shop" },
  { label: "Boutique Blouses", to: "/boutique" },
  { label: "Temple Accessories", to: "/accessories" },
  { label: "Artisans", to: "/artisans" },
  { label: "Contact Us", to: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/Airawati-fashions-61579817516749/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/airawatifashions/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=918982065895",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.52 3.48A11.87 11.87 0 0012.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.16 1.6 5.98L.06 24l6.28-1.65a11.9 11.9 0 005.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.43-8.42zM12.05 21.8a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.73.98.99-3.64-.24-.38a9.86 9.86 0 01-1.51-5.27c0-5.46 4.44-9.9 9.9-9.9a9.82 9.82 0 017 2.9 9.84 9.84 0 012.9 7c0 5.46-4.44 9.9-9.9 9.9zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 bg-[#1E060D] text-[#FAF6F0] border-t border-[#C5A059]/30">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">

          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-5">
            <Link
              to="/"
              title="Airawati - Every handwoven saree, one home"
              className="inline-flex max-w-full items-center mb-5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C5A059]"
            >
              <img
                src="/images/airawati_logo_gold.png"
                alt="Airawati"
                className="block h-auto w-40 max-w-full object-contain sm:w-44 md:w-48 lg:w-52"
                loading="lazy"
              />
            </Link>

            <p className="max-w-md text-sm leading-7 text-stone-300">
              Celebrating India's handloom heritage through authentic,
              masterfully woven creations. Each piece tells a story of
              tradition, craftsmanship, and timeless beauty.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Airawati on ${social.label}`}
                  title={social.label}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/40 text-[#C5A059] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C5A059] hover:text-[#1E060D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="min-w-0 lg:col-span-3">
            <h2 className="mb-5 font-serif text-lg font-semibold tracking-wide text-[#C5A059]">
              Explore Airawati
            </h2>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-1">
              {footerLinks.map((item) => (
                <li key={item.to} className="min-w-0">
                  <Link
                    to={item.to}
                    className="inline-block break-words text-stone-300 transition-colors duration-200 hover:text-[#C5A059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C5A059]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0 lg:col-span-4">
            <h2 className="mb-5 font-serif text-lg font-semibold tracking-wide text-[#C5A059]">
              Contact & Atelier
            </h2>

            <div className="space-y-4 text-sm leading-6 text-stone-300">
              <p>
                <span className="block font-medium text-[#FAF6F0]">
                  Maheshwar Loom Center
                </span>
                Madhya Pradesh, India
              </p>

              <p>
                <span className="block font-medium text-[#FAF6F0]">
                  Flagship Lounge
                </span>
                Malabar Hill, Mumbai
              </p>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex flex-wrap items-start gap-x-2">
                  <span className="shrink-0 text-stone-400">Phone:</span>
                  <a
                    href="tel:+918982065895"
                    className="min-w-0 break-all transition-colors hover:text-[#C5A059]"
                  >
                    +91 8982065895
                  </a>
                </div>

                {/* <div className="flex flex-wrap items-start gap-x-2">
                  <span className="shrink-0 text-stone-400">WhatsApp:</span>
                  <a
                    href="https://api.whatsapp.com/send?phone=918982065895"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 break-all text-[#C5A059] transition-colors hover:underline"
                  >
                    +91 8982065895
                  </a>
                </div> */}

                <div className="flex flex-wrap items-start gap-x-2">
                  <span className="shrink-0 text-stone-400">Email:</span>
                  <a
                    href="mailto:airawatifashions@gmail.com"
                    className="min-w-0 break-all transition-colors hover:text-[#C5A059]"
                  >
                    airawatifashions@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="mt-10 border-t border-[#C5A059]/20 pt-6 sm:mt-12">
          <div className="flex flex-col gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs leading-5 text-stone-400">
              © {new Date().getFullYear()} Airawati Fashion. All rights reserved.
            </p>

            <nav
              aria-label="Footer legal navigation"
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs sm:justify-end"
            >
              <Link
                to="/privacy-policy"
                className="text-stone-400 transition-colors hover:text-[#C5A059]"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-stone-400 transition-colors hover:text-[#C5A059]"
              >
                Terms &amp; Conditions
              </Link>

              <Link
                to="/admin"
                className="font-medium text-stone-400 transition-colors hover:text-[#C5A059]"
              >
                Admin Console
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
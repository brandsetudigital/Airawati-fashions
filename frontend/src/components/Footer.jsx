// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1E060D] text-[#FAF6F0] border-t border-[#C5A059]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        
        {/**/}
        <div>
          <Link to="/" className="inline-block mb-4 group" title="Airawati - Every handwoven saree, one home">
            <img 
              src="/images/airawati_logo_gold.png" 
              alt="Airawati" 
              className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>
          <p className="text-stone-300 leading-relaxed text-xs">
            Celebrating India's handloom heritage through authentic, masterfully woven creations. Each piece tells a story of tradition, craftsmanship, and timeless beauty.
          </p>
          <div className="flex items-center space-x-3.5 mt-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/p/Airawati-fashions-61579817516749/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all shadow-xs"
              title="Airawati on Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/airawatifashions"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white transition-all shadow-xs"
              title="Airawati on Instagram (@airawatifashions)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* WhatsApp (Replacing LinkedIn) */}
            <a
              href="https://api.whatsapp.com/send?phone=%2B918982065895"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all shadow-xs"
              title="Chat with Airawati on WhatsApp (+91 8982065895)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>

        {/**/}
        <div>
          <h4 className="font-serif text-lg font-bold text-[#C5A059] mb-4">About Airawati</h4>
          <ul className="space-y-2 text-xs text-stone-300">
            <li><Link to="/journey" className="hover:text-[#C5A059] transition-colors">Our Story</Link></li>
            <li><Link to="/shop" className="hover:text-[#C5A059] transition-colors">Shop Sarees</Link></li>
            <li><Link to="/boutique" className="hover:text-[#C5A059] transition-colors">Boutique Blouses</Link></li>
            <li><Link to="/accessories" className="hover:text-[#C5A059] transition-colors">Temple Accessories</Link></li>
            <li><Link to="/artisans" className="hover:text-[#C5A059] transition-colors">Artisans</Link></li>
            <li><Link to="/contact" className="hover:text-[#C5A059] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/**/}
        <div>
          <h4 className="font-serif text-lg font-bold text-[#C5A059] mb-4">Contact & Atelier</h4>
          <div className="text-stone-300 text-xs leading-relaxed space-y-2">
            <p>
              Maheshwar Loom Center, Madhya Pradesh<br />
              Flagship Lounge: Malabar Hill, Mumbai
            </p>
            <div className="pt-1 space-y-1">
              <p>
                <span className="text-stone-400">Phone:</span>{' '}
                <a href="tel:+918982065895" className="text-[#FAF6F0] hover:text-[#C5A059] font-medium transition-colors">
                  +91 8982065895
                </a>
              </p>
              <p>
                <span className="text-stone-400">WhatsApp:</span>{' '}
                <a
                  href="https://api.whatsapp.com/send?phone=%2B918982065895"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#25D366] hover:underline font-medium transition-colors"
                >
                  +91 8982065895
                </a>
              </p>
              <p>
                <span className="text-stone-400">Email:</span>{' '}
                <a href="mailto:airawatifashions@gmail.com" className="text-[#FAF6F0] hover:text-[#C5A059] font-medium transition-colors">
                  airawatifashions@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/**/}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-[11px] text-stone-400">
        <p>&copy; Airawati Fashion. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 items-center">
          <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#C5A059] transition-colors">Terms &amp; Conditions</a>
          <Link to="/admin" className="hover:text-[#C5A059] text-stone-400 font-medium transition-colors">Admin Console</Link>
        </div>
      </div>
    </footer>
  );
}

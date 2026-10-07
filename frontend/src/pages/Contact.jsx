// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Contact() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Handloom Saree Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      showToast('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to our royal concierge! 💌');
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1E060D] pb-16">
      {/* 1. HERO BANNER - Exact Design Matching User Reference Image */}
      <section className="relative w-full bg-[#FAF5F0] border-b border-[#C5A059]/20 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-3 sm:px-6">
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#C5A059]/30 min-h-[360px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/contact_hero_bg_clean.png')",
              backgroundColor: '#F8EFCE'
            }}
          >
            {/* Center Content Matching User Reference Typography */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto py-8">
              {/* Heading: Contact Us with authentic luxury gradient */}
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-center leading-tight">
                <span className="bg-gradient-to-r from-[#7A212F] via-[#9B2A32] to-[#C23729] bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[#8C6863] text-xs sm:text-sm md:text-base font-light tracking-wide mt-3 sm:mt-4 max-w-md mx-auto text-center leading-relaxed">
                We're here to help you discover the perfect handwoven saree
              </p>

              {/* Action Button: Meet Our Artisans -> */}
              <div className="mt-5 sm:mt-7">
                <Link
                  to="/artisans"
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-[#8B2F2F] hover:bg-[#722323] text-white rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <span>Meet Our Artisans</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#C5A059]/20 hover:border-[#C5A059] transition-all text-center group">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-4 text-[#5C1329] group-hover:bg-[#5C1329] group-hover:text-[#C5A059] transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#5C1329] mb-1">Direct Call & WhatsApp</h3>
            <p className="text-xs text-stone-600 mb-2">Mon - Sat: 10:00 AM – 8:00 PM IST</p>
            <a href="tel:+918982065895" className="text-xs font-semibold text-[#5C1329] hover:text-[#C5A059] transition-colors block">
              +91 8982065895
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=%2B918982065895"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-[#25D366] hover:underline font-semibold block mt-1"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#C5A059]/20 hover:border-[#C5A059] transition-all text-center group">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-4 text-[#5C1329] group-hover:bg-[#5C1329] group-hover:text-[#C5A059] transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#5C1329] mb-1">Email Concierge</h3>
            <p className="text-xs text-stone-600 mb-2">Typically replies within 2 hours</p>
            <a href="mailto:airawatifashions@gmail.com" className="text-xs font-semibold text-[#5C1329] hover:text-[#C5A059] transition-colors block">
              airawatifashions@gmail.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#C5A059]/20 hover:border-[#C5A059] transition-all text-center group">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-4 text-[#5C1329] group-hover:bg-[#5C1329] group-hover:text-[#C5A059] transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#5C1329] mb-1">Boutique Atelier</h3>
            <p className="text-xs text-stone-600 mb-2">Maheshwar & Malabar Hill, Mumbai</p>
            <span className="text-xs text-[#5C1329] font-medium">By Prior Appointment</span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#C5A059]/20 hover:border-[#C5A059] transition-all text-center group">
            <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059]/40 flex items-center justify-center mx-auto mb-4 text-[#5C1329] group-hover:bg-[#5C1329] group-hover:text-[#C5A059] transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-semibold text-[#5C1329] mb-1">Virtual Video Tour</h3>
            <p className="text-xs text-stone-600 mb-2">See drape and zari in high resolution</p>
            <a
              href="https://api.whatsapp.com/send?phone=%2B918982065895"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#5C1329] hover:text-[#C5A059] transition-colors block"
            >
              Book Video Call (WhatsApp) &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 3. INQUIRY FORM & HERITAGE WEAVING ATELIER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-[#C5A059]/20">
            <div className="mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#5C1329] font-normal mb-2">Send an Inquiry</h2>
              <p className="text-xs text-stone-600">Please provide your details below and our handloom specialist will respond promptly.</p>
            </div>

            {submitted ? (
              <div className="text-center py-12 px-6 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30">
                <CheckCircle2 className="w-14 h-14 text-emerald-700 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-[#5C1329] mb-2">Dhanyavaad!</h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6">
                  Thank you for reaching out, {formData.fullName}. Your royal concierge inquiry has been assigned to our master styling team. We will respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: '', email: '', phone: '', subject: 'Handloom Saree Inquiry', message: '' });
                  }}
                  className="bg-[#5C1329] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold px-6 py-2.5 rounded hover:bg-[#430D1E] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditi Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="aditi@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number (with WhatsApp)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 8982065895"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs px-4 py-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                    >
                      <option value="Handloom Saree Inquiry">Handloom Saree Inquiry</option>
                      <option value="Boutique Blouse Customization">Boutique Blouse Customization</option>
                      <option value="Bridal Trousseau Curation">Bridal Trousseau Curation</option>
                      <option value="Order Status & Delivery">Order Status & Delivery</option>
                      <option value="Artisan Partnership / Bulk Inquiry">Artisan Partnership / Bulk Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Message / Custom Requirement *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about the drape you love, specific colors, blouse necklines, or wedding occasion date..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs px-4 py-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5C1329] text-[#FAF6F0] py-3.5 rounded text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#430D1E] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4 text-[#C5A059]" />
                  <span>Send Royal Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Heritage & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF6F0] p-8 rounded-xl border border-[#C5A059]/30">
              <h3 className="font-serif text-2xl text-[#5C1329] mb-4">The Airawati Atelier</h3>
              <p className="text-xs text-stone-700 leading-relaxed mb-6">
                Our main weaving cluster resides on the sacred banks of the Narmada in Maheshwar, Madhya Pradesh. Here, fourth-generation master weavers weave every single yard on traditional wooden pit looms with vegetable-dyed silk threads and pure zari.
              </p>

              <div className="space-y-3.5 text-xs text-stone-700 border-t border-[#C5A059]/20 pt-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span><strong>Maheshwar Loom Center:</strong> Fort Road, Near Ahilya Ghat, Maheshwar, MP 451224</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span><strong>Flagship Experience Lounge:</strong> Level 3, Heritage Wing, Malabar Hill, Mumbai 400006</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span><strong>Visiting Hours:</strong> Tuesday – Sunday, 11:00 AM – 7:30 PM (Closed Mondays)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#5C1329] text-white p-6 rounded-xl border border-[#C5A059]/40 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-6 translate-y-6">
                <ShieldCheck className="w-40 h-40 text-[#C5A059]" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#FAF6F0] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                Direct Artisan Guarantee
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                By purchasing through Airawati, 100% of weaving honorariums go directly to the weaving families with complete traceability and zero middlemen.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

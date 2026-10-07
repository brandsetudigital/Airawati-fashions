// frontend/src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, LogOut, ChevronDown, Package, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, isLoggedIn, currentUser, logout } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Boutique', path: '/boutique' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Artisans', path: '/artisans' },
    { name: 'Our Journey', path: '/journey' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownNavigate = (tab) => {
    setUserDropdownOpen(false);
    navigate(`/account?tab=${tab}`, { state: { tab, timestamp: Date.now() } });
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    logout();
    navigate('/signin');
  };

  return (
    <>
      <header className="bg-[#5C1329] text-[#FAF6F0] text-[9px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-4 text-center tracking-wider sm:tracking-widest uppercase border-b border-[#C5A059]/30 leading-tight">
        <p>Handcrafted In India &bull; Complimentary Worldwide Shipping On Orders Over &dollar;200 &bull; 100% Authentic Handloom Certified</p>
      </header>

      <nav className="bg-[#FAF6F0]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#C5A059]/20 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#5C1329] hover:text-[#C5A059] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="flex items-center group py-0.5" title="Airawati - Every handwoven saree, one home">
            <img 
              src="/images/airawati_logo.png" 
              alt="Airawati" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-[#5C1329] border-b-2 border-[#5C1329]'
                      : 'text-stone-700 hover:text-[#5C1329]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-5">
            <button
              onClick={() => {
                const q = prompt("Search Airawati collection (e.g. Maheshwari, Banarasi, Chanderi):");
                if (q) window.location.href = `/shop?search=${encodeURIComponent(q)}`;
              }}
              className="text-stone-700 hover:text-[#5C1329] transition-colors p-1"
              title="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-stone-700 hover:text-[#5C1329] transition-colors p-1"
              title="Saved Sarees"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* USER / AUTH MENU WITH DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 text-stone-700 hover:text-[#5C1329] transition-colors p-1 rounded-full group"
                    title="Account Menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#5C1329]/10 text-[#5C1329] flex items-center justify-center border border-[#5C1329]/20 font-bold text-xs group-hover:bg-[#5C1329] group-hover:text-white transition-all">
                      {currentUser?.name?.charAt(0) || 'A'}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#5C1329]" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="text-stone-700 hover:text-[#5C1329] transition-colors p-1"
                  title="Sign In / Account"
                >
                  <User className="w-5 h-5 stroke-[1.8]" />
                </Link>
              )}

              {/* DROPDOWN MENU FOR LOGGED IN USER */}
              {isLoggedIn && userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2.5 border-b border-stone-100">
                    <p className="text-xs font-bold text-[#4A151B] truncate">{currentUser?.name || 'Customer'}</p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser?.email || ''}</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleDropdownNavigate('profile')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF6F0] hover:text-[#5C1329] transition-colors cursor-pointer text-left"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDropdownNavigate('orders')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF6F0] hover:text-[#5C1329] transition-colors cursor-pointer text-left"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>My Orders</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDropdownNavigate('addresses')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF6F0] hover:text-[#5C1329] transition-colors cursor-pointer text-left"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Saved Addresses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDropdownNavigate('wishlist')}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF6F0] hover:text-[#5C1329] transition-colors cursor-pointer text-left"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Wishlist</span>
                  </button>

                  <div className="border-t border-stone-100 my-1"></div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-medium cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#5C1329] hover:text-[#C5A059] transition-colors p-1"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5C1329] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF6F0] border-t border-[#C5A059]/20 px-4 sm:px-6 py-5 space-y-4 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* User status card on mobile */}
            {isLoggedIn ? (
              <div className="p-3.5 bg-white rounded-xl border border-[#C5A059]/25 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#5C1329] text-white flex items-center justify-center font-bold text-xs">
                    {currentUser?.name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#4A151B]">{currentUser?.name || 'Customer'}</p>
                    <p className="text-[10px] text-stone-500">{currentUser?.email || ''}</p>
                  </div>
                </div>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 bg-[#5C1329] text-white rounded-lg text-[11px] font-semibold"
                >
                  Dashboard
                </Link>
              </div>
            ) : null}

            {/* Quick Departments Pills */}
            <div className="pt-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A87B28] block mb-2">Departments</span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-white rounded-xl border border-[#F0D5DA] text-stone-800 hover:border-[#5C1329] flex items-center gap-2 text-xs font-semibold"
                >
                  <span>🥻</span>
                  <span>Pure Sarees</span>
                </Link>
                <Link
                  to="/boutique"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-white rounded-xl border border-[#F0D5DA] text-stone-800 hover:border-[#5C1329] flex items-center gap-2 text-xs font-semibold"
                >
                  <span>✂️</span>
                  <span>Boutique Blouse</span>
                </Link>
                <Link
                  to="/accessories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-white rounded-xl border border-[#F0D5DA] text-stone-800 hover:border-[#5C1329] flex items-center gap-2 text-xs font-semibold"
                >
                  <span>💎</span>
                  <span>Jewellery</span>
                </Link>
                <Link
                  to="/account?tab=orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 bg-white rounded-xl border border-[#F0D5DA] text-stone-800 hover:border-[#5C1329] flex items-center gap-2 text-xs font-semibold"
                >
                  <span>📦</span>
                  <span>Track Orders</span>
                </Link>
              </div>
            </div>

            {/* Standard Nav Links */}
            <div className="pt-2 border-t border-stone-200/80 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 block mb-1">Navigation</span>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-xs sm:text-sm font-semibold tracking-wider py-2 px-2.5 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-[#5C1329]/10 text-[#5C1329] font-bold'
                      : 'text-stone-800 hover:text-[#5C1329]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Account Actions */}
            <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-2.5">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 bg-[#5C1329] text-white rounded-xl text-xs font-semibold"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-2.5 border border-red-500 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 bg-[#5C1329] text-white rounded-xl text-xs font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 border border-[#5C1329] text-[#5C1329] rounded-xl text-xs font-semibold hover:bg-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

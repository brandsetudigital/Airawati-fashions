// frontend/src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  Scissors,
  ChevronRight, 
  User, 
  LogOut, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminProfile, adminLogout, adminNotification } = useAdmin();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Active path checking
  const currentPath = location.pathname;

  const topNavTabs = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Products', path: '/admin/products' },
    { name: 'Consultations', path: '/admin/consultations' },
    { name: 'Customers', path: '/admin/customers' },
    { name: 'Reports', path: '/admin/reports' }
  ];

  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home, hasArrow: false },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag, hasArrow: true },
    { name: 'Products', path: '/admin/products', icon: Package, hasArrow: true },
    { name: 'Consultations', path: '/admin/consultations', icon: Scissors, hasArrow: true },
    { name: 'Customers', path: '/admin/customers', icon: Users, hasArrow: true },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3, hasArrow: false }
  ];

  const isTabActive = (path) => {
    if (path === '/admin/dashboard' && (currentPath === '/admin' || currentPath === '/admin/dashboard')) return true;
    return currentPath.startsWith(path);
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="flex-1 flex flex-col min-h-[75vh] bg-[#FDF8F7] text-stone-900 font-sans selection:bg-[#5C1329] selection:text-white">
      {/* Toast Notification */}
      {adminNotification && (
        <div className="fixed top-20 right-6 z-50 bg-[#5C1329] text-white px-5 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-slideDown">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
          <span>{adminNotification}</span>
        </div>
      )}

      {/* TOP HEADER (Matching Figma Screenshots) */}
      <header className="bg-white border-b border-[#F0D5DA] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 text-[#5C1329] hover:bg-[#F9ECEF] rounded-md transition-colors"
              title="Toggle Menu"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/admin/dashboard" className="flex items-center group py-0.5" title="Airawati Admin Console">
              <img 
                src="/images/airawati_logo.png" 
                alt="Airawati" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* Center: Top Navigation Tabs (Figma Header) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {topNavTabs.map((tab) => {
              const active = isTabActive(tab.path);
              return (
                <Link
                  key={tab.name}
                  to={tab.path}
                  className={`py-2 transition-all relative ${
                    active
                      ? 'text-[#5C1329] font-bold border-b-2 border-[#5C1329]'
                      : 'text-stone-600 hover:text-[#5C1329]'
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Admin User Avatar & Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:ring-2 hover:ring-[#C5A059]/40 transition-all"
              title="Admin Account"
            >
              <div className="w-9 h-9 rounded-full bg-[#5C1329] text-white flex items-center justify-center overflow-hidden border border-[#C5A059]/50 shadow-xs">
                {adminProfile?.avatar ? (
                  <img 
                    src={adminProfile.avatar} 
                    alt={adminProfile.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50 text-xs animate-fadeIn">
                <div className="px-4 py-2.5 border-b border-stone-100">
                  <p className="font-bold text-stone-900">{adminProfile?.name || 'Admin User'}</p>
                  <p className="text-stone-500 truncate text-[11px]">{adminProfile?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F9ECEF] text-[#5C1329]">
                    {adminProfile?.role || 'Administrator'}
                  </span>
                </div>

                <Link
                  to="/admin/account"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:bg-[#FDF8F7] hover:text-[#5C1329] transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Account</span>
                </Link>

                <Link
                  to="/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:bg-[#FDF8F7] hover:text-[#5C1329] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Visit Storefront</span>
                </Link>

                <div className="border-t border-stone-100 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-left transition-colors font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY WITH SIDEBAR & MAIN CONTENT */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* LEFT SIDEBAR (Desktop) */}
        <aside className="hidden lg:block w-56 bg-[#F9ECEF] border-r border-[#F0D5DA] p-4 shrink-0">
          <div className="space-y-1.5 sticky top-20">
            {sidebarLinks.map((item) => {
              const active = isTabActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-[#5C1329] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-white/70 hover:text-[#5C1329]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#5C1329]'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.hasArrow && (
                    <ChevronRight className={`w-3.5 h-3.5 ${active ? 'text-white/80' : 'text-stone-400'}`} />
                  )}
                </Link>
              );
            })}

            <div className="pt-6 mt-6 border-t border-[#F0D5DA]">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-stone-600 hover:text-[#5C1329] text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Customer Store</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs" 
              onClick={() => setMobileSidebarOpen(false)} 
            />
            <div className="relative w-64 bg-[#F9ECEF] border-r border-[#F0D5DA] p-5 flex flex-col justify-between z-10 animate-slideRight">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0D5DA]">
                  <span className="font-serif font-bold text-sm text-[#5C1329]">Airawati Console</span>
                  <button 
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-stone-600 hover:text-[#5C1329]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {sidebarLinks.map((item) => {
                  const active = isTabActive(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                        active
                          ? 'bg-[#5C1329] text-white'
                          : 'text-stone-700 hover:bg-white/70 hover:text-[#5C1329]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#5C1329]'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.hasArrow && <ChevronRight className="w-3.5 h-3.5" />}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#F0D5DA]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN VIEWPORT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

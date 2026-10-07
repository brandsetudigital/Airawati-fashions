// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';
import { useCart } from './context/CartContext';
import { useAdmin } from './context/AdminContext';

// Customer Store Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Boutique from './pages/Boutique';
import Accessories from './pages/Accessories';
import Artisans from './pages/Artisans';
import OurJourney from './pages/OurJourney';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirm from './pages/OrderConfirm';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyCode from './pages/VerifyCode';

// Admin Panel Pages (Matching Figma Screenshots)
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReports from './pages/admin/AdminReports';
import AdminAccount from './pages/admin/AdminAccount';
import AdminProductDetail from './pages/admin/AdminProductDetail';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminConsultations from './pages/admin/AdminConsultations';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route for Admin Console
function AdminProtectedRoute({ children }) {
  const { isAdminLoggedIn } = useAdmin();
  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }
  return children;
}

export default function App() {
  const { toastMessage } = useCart();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] selection:bg-[#5C1329] selection:text-white">
      <ScrollToTop />

      {/* Global Toast Notification for Storefront */}
      {!isAdminRoute && toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#1E060D] text-[#FAF6F0] px-5 py-3 rounded-lg shadow-2xl border border-[#C5A059] text-xs font-medium animate-slideUp flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Floating WhatsApp Button (Storefront only) */}
      {!isAdminRoute && (
        <a
          href="https://api.whatsapp.com/send?phone=%2B918982065895"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
          title="Chat on WhatsApp (+91 8982065895)"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold text-white">
            WhatsApp Us
          </span>
        </a>
      )}

      {/* Storefront Navigation Header (Hidden on Admin routes) */}
      {!isAdminRoute && <Navbar />}

      {/* Slide-out Drawers & Modals (Storefront only) */}
      {!isAdminRoute && (
        <>
          <CartDrawer />
          <WishlistDrawer />
          <AuthModal />
        </>
      )}

      {/* Main Page Routes */}
      <main className="flex-1">
        <Routes>
          {/* Customer Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/journey" element={<OurJourney />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/verify-otp" element={<VerifyCode />} />

          {/* Admin Panel Routes (Matching Screenshots) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />
          <Route path="/admin/products" element={<AdminProtectedRoute><AdminProducts /></AdminProtectedRoute>} />
          <Route path="/admin/products/add" element={<AdminProtectedRoute><AdminProductForm /></AdminProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<AdminProtectedRoute><AdminProductForm /></AdminProtectedRoute>} />
          <Route path="/admin/products/:id" element={<AdminProtectedRoute><AdminProductDetail /></AdminProtectedRoute>} />
          <Route path="/admin/consultations" element={<AdminProtectedRoute><AdminConsultations /></AdminProtectedRoute>} />
          <Route path="/admin/boutique" element={<AdminProtectedRoute><AdminConsultations /></AdminProtectedRoute>} />
          <Route path="/admin/customers" element={<AdminProtectedRoute><AdminCustomers /></AdminProtectedRoute>} />
          <Route path="/admin/reports" element={<AdminProtectedRoute><AdminReports /></AdminProtectedRoute>} />
          <Route path="/admin/account" element={<AdminProtectedRoute><AdminAccount /></AdminProtectedRoute>} />
          <Route path="/admin/profile" element={<AdminProtectedRoute><AdminAccount /></AdminProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Royal Footer (Visible on all pages including Admin Panel) */}
      <Footer />
    </div>
  );
}

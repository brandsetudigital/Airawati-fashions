// frontend/src/pages/Account.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, FileText, Clock, Heart, User, LogOut,
  Phone, Mail, Edit3, Trash2, ShoppingCart, Check, Truck, Package, Home as HomeIcon,
  X, Camera, AlertCircle
} from 'lucide-react';
import { INITIAL_USER, INITIAL_ORDERS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import api from '../services/api';

export default function Account() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart, showToast, isLoggedIn, logout, currentUser, login } = useCart();

  const tabParam = searchParams.get('tab') || (location.state?.tab === 'address' ? 'addresses' : location.state?.tab) || 'orders';
  const viewOrderParam = searchParams.get('viewOrder');

  const [activeTab, setActiveTab] = useState(tabParam);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSubView, setOrderSubView] = useState('track'); // 'details' | 'track' | 'cancelled'
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Other');
  const [cancelNote, setCancelNote] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // User Profile State derived from logged-in customer
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('airawati_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: currentUser?.name || 'Customer',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      avatar: '/images/hero_model.jpg'
    };
  });

  useEffect(() => {
    if (currentUser) {
      setUserProfile((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone !== undefined ? currentUser.phone : prev.phone
      }));
    }
  }, [currentUser]);

  // Fetch live profile and addresses from backend
  useEffect(() => {
    if (isLoggedIn) {
      api.auth.getProfile()
        .then((res) => {
          if (res && res.user) {
            setUserProfile((prev) => ({
              ...prev,
              name: res.user.name || prev.name,
              email: res.user.email || prev.email,
              phone: res.user.phone !== undefined ? res.user.phone : prev.phone
            }));
            if (res.user.addresses && Array.isArray(res.user.addresses) && res.user.addresses.length > 0) {
              const mapped = res.user.addresses.map((a, idx) => ({
                id: a._id || `addr-${idx}`,
                title: a.label || 'Home',
                fullName: res.user.name || 'Customer',
                phone: a.phone || res.user.phone || '',
                additionalInfo: '',
                address: a.street || '',
                locality: '',
                city: a.city || '',
                state: a.state || '',
                postalCode: a.pincode || '',
                isDefault: a.isDefault || idx === 0
              }));
              setAddresses(mapped);
            } else {
              setAddresses([]);
            }
          }
        })
        .catch(() => {});
    }
  }, [isLoggedIn]);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: ''
  });

  // Orders State (fetched live from MongoDB for logged-in user)
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoadingOrders(true);
      api.orders.getMyOrders()
        .then((res) => {
          if (res && res.orders) {
            const formatted = res.orders.map((o) => ({
              id: o._id || o.orderNumber,
              orderNumber: o.orderNumber,
              customerName: o.customerName || '',
              customerEmail: o.customerEmail || '',
              customerPhone: o.customerPhone || '',
              placedDate: o.orderDateFormatted || (o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'),
              status: (o.orderStatus || 'CONFIRMED').toUpperCase(),
              statusLabel: o.orderStatus || 'Confirmed',
              totalAmount: o.totalAmount,
              shippingAddressRaw: o.shippingAddress || null,
              shippingAddress: o.shippingAddress ? `${o.shippingAddress.street || ''}, ${o.shippingAddress.city || ''}, ${o.shippingAddress.state || ''} ${o.shippingAddress.pincode || ''}`.replace(/^[,\s]+|[,\s]+$/g, '') : 'India',
              paymentMethod: o.paymentMethod || 'Online / UPI',
              contact: o.customerPhone || o.shippingAddress?.phone || '',
              items: (o.items || []).map((it) => ({
                id: it.product || it._id || 'item-0',
                title: it.shortTitle || it.title,
                fabric: it.fabric || 'Pure Silk Handloom',
                price: it.price,
                quantity: it.quantity || 1,
                image: it.image
              }))
            }));
            setOrders(formatted);
          } else {
            setOrders([]);
          }
        })
        .catch((err) => {
          console.warn('Orders fetch notice:', err.message);
          setOrders([]);
        })
        .finally(() => {
          setIsLoadingOrders(false);
        });
    } else {
      setOrders([]);
    }
  }, [isLoggedIn, currentUser?.email]);

  // Addresses State (Empty for new user until added)
  const [addresses, setAddresses] = useState(() => {
    if (currentUser?.addresses && Array.isArray(currentUser.addresses) && currentUser.addresses.length > 0) {
      return currentUser.addresses.map((a, idx) => ({
        id: a._id || `addr-${idx}`,
        title: a.label || 'Home',
        fullName: currentUser.name || 'Customer',
        phone: a.phone || currentUser.phone || '',
        additionalInfo: '',
        address: a.street || '',
        locality: '',
        city: a.city || '',
        state: a.state || '',
        postalCode: a.pincode || '',
        isDefault: a.isDefault || idx === 0
      }));
    }
    return [];
  });

  // Address Form State
  const [addressForm, setAddressForm] = useState({
    title: 'Home',
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    additionalInfo: '',
    address: '',
    city: '',
    postalCode: ''
  });

  // Centralized tab switcher keeping URL and subviews in sync
  const switchTab = (tab) => {
    const targetTab = tab === 'address' ? 'addresses' : tab;
    setActiveTab(targetTab);
    setSelectedOrder(null);
    setIsEditingAddress(false);
    navigate(`/account?tab=${targetTab}`, { replace: true, state: { tab: targetTab, timestamp: Date.now() } });
  };

  // Handle URL params and search query changes dynamically
  useEffect(() => {
    const rawTab = searchParams.get('tab') || location.state?.tab;
    const requestedTab = rawTab === 'address' ? 'addresses' : (rawTab || 'orders');
    if (requestedTab) {
      setActiveTab(requestedTab);
      setSelectedOrder(null);
      setIsEditingAddress(false);
    }
    if (viewOrderParam) {
      const found = orders.find((o) => o.orderNumber === viewOrderParam);
      if (found) {
        setSelectedOrder(found);
        setOrderSubView('track');
      } else if (orders.length > 0) {
        setSelectedOrder(orders[0]);
        setOrderSubView('track');
      }
    }
  }, [searchParams, location.key, location.search, location.state, viewOrderParam, orders]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('airawati_user_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('airawati_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Profile Save (Updates MongoDB backend and local context)
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: userProfile.name,
        phone: userProfile.phone
      };
      if (passwordForm.newPassword) {
        payload.password = passwordForm.newPassword;
      }
      const res = await api.auth.updateProfile(payload);
      if (res && res.success && res.user) {
        login(res.user);
        setUserProfile((prev) => ({
          ...prev,
          name: res.user.name,
          phone: res.user.phone
        }));
        showToast('Account details updated successfully in database!');
      } else {
        showToast('Account details saved!');
      }
    } catch (err) {
      console.warn('Backend update notice:', err.message);
      showToast('Profile saved!');
    }
    setPasswordForm({ currentPassword: '', newPassword: '' });
  };

  // Address Actions
  const handleEditAddressClick = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      title: addr.title || 'Home',
      fullName: addr.fullName || userProfile.name,
      phone: addr.phone || userProfile.phone,
      additionalInfo: addr.additionalInfo || '',
      address: addr.address || '',
      city: addr.city || '',
      postalCode: addr.postalCode || addr.pincode || ''
    });
    setIsEditingAddress(true);
  };

  const handleAddNewAddressClick = () => {
    setEditingAddressId(null);
    setAddressForm({
      title: 'Home',
      fullName: userProfile.name || currentUser?.name || '',
      phone: userProfile.phone || currentUser?.phone || '',
      additionalInfo: '',
      address: '',
      city: '',
      postalCode: ''
    });
    setIsEditingAddress(true);
  };

  const handleSaveAddressSubmit = async (e) => {
    e.preventDefault();
    let updatedList;
    if (editingAddressId) {
      updatedList = addresses.map((a) => (a.id === editingAddressId ? { ...a, ...addressForm } : a));
      showToast('Address updated successfully!');
    } else {
      const newAddr = {
        ...addressForm,
        id: 'addr-' + Date.now(),
        isDefault: addresses.length === 0
      };
      updatedList = [...addresses, newAddr];
      showToast('New address saved!');
    }
    setAddresses(updatedList);
    setIsEditingAddress(false);
    setEditingAddressId(null);

    // Sync with MongoDB backend
    try {
      const backendAddresses = updatedList.map((a) => ({
        label: a.title || 'Home',
        street: a.address,
        city: a.city,
        state: a.state || 'Madhya Pradesh',
        pincode: a.postalCode || '452001',
        phone: a.phone,
        isDefault: Boolean(a.isDefault)
      }));
      await api.auth.updateProfile({ addresses: backendAddresses });
    } catch (err) {
      console.warn('Address save note:', err.message);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (confirm('Are you sure you want to delete this address?')) {
      const updatedList = addresses.filter((a) => a.id !== id);
      setAddresses(updatedList);
      showToast('Address deleted.');

      try {
        const backendAddresses = updatedList.map((a) => ({
          label: a.title || 'Home',
          street: a.address,
          city: a.city,
          state: a.state || 'Madhya Pradesh',
          pincode: a.postalCode || '452001',
          phone: a.phone,
          isDefault: Boolean(a.isDefault)
        }));
        await api.auth.updateProfile({ addresses: backendAddresses });
      } catch (err) {
        console.warn('Address delete note:', err.message);
      }
    }
  };

  // Cancel Order Submission (Screenshot 4 -> 5)
  const handleConfirmCancelOrder = async (e) => {
    e.preventDefault();
    if (selectedOrder) {
      try {
        await api.orders.cancel(selectedOrder.id || selectedOrder.orderNumber, { cancelReason });
      } catch (err) {
        console.warn('Backend cancel notice:', err.message);
      }
      setOrders((prev) =>
        prev.map((o) =>
          o.orderNumber === selectedOrder.orderNumber
            ? { ...o, status: 'CANCELLED', statusLabel: 'Cancelled', cancelReason }
            : o
        )
      );
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: 'CANCELLED', statusLabel: 'Cancelled', cancelReason } : null
      );
    }
    setIsCancelModalOpen(false);
    setOrderSubView('cancelled');
    showToast('Order has been cancelled.');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-[#C5A059]/30 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#5C1329]/10 text-[#5C1329] mx-auto flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
              You are Logged Out
            </h1>
            <p className="text-xs text-stone-600 mt-2">
              Please sign in or create an account to view your orders, track shipments, and manage your profile.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <Link
              to="/signin"
              className="block w-full py-3 bg-[#6E1C24] hover:bg-[#4A151B] text-white font-semibold rounded-lg text-xs sm:text-sm tracking-wide transition-all shadow-sm"
            >
              Sign In to Your Account
            </Link>
            <Link
              to="/signup"
              className="block w-full py-3 border border-[#6E1C24] text-[#6E1C24] hover:bg-[#6E1C24]/5 font-semibold rounded-lg text-xs sm:text-sm tracking-wide transition-all"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF2EE]/40 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 2-COLUMN DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR PROFILE CARD */}
          {/* ======================================================== */}
          <div className="md:col-span-4 lg:col-span-3 bg-[#F9ECE8] rounded-2xl p-4 sm:p-7 shadow-sm border border-stone-200/40">
            
            {/* Desktop Full Profile Card */}
            <div className="hidden md:block text-center">
              <div className="w-28 h-36 mx-auto rounded-xl overflow-hidden shadow-md mb-3 bg-stone-200">
                <img
                  src={userProfile.avatar || '/images/hero_model.jpg'}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Name */}
              <h2 className="font-serif font-bold text-base text-[#4A151B]">
                {userProfile.name || 'Customer'}
              </h2>

              {/* Contact Details */}
              <div className="text-xs text-stone-700 space-y-1 mt-2">
                <p className="flex items-center justify-center gap-1.5 font-medium">
                  <Phone className="w-3 h-3 text-[#6B1E28]" />
                  <span>{userProfile.phone || 'No phone added'}</span>
                </p>
                <p className="flex items-center justify-center gap-1.5 font-medium">
                  <Mail className="w-3 h-3 text-[#6B1E28]" />
                  <span className="truncate max-w-[180px]">{userProfile.email || 'customer@airawati.com'}</span>
                </p>
              </div>

              {/* Edit Profile Button */}
              <button
                type="button"
                onClick={() => switchTab('profile')}
                className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-6 py-2 rounded-full my-4 shadow-sm transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            {/* Mobile Compact Profile Strip */}
            <div className="md:hidden flex items-center justify-between gap-3 pb-3 border-b border-stone-200/60 mb-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-11 h-13 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-[#6B1E28]/20 shadow-xs">
                  <img
                    src={userProfile.avatar || '/images/hero_model.jpg'}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif font-bold text-sm text-[#4A151B] truncate">
                    {userProfile.name || 'Customer'}
                  </h2>
                  <p className="text-[10px] text-stone-600 truncate">
                    {userProfile.email || 'customer@airawati.com'}
                  </p>
                  <p className="text-[10px] text-stone-500">
                    {userProfile.phone || ''}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => switchTab('profile')}
                className="bg-[#6B1E28] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-xs shrink-0 cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* Sidebar Navigation Tabs (Horizontal scrolling strip on mobile, Vertical list on desktop) */}
            <div className="flex md:flex-col overflow-x-auto no-scrollbar gap-1.5 md:space-y-1 md:gap-0 pt-1 text-left">
              {/* 1. My Orders */}
              <button
                type="button"
                onClick={() => switchTab('orders')}
                className={`whitespace-nowrap flex items-center gap-2 md:gap-3 px-3.5 py-2 md:py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'orders'
                    ? 'bg-[#6B1E28] text-white shadow-sm'
                    : 'text-stone-700 hover:text-[#6B1E28] hover:bg-white/50 bg-white/40 md:bg-transparent'
                }`}
              >
                <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>My Orders</span>
              </button>

              {/* 2. Saved Addresses */}
              <button
                type="button"
                onClick={() => switchTab('addresses')}
                className={`whitespace-nowrap flex items-center gap-2 md:gap-3 px-3.5 py-2 md:py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'addresses'
                    ? 'bg-[#6B1E28] text-white shadow-sm'
                    : 'text-stone-700 hover:text-[#6B1E28] hover:bg-white/50 bg-white/40 md:bg-transparent'
                }`}
              >
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Saved Addresses</span>
              </button>

              {/* 3. Wishlist */}
              <button
                type="button"
                onClick={() => switchTab('wishlist')}
                className={`whitespace-nowrap flex items-center gap-2 md:gap-3 px-3.5 py-2 md:py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'wishlist'
                    ? 'bg-[#6B1E28] text-white shadow-sm'
                    : 'text-stone-700 hover:text-[#6B1E28] hover:bg-white/50 bg-white/40 md:bg-transparent'
                }`}
              >
                <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Wishlist</span>
              </button>

              {/* 4. Account Details */}
              <button
                type="button"
                onClick={() => switchTab('profile')}
                className={`whitespace-nowrap flex items-center gap-2 md:gap-3 px-3.5 py-2 md:py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'profile'
                    ? 'bg-[#6B1E28] text-white shadow-sm'
                    : 'text-stone-700 hover:text-[#6B1E28] hover:bg-white/50 bg-white/40 md:bg-transparent'
                }`}
              >
                <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Account Details</span>
              </button>

              {/* 5. Logout */}
              <button
                type="button"
                onClick={() => switchTab('logout')}
                className={`whitespace-nowrap flex items-center gap-2 md:gap-3 px-3.5 py-2 md:py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'logout'
                    ? 'bg-[#6B1E28] text-white shadow-sm'
                    : 'text-stone-700 hover:text-red-700 hover:bg-white/50 bg-white/40 md:bg-transparent'
                }`}
              >
                <LogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Logout</span>
              </button>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT MAIN CONTENT AREA */}
          {/* ======================================================== */}
          <div className="md:col-span-8 lg:col-span-9">
            
            {/* ------------------------------------------------------ */}
            {/* SCREEN 1: ACCOUNT DETAILS / EDIT PROFILE (Screenshot 1) */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'profile' && (
              <div>
                {/* Header Row */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => switchTab('orders')}
                    aria-label="Back to orders"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#4A151B]">
                      Account Details
                    </h1>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Manage your account information
                    </p>
                  </div>
                </div>

                {/* Edit Account Details Card */}
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                  <h2 className="font-serif font-bold text-sm text-[#4A151B] mb-5">
                    Edit Account Details
                  </h2>

                  <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                    {/* Row 1: Name and Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-800 font-bold mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          required
                          className="w-full bg-[#FAF2EE] rounded-lg px-4 py-2.5 text-stone-900 font-medium outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-800 font-bold mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          required
                          className="w-full bg-[#FAF2EE] rounded-lg px-4 py-2.5 text-stone-900 font-medium outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone Number and Password Change */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-800 font-bold mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                          required
                          className="w-full bg-[#FAF2EE] rounded-lg px-4 py-2.5 text-stone-900 font-medium outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-800 font-bold mb-1.5">
                          Password Change
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="password"
                            placeholder="Current Password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="w-full bg-[#FAF2EE] rounded-lg px-3 py-2.5 text-stone-900 placeholder:text-stone-500 font-medium outline-none border border-stone-200 focus:border-[#6B1E28]"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full bg-[#FAF2EE] rounded-lg px-3 py-2.5 text-stone-900 placeholder:text-stone-500 font-medium outline-none border border-stone-200 focus:border-[#6B1E28]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Changes Button */}
                    <div className="pt-4 flex justify-center">
                      <button
                        type="submit"
                        className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs sm:text-sm font-semibold px-8 py-2.5 rounded-full transition-colors shadow-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* SCREEN 2: LOGOUT CONFIRMATION (Screenshot 2) */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'logout' && (
              <div className="min-h-[400px] flex flex-col justify-start">
                <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => switchTab('orders')}
                    aria-label="Back to orders"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </div>

                <div className="my-auto text-center space-y-6 max-w-sm mx-auto">
                  <p className="font-serif font-bold text-base sm:text-lg text-stone-900">
                    Are you sure you want to logout?
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => switchTab('orders')}
                      className="px-6 py-2 rounded-md border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        navigate('/signin');
                      }}
                      className="px-6 py-2 rounded-md bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold transition-colors shadow-sm"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* SCREEN 3: TRACK ORDER VIEW (Screenshot 3) */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'orders' && selectedOrder && orderSubView === 'track' && (
              <div>
                {/* Header Row */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    aria-label="Back to orders list"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#4A151B]">
                      Track Order
                    </h1>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Track your order status
                    </p>
                  </div>
                </div>

                {/* Track Order Container Card */}
                <div className="bg-[#FAF2EE]/60 rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
                  {/* Order ID & Live Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 font-semibold text-xs text-stone-800">
                    <div>
                      Order ID: <strong>#{selectedOrder.orderNumber || 'AWT12345'}</strong>
                      {selectedOrder.placedDate && (
                        <span className="text-stone-500 font-normal ml-2">
                          ({selectedOrder.placedDate})
                        </span>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      selectedOrder.status === 'CANCELLED'
                        ? 'bg-red-100 text-red-700'
                        : selectedOrder.status === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedOrder.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : selectedOrder.status === 'CONFIRMED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#5C1329] text-white'
                    }`}>
                      {selectedOrder.status === 'PENDING'
                        ? 'Pending Admin Confirmation'
                        : selectedOrder.statusLabel || selectedOrder.status}
                    </span>
                  </div>

                  {/* Status Banner */}
                  {(() => {
                    const norm = (selectedOrder.status || '').toUpperCase().trim();
                    let step = 0;
                    if (norm === 'CANCELLED') step = -1;
                    else if (norm === 'PENDING') step = 0;
                    else if (norm === 'CONFIRMED') step = 1;
                    else if (norm === 'PACKED' || norm === 'PROCESSING') step = 2;
                    else if (norm === 'SHIPPED') step = 3;
                    else if (norm === 'OUT FOR DELIVERY' || norm === 'OUT_FOR_DELIVERY') step = 4;
                    else if (norm === 'DELIVERED') step = 5;

                    if (step === -1) {
                      return (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-red-800">
                          <X className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold">This Order Has Been Cancelled</p>
                            <p className="text-[11px] text-red-700 mt-0.5">
                              {selectedOrder.cancelReason ? `Reason: ${selectedOrder.cancelReason}` : 'Cancelled by customer'}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    if (step === 0) {
                      return (
                        <div className="bg-amber-50 border border-amber-300/80 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                          <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0 animate-spin" />
                          <div>
                            <p className="font-bold">Awaiting Admin Confirmation</p>
                            <p className="text-[11px] text-amber-800 mt-0.5">
                              Aapka order receive ho chuka hai. Admin verify karke confirm karega, uske baad packaging shuru hogi.
                            </p>
                          </div>
                        </div>
                      );
                    }
                    if (step === 1) {
                      return (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold">Order Confirmed by Admin</p>
                            <p className="text-[11px] text-emerald-800 mt-0.5">
                              Admin ne order confirm kar diya hai! Ab master handloom artisans saree packaging prepare kar rahe hain.
                            </p>
                          </div>
                        </div>
                      );
                    }
                    if (step === 2) {
                      return (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-orange-900">
                          <Package className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold">Packed in Royal Heirloom Box</p>
                            <p className="text-[11px] text-orange-800 mt-0.5">
                              Aapki saree inspect karke box me pack ho chuki hai. Dispatch ke liye ready hai.
                            </p>
                          </div>
                        </div>
                      );
                    }
                    if (step === 3) {
                      return (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-blue-900">
                          <Truck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold">Dispatched with Courier Partner</p>
                            <p className="text-[11px] text-blue-800 mt-0.5">
                              Order dispatch ho chuka hai aur insured royal transit me hai.
                            </p>
                          </div>
                        </div>
                      );
                    }
                    if (step === 4) {
                      return (
                        <div className="bg-[#FAF2F4] border border-[#F0D5DA] rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-[#5C1329]">
                          <Truck className="w-4 h-4 text-[#5C1329] mt-0.5 shrink-0 animate-bounce" />
                          <div>
                            <p className="font-bold">Out for Delivery Today</p>
                            <p className="text-[11px] text-stone-700 mt-0.5">
                              Delivery executive aapke shipping address par parcel deliver karne nikal chuka hai.
                            </p>
                          </div>
                        </div>
                      );
                    }
                    if (step === 5) {
                      return (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-bold">Delivered Successfully</p>
                            <p className="text-[11px] text-emerald-800 mt-0.5">
                              Aapka order successfully deliver ho chuka hai. Airawati handloom chunne ke liye dhanyawad!
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Horizontal 5-Step Progress Tracker */}
                  {selectedOrder.status !== 'CANCELLED' && (
                    <div className="pt-2 pb-4">
                      <div className="relative">
                        {/* Connecting background line */}
                        <div className="absolute top-4 left-[10%] right-[10%] h-[3px] bg-stone-200 -z-0" />
                        {/* Connecting active filled line */}
                        <div
                          className="absolute top-4 left-[10%] h-[3px] bg-[#6B1E28] transition-all duration-500 -z-0"
                          style={{
                            width: (() => {
                              const norm = (selectedOrder.status || '').toUpperCase().trim();
                              let s = 0;
                              if (norm === 'PENDING') s = 0;
                              else if (norm === 'CONFIRMED') s = 1;
                              else if (norm === 'PACKED' || norm === 'PROCESSING') s = 2;
                              else if (norm === 'SHIPPED') s = 3;
                              else if (norm === 'OUT FOR DELIVERY' || norm === 'OUT_FOR_DELIVERY') s = 4;
                              else if (norm === 'DELIVERED') s = 5;
                              if (s <= 1) return '0%';
                              return `${Math.min(100, ((s - 1) / 4) * 80)}%`;
                            })()
                          }}
                        />

                        <div className="grid grid-cols-5 text-center gap-2 relative z-10">
                          {[
                            { num: 1, name: 'Confirmed' },
                            { num: 2, name: 'Packed' },
                            { num: 3, name: 'Shipped' },
                            { num: 4, name: 'Out for Delivery' },
                            { num: 5, name: 'Delivered' }
                          ].map((st) => {
                            const norm = (selectedOrder.status || '').toUpperCase().trim();
                            let curStep = 0;
                            if (norm === 'PENDING') curStep = 0;
                            else if (norm === 'CONFIRMED') curStep = 1;
                            else if (norm === 'PACKED' || norm === 'PROCESSING') curStep = 2;
                            else if (norm === 'SHIPPED') curStep = 3;
                            else if (norm === 'OUT FOR DELIVERY' || norm === 'OUT_FOR_DELIVERY') curStep = 4;
                            else if (norm === 'DELIVERED') curStep = 5;

                            const isCompleted = curStep >= st.num;
                            const isAwaitingFirst = curStep === 0 && st.num === 1;
                            const isCurrent = curStep === st.num;

                            return (
                              <div key={st.num} className="flex flex-col items-center">
                                {isCompleted ? (
                                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  </div>
                                ) : isAwaitingFirst ? (
                                  <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-600 text-amber-700 flex items-center justify-center text-xs font-bold shadow-sm animate-pulse">
                                    <Clock className="w-4 h-4" />
                                  </div>
                                ) : isCurrent ? (
                                  <div className="w-8 h-8 rounded-full bg-[#6B1E28] text-white flex items-center justify-center text-xs font-bold shadow-sm animate-pulse">
                                    {st.num === 4 ? <Truck className="w-4 h-4" /> : st.num === 2 ? <Package className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-400 flex items-center justify-center text-xs font-semibold">
                                    {st.num}
                                  </div>
                                )}

                                <span className={`text-[11px] font-bold mt-2 ${
                                  isCompleted || isCurrent || isAwaitingFirst ? 'text-stone-900' : 'text-stone-400'
                                }`}>
                                  {st.name}
                                </span>

                                <span className="text-[10px] text-stone-500 mt-0.5">
                                  {isAwaitingFirst
                                    ? 'Awaiting Admin'
                                    : isCompleted && st.num === 1
                                    ? (selectedOrder.placedDate ? selectedOrder.placedDate.split(',')[0] : 'Confirmed')
                                    : isCompleted
                                    ? 'Completed'
                                    : isCurrent
                                    ? 'In Progress'
                                    : '--'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <hr className="border-stone-200" />

                  {/* Saree Row with View Order Details & Cancel Order buttons */}
                  {selectedOrder.items && selectedOrder.items[0] && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedOrder.items[0].image}
                          alt={selectedOrder.items[0].title}
                          className="w-16 h-20 object-cover rounded-md border border-stone-200 shrink-0"
                        />
                        <div>
                          <h3 className="font-serif font-bold text-sm text-stone-900">
                            {selectedOrder.items[0].title}
                          </h3>
                          <p className="font-bold text-xs text-stone-800 mt-1">
                            ₹{(selectedOrder.items[0].price || selectedOrder.totalAmount || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setOrderSubView('details')}
                          className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer"
                        >
                          View Order Details
                        </button>
                        {(() => {
                          const norm = (selectedOrder.status || '').toUpperCase().trim();
                          const canCancel = norm === 'PENDING' || norm === 'CONFIRMED' || norm === 'PACKED';
                          return canCancel ? (
                            <button
                              type="button"
                              onClick={() => setIsCancelModalOpen(true)}
                              className="bg-[#F2DFDD] hover:bg-[#EBD2CF] text-[#6B1E28] text-xs font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer"
                            >
                              Cancel Order
                            </button>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* SCREEN 2 (Details sub-view): Single Order Full Details */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'orders' && selectedOrder && orderSubView === 'details' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setOrderSubView('track')}
                    aria-label="Back to tracking"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#4A151B]">
                      My Account
                    </h1>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Manage your orders and account details
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 sm:p-7 border border-stone-200 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <h2 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                          Order Details
                        </h2>
                        <p className="text-xs text-stone-500">
                          Manage your orders and account details
                        </p>
                        <p className="font-mono font-bold text-sm text-stone-900 mt-3">
                          #{selectedOrder.orderNumber || 'AWT12345'}
                        </p>
                      </div>

                      <hr className="border-stone-200" />

                      <div className="text-xs text-stone-700 space-y-1">
                        <p className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                          <HomeIcon className="w-4 h-4 text-[#6B1E28]" />
                          <span>{selectedOrder.customerName || userProfile.name || 'Customer'}</span>
                        </p>
                        {selectedOrder.shippingAddressRaw?.street ? (
                          <>
                            <p className="text-stone-700 font-medium">{selectedOrder.shippingAddressRaw.street}</p>
                            <p className="text-stone-600">
                              {[selectedOrder.shippingAddressRaw.city, selectedOrder.shippingAddressRaw.state].filter(Boolean).join(', ')}
                              {selectedOrder.shippingAddressRaw.pincode ? ` - ${selectedOrder.shippingAddressRaw.pincode}` : ''}
                            </p>
                          </>
                        ) : selectedOrder.shippingAddress ? (
                          <p className="text-stone-600">{selectedOrder.shippingAddress}</p>
                        ) : (
                          <p className="text-stone-600">Address on file</p>
                        )}
                        {(selectedOrder.contact || selectedOrder.customerPhone) && (
                          <p className="text-stone-500 pt-0.5">Phone: {selectedOrder.contact || selectedOrder.customerPhone}</p>
                        )}
                      </div>

                      <hr className="border-stone-200" />

                      <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
                        {(selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items : [{ title: 'Handcrafted Heritage Saree', price: selectedOrder.totalAmount || 8150, quantity: 1, image: '/images/hero_model.jpg' }]).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4 py-2.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image || '/images/hero_model.jpg'}
                                alt={item.title}
                                className="w-14 h-16 sm:w-16 sm:h-20 object-cover rounded-md border border-stone-200 shrink-0"
                              />
                              <div>
                                <h3 className="font-serif font-bold text-sm text-stone-900">
                                  {item.title}
                                </h3>
                                <p className="text-xs text-stone-500 mt-0.5">
                                  Qty: {item.quantity || 1} {item.fabric ? `• ${item.fabric}` : ''}
                                </p>
                              </div>
                            </div>
                            <span className="font-serif font-bold text-base text-stone-900 shrink-0">
                              ₹ {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setOrderSubView('track')}
                          className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-5 py-2 rounded-md shadow-sm transition-colors"
                        >
                          View Live Tracking
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-[#F2E0DC] rounded-xl p-5 space-y-3.5 text-xs text-stone-800">
                      <h3 className="font-serif font-bold text-sm text-stone-900">
                        Order Info
                      </h3>
                      <div>
                        <span className="text-stone-600 block">Order ID: #{selectedOrder.orderNumber}</span>
                        <span className="text-stone-600 block mt-0.5">Order Date: {selectedOrder.placedDate || 'Recently placed'}</span>
                      </div>

                      <div className="pt-1">
                        <span className="text-stone-600 font-semibold block">Total</span>
                        <span className="font-serif font-bold text-base text-stone-900">
                          ₹ {(selectedOrder.totalAmount || 0).toLocaleString()}
                        </span>
                      </div>

                      <div className="pt-1">
                        <span className="text-stone-600 font-semibold block">Payment Method</span>
                        <span className="text-stone-900 font-medium">{selectedOrder.paymentMethod || 'Online / UPI'}</span>
                      </div>

                      <div className="pt-1">
                        <span className="text-stone-600 font-semibold block">Contact</span>
                        <span className="text-stone-900 font-medium">{selectedOrder.contact || selectedOrder.customerPhone || userProfile.phone || 'Provided at checkout'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* SCREEN 5: ORDER CANCELLED CONFIRMATION (Screenshot 5) */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'orders' && orderSubView === 'cancelled' && (
              <div className="min-h-[400px] flex flex-col justify-start">
                <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOrder(null);
                      setOrderSubView('track');
                    }}
                    aria-label="Back to orders"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </div>

                <div className="my-auto text-center space-y-4 max-w-md mx-auto">
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#6B1E28]">
                    Order Cancelled
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Your order has been cancelled successfully.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(null);
                        setOrderSubView('track');
                      }}
                      className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-6 py-2.5 rounded-md shadow-sm transition-colors"
                    >
                      Back to My Orders
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* DEFAULT MY ORDERS LIST VIEW (When no order is selected) */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'orders' && !selectedOrder && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    aria-label="Back to home"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#4A151B]">
                      My Order
                    </h1>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Manage your orders and account details
                    </p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 sm:p-12 border border-stone-200 text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#FAF2EE] text-[#4A151B] mx-auto flex items-center justify-center">
                      <Package className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#4A151B]">No Orders Yet</h3>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto">
                      You haven't placed any orders yet. Explore our handcrafted royal saree collection and place your first heirloom order.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block bg-[#4A151B] hover:bg-[#380E13] text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors mt-2"
                    >
                      Explore Saree Collection →
                    </Link>
                  </div>
                ) : (
                  <div className="bg-[#F9ECE8]/70 rounded-xl p-5 sm:p-6 border border-stone-200/80 shadow-sm">
                    <div className="font-mono font-bold text-sm text-stone-900 mb-4">
                      #{orders[0]?.orderNumber}
                    </div>

                    <div className="space-y-4">
                      {orders.map((ord) => {
                        const item = ord.items?.[0] || {};
                        const isCancelled = ord.status === 'CANCELLED';
                        const isDelivered = ord.status === 'DELIVERED';
                        return (
                          <div
                            key={ord.id || ord.orderNumber}
                            className="bg-white/80 hover:bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors border border-stone-200/60"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image || '/images/hero_model.jpg'}
                                alt={item.title || 'Saree'}
                                className="w-14 h-16 sm:w-16 sm:h-20 object-cover rounded-md border border-stone-200 shrink-0"
                              />
                              <div>
                                <h3 className="font-serif font-bold text-sm text-stone-900">
                                  {item.title || 'Pure Silk Handloom Saree'}
                                </h3>
                                <p className="text-xs text-stone-500 mt-0.5">
                                  Placed on {ord.placedDate} • Order #{ord.orderNumber}
                                </p>
                                <p className="font-serif font-bold text-xs text-[#4A151B] mt-1">
                                  ₹ {ord.totalAmount?.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 justify-between sm:justify-end">
                              <span
                                className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                                  ord.status === 'CANCELLED'
                                    ? 'bg-red-100 text-red-700'
                                    : ord.status === 'DELIVERED'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ord.status === 'PENDING'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : ord.status === 'CONFIRMED'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ord.status === 'PACKED'
                                    ? 'bg-orange-100 text-orange-800'
                                    : ord.status === 'SHIPPED'
                                    ? 'bg-indigo-100 text-indigo-800'
                                    : 'bg-[#FAF2F4] text-[#6B1E28]'
                                }`}
                              >
                                {ord.status === 'PENDING'
                                  ? 'Pending Confirmation'
                                  : ord.statusLabel || ord.status}
                              </span>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedOrder(ord);
                                  setOrderSubView('track');
                                }}
                                className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors shadow-sm cursor-pointer"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------ */}
            {/* SAVED ADDRESSES TAB */}
            {/* ------------------------------------------------------ */}
            {activeTab === 'addresses' && !isEditingAddress && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => switchTab('orders')}
                    aria-label="Back to orders"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#4A151B]">
                      Saved Addresses
                    </h1>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Manage your shipping addresses
                    </p>
                  </div>
                </div>

                {addresses.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 sm:p-12 border border-stone-200 text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#FAF2EE] text-[#4A151B] mx-auto flex items-center justify-center">
                      <HomeIcon className="w-8 h-8 stroke-[1.5] text-[#4A151B]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#4A151B]">No Saved Addresses</h3>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto">
                      You haven't added any delivery address yet. Add an address now for a fast and effortless checkout experience.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddNewAddressClick}
                      className="inline-block bg-[#4A151B] hover:bg-[#380E13] text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors mt-2"
                    >
                      + Add Delivery Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                            {addr.title || 'Address'}
                          </h3>
                          {addr.isDefault && (
                            <span className="bg-[#C69C9C] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-stone-600 space-y-0.5 leading-relaxed">
                          <p>{addr.address}</p>
                          <p>{addr.locality || addr.additionalInfo}</p>
                          <p>{addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.postalCode || addr.pincode}</p>
                          {addr.phone && <p className="mt-1 text-stone-800 font-medium">{addr.phone}</p>}
                        </div>

                        <div className="flex justify-end gap-2.5 mt-4 pt-3 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => handleEditAddressClick(addr)}
                            className="px-3.5 py-1.5 border border-stone-300 rounded text-xs text-stone-700 hover:bg-stone-50 font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="px-3.5 py-1.5 border border-stone-300 rounded text-xs text-stone-700 hover:bg-stone-50 font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleAddNewAddressClick}
                        className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <span>+ Add New Address</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EDIT ADDRESS FORM VIEW */}
            {activeTab === 'addresses' && isEditingAddress && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(false)}
                    aria-label="Back to addresses list"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#4A151B]">
                      {editingAddressId ? 'Edit Address' : 'Add Address'}
                    </h1>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Update your shipping address
                    </p>
                  </div>
                </div>

                <div className="bg-[#F9ECE8]/80 rounded-xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
                  <form onSubmit={handleSaveAddressSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-stone-900 font-bold mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        required
                        className="w-full bg-white rounded-md px-4 py-2.5 text-stone-900 outline-none border border-stone-200 focus:border-[#6B1E28]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-900 font-bold mb-1.5">Phone Number</label>
                        <input
                          type="text"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          required
                          className="w-full bg-white rounded-md px-4 py-2.5 text-stone-900 outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-900 font-bold mb-1.5">Additional Info</label>
                        <input
                          type="text"
                          placeholder="e.g. Near City Center"
                          value={addressForm.additionalInfo}
                          onChange={(e) => setAddressForm({ ...addressForm, additionalInfo: e.target.value })}
                          className="w-full bg-white rounded-md px-4 py-2.5 text-stone-900 outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-stone-900 font-bold mb-1.5">Address</label>
                        <input
                          type="text"
                          value={addressForm.address}
                          onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                          required
                          className="w-full bg-white rounded-md px-4 py-2.5 text-stone-900 outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-900 font-bold mb-1.5">City</label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          required
                          className="w-full bg-white rounded-md px-4 py-2.5 text-stone-900 outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-900 font-bold mb-1.5">Postal Code</label>
                        <input
                          type="text"
                          value={addressForm.postalCode}
                          onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                          required
                          className="w-full bg-white rounded-md px-4 py-2.5 text-stone-900 outline-none border border-stone-200 focus:border-[#6B1E28]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-3">
                      <button
                        type="submit"
                        className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs sm:text-sm font-semibold px-8 py-2.5 rounded-lg transition-colors shadow-sm"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => switchTab('orders')}
                    aria-label="Back to orders"
                    className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#4A151B]">
                      Wishlist
                    </h1>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Your saved handcrafted heirlooms
                    </p>
                  </div>
                </div>

                {wishlist.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 sm:p-12 border border-stone-200 text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-[#FAF2EE] text-[#4A151B] mx-auto flex items-center justify-center">
                      <Heart className="w-8 h-8 stroke-[1.5] text-[#4A151B]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#4A151B]">Your Wishlist is Empty</h3>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto">
                      You haven't saved any handcrafted sarees to your wishlist yet. Browse our royal catalog and click the heart icon on any saree to save it here.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block bg-[#4A151B] hover:bg-[#380E13] text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors mt-2"
                    >
                      Browse Saree Collection →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id || item._id}
                        className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image || '/images/hero_model.jpg'}
                            alt={item.title}
                            className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-md border border-stone-200 shrink-0"
                          />
                          <div>
                            <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                              {item.title}
                            </h3>
                            <p className="font-serif font-bold text-sm text-[#4A151B] mt-1 mb-3">
                              ₹ {item.price?.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(item, 1);
                              removeFromWishlist(item.id || item._id);
                              showToast(`Moved "${item.shortTitle || item.title}" to your shopping bag!`);
                            }}
                            className="bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-1.5 shadow-sm transition-colors"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Move to Cart</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              removeFromWishlist(item.id || item._id);
                            }}
                            className="border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold px-4 py-2 rounded-md flex items-center gap-1.5 transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2">
                      <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors"
                      >
                        <span>+ Add more product</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* SCREEN 4: CANCEL ORDER MODAL / POPUP (Screenshot 4) */}
      {/* ======================================================== */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-stone-200 relative animate-fadeIn">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsCancelModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <h3 className="font-serif font-bold text-lg text-center text-[#4A151B]">
              Cancel Order
            </h3>
            <p className="text-xs text-stone-600 text-center mt-1 mb-5">
              Please let us know why you're cancelling this order
            </p>

            <form onSubmit={handleConfirmCancelOrder} className="space-y-4 text-xs">
              {/* Radio Options (Matching Screenshot 4) */}
              <div className="space-y-2.5 text-stone-800">
                {[
                  'Ordered by mistake',
                  'Found a better price',
                  'Delayed delivery',
                  'Other'
                ].map((reason) => (
                  <label key={reason} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="cancelReasonRadio"
                      checked={cancelReason === reason}
                      onChange={() => setCancelReason(reason)}
                      className="accent-[#6B1E28] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-medium text-stone-800">{reason}</span>
                  </label>
                ))}
              </div>

              {/* Add a reason (optional) */}
              <div className="pt-1">
                <label className="block text-stone-700 font-semibold mb-1">
                  Add a reason (optional)
                </label>
                <input
                  type="text"
                  placeholder="I'm not in town"
                  value={cancelNote}
                  onChange={(e) => setCancelNote(e.target.value)}
                  className="w-full bg-white rounded-md px-3.5 py-2 text-stone-900 border border-stone-300 outline-none focus:border-[#6B1E28]"
                />
              </div>

              {/* Upload a photo (optional) */}
              <div className="pt-1">
                <label className="block text-stone-700 font-semibold mb-1">
                  Upload a photo (optional)
                </label>
                <div className="border border-dashed border-stone-300 rounded-lg p-3.5 text-center bg-stone-50 hover:bg-stone-100 cursor-pointer flex items-center justify-center gap-2 text-stone-600 font-medium">
                  <Camera className="w-4 h-4 text-stone-600" />
                  <span>Upload Photo</span>
                </div>
              </div>

              {/* Buttons Row */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-6 py-2 rounded-md border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-[#6B1E28] hover:bg-[#52131C] text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

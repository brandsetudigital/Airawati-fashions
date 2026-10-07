// frontend/src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, Smartphone, CreditCard, Banknote } from 'lucide-react';
import { PRODUCTS, BLOUSES, ACCESSORIES, BOUTIQUE_ACCESSORIES } from '../data/mockData';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ALL_CATALOG = [...PRODUCTS, ...BLOUSES, ...ACCESSORIES, ...BOUTIQUE_ACCESSORIES];

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart, currentUser, showToast } = useCart();

  // Retrieve exact product ID and quantity from URL query params or state
  const productId = searchParams.get('id');
  const queryQty = Math.max(1, parseInt(searchParams.get('qty'), 10) || 1);
  const stateProduct = location.state?.product;
  const stateQty = location.state?.qty ? Math.max(1, parseInt(location.state.qty, 10)) : queryQty;

  const [checkoutItems, setCheckoutItems] = useState(() => {
    // 1. Direct product passed via location.state (Instant & Exact)
    if (stateProduct) {
      return [{
        ...stateProduct,
        id: stateProduct.id || stateProduct._id,
        title: stateProduct.title || stateProduct.name,
        shortTitle: stateProduct.shortTitle || stateProduct.title,
        price: Number(stateProduct.price) || 0,
        image: stateProduct.image || stateProduct.customImage,
        fabric: stateProduct.fabric || stateProduct.category || (stateProduct.selectedSize ? `Size: ${stateProduct.selectedSize}` : 'Handcrafted'),
        quantity: stateQty
      }];
    }

    // 2. Direct product ID from query parameter
    if (productId) {
      const found = ALL_CATALOG.find(
        (p) => String(p.id) === String(productId) || String(p._id) === String(productId) || String(p.sku).toLowerCase() === String(productId).toLowerCase()
      );
      if (found) {
        return [{
          ...found,
          id: found.id || found._id,
          title: found.title || found.name,
          shortTitle: found.shortTitle || found.title,
          price: Number(found.price) || 0,
          image: found.image || found.customImage,
          fabric: found.fabric || found.category || 'Handcrafted',
          quantity: queryQty
        }];
      }
      const cartMatch = cart.find(
        (c) => String(c.id) === String(productId) || String(c._id) === String(productId) || String(c.sku).toLowerCase() === String(productId).toLowerCase()
      );
      if (cartMatch) {
        return [{ ...cartMatch, quantity: queryQty || cartMatch.quantity || 1 }];
      }
    }

    // 3. Cart Checkout (user clicked "Proceed to Checkout" from Cart Drawer)
    if (cart && cart.length > 0) {
      return cart;
    }

    // 4. Fallback default
    return [{
      ...PRODUCTS[0],
      quantity: 1
    }];
  });

  useEffect(() => {
    if (stateProduct) {
      setCheckoutItems([{
        ...stateProduct,
        id: stateProduct.id || stateProduct._id,
        title: stateProduct.title || stateProduct.name,
        shortTitle: stateProduct.shortTitle || stateProduct.title,
        price: Number(stateProduct.price) || 0,
        image: stateProduct.image || stateProduct.customImage,
        fabric: stateProduct.fabric || stateProduct.category || (stateProduct.selectedSize ? `Size: ${stateProduct.selectedSize}` : 'Handcrafted'),
        quantity: stateQty
      }]);
      return;
    }

    if (productId) {
      const found = ALL_CATALOG.find(
        (p) => String(p.id) === String(productId) || String(p._id) === String(productId) || String(p.sku).toLowerCase() === String(productId).toLowerCase()
      );
      if (found) {
        setCheckoutItems([{
          ...found,
          id: found.id || found._id,
          title: found.title || found.name,
          shortTitle: found.shortTitle || found.title,
          price: Number(found.price) || 0,
          image: found.image || found.customImage,
          fabric: found.fabric || found.category || 'Handcrafted',
          quantity: queryQty
        }]);
      } else {
        api.products.getById(productId)
          .then((res) => {
            if (res && res.product) {
              const p = res.product;
              setCheckoutItems([{
                ...p,
                id: p._id || p.id,
                title: p.title,
                shortTitle: p.shortTitle || p.title,
                price: Number(p.price) || 0,
                image: p.image,
                fabric: p.fabric || p.category || 'Handcrafted',
                quantity: queryQty
              }]);
            }
          })
          .catch((err) => console.warn('Product fetch fallback:', err));
      }
    }
  }, [productId, stateProduct, stateQty, queryQty]);

  const isDirectBuy = Boolean(stateProduct || productId);
  const itemTotal = checkoutItems.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1), 0);
  const shippingFee = 0;
  const tax = 0;
  const total = itemTotal + shippingFee + tax;
  const primaryProduct = checkoutItems[0] || PRODUCTS[0];
  const product = primaryProduct;
  const qty = primaryProduct.quantity || 1;

  // Form states matching Screenshot 3, prefilled with logged-in user info
  const [shippingForm, setShippingForm] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.addresses?.[0]?.street || '',
    city: currentUser?.addresses?.[0]?.city || '',
    state: currentUser?.addresses?.[0]?.state || 'Madhya Pradesh',
    pinCode: currentUser?.addresses?.[0]?.pincode || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setShippingForm((prev) => ({
        ...prev,
        fullName: currentUser.name || prev.fullName,
        phone: currentUser.phone || prev.phone,
        address: currentUser.addresses?.[0]?.street || prev.address,
        city: currentUser.addresses?.[0]?.city || prev.city,
        state: currentUser.addresses?.[0]?.state || prev.state || 'Madhya Pradesh',
        pinCode: currentUser.addresses?.[0]?.pincode || prev.pinCode
      }));
    }
  }, [currentUser]);

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'upi' | 'card' | 'cod'
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails((prev) => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: '' }));
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setCardDetails((prev) => ({ ...prev, expiry: raw }));
    if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: '' }));
  };

  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDetails((prev) => ({ ...prev, cvv: raw }));
    if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: '' }));
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
    if (errors.upi) setErrors((prev) => ({ ...prev, upi: '' }));
  };

  const validate = () => {
    const errs = {};

    if (!shippingForm.fullName.trim() || shippingForm.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters)';
    }

    const cleanPhone = shippingForm.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!shippingForm.address.trim() || shippingForm.address.trim().length < 5) {
      errs.address = 'Please enter complete delivery address (minimum 5 characters)';
    }

    if (!shippingForm.city.trim() || shippingForm.city.trim().length < 2) {
      errs.city = 'Please enter city';
    }

    if (!shippingForm.state.trim()) {
      errs.state = 'Please enter state';
    }

    const cleanPin = shippingForm.pinCode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      errs.pinCode = 'Please enter a valid 6-digit PIN code';
    }

    // Payment method validation
    if (paymentMethod === 'upi') {
      const trimmedUpi = upiId.trim();
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,64}@[a-zA-Z]{2,32}$/;
      if (!trimmedUpi) {
        errs.upi = 'Please enter your UPI ID (e.g. 9876543210@upi or name@bank)';
      } else if (!upiRegex.test(trimmedUpi)) {
        errs.upi = 'Invalid UPI ID format. Format must be username@bank (e.g. 8357977322@ybl)';
      }
    } else if (paymentMethod === 'card') {
      const cleanCard = cardDetails.cardNumber.replace(/\s+/g, '');
      if (!cleanCard) {
        errs.cardNumber = 'Please enter your 16-digit card number';
      } else if (!/^\d{15,16}$/.test(cleanCard)) {
        errs.cardNumber = 'Card number must be 16 digits';
      }

      const exp = cardDetails.expiry.trim();
      const expMatch = exp.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
      if (!exp) {
        errs.expiry = 'Enter MM/YY';
      } else if (!expMatch) {
        errs.expiry = 'Format must be MM/YY (e.g. 11/27)';
      } else {
        const expMonth = parseInt(expMatch[1], 10);
        const expYear = parseInt('20' + expMatch[2], 10);
        const now = new Date();
        const curYear = now.getFullYear();
        const curMonth = now.getMonth() + 1;
        if (expYear < curYear || (expYear === curYear && expMonth < curMonth)) {
          errs.expiry = 'Card is already expired';
        }
      }

      const cleanCvv = cardDetails.cvv.replace(/\D/g, '');
      if (!cleanCvv) {
        errs.cvv = 'Enter CVV';
      } else if (!/^\d{3,4}$/.test(cleanCvv)) {
        errs.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!validate()) {
      showToast('Please fix the highlighted errors before placing your order');
      return;
    }

    setIsProcessing(true);
    if (showToast) showToast('Creating your royal order...');

    const customerEmail = (currentUser?.email || 'customer@airawati.com').toLowerCase().trim();
    const customerName = shippingForm.fullName.trim();
    const customerPhone = shippingForm.phone.replace(/\D/g, '').trim();

    const orderPayload = {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress: {
        street: shippingForm.address.trim(),
        city: shippingForm.city.trim(),
        state: shippingForm.state.trim() || 'Madhya Pradesh',
        pincode: shippingForm.pinCode.replace(/\D/g, '').trim(),
        phone: customerPhone
      },
      paymentMethod:
        paymentMethod === 'card'
          ? 'CARD'
          : paymentMethod === 'upi'
          ? 'UPI'
          : 'COD',
      subtotal: itemTotal,
      shippingCost: shippingFee,
      taxGst: tax,
      totalAmount: total,
      items: checkoutItems.map((it) => ({
        product: it.id || it._id,
        sku: it.sku || `AIRA-${it.id || 'ITEM'}`,
        title: it.shortTitle || it.title || 'Airawati Handloom',
        price: Number(it.price) || 0,
        quantity: Number(it.quantity) || 1,
        image: it.image || '/images/hero_model.jpg',
        fabric: it.fabric || it.category || (it.selectedSize ? `Size: ${it.selectedSize}` : 'Pure Handloom')
      }))
    };

    let orderNumber = 'AWT' + Math.floor(10000 + Math.random() * 90000);
    try {
      const res = await api.orders.create(orderPayload);
      if (res && res.order && res.order.orderNumber) {
        orderNumber = res.order.orderNumber;
      }
    } catch (err) {
      console.warn('Backend order creation offline fallback:', err.message);
    }

    // Save to localStorage for complete persistence
    const orderData = {
      orderNumber,
      product: primaryProduct,
      items: checkoutItems,
      qty,
      itemTotal,
      shippingFee,
      tax,
      total,
      shippingAddress: {
        name: customerName,
        address: shippingForm.address.trim(),
        city: shippingForm.city.trim(),
        state: shippingForm.state.trim() || 'Madhya Pradesh',
        pinCode: shippingForm.pinCode.trim(),
        country: 'India',
        phone: customerPhone,
        email: customerEmail
      },
      paymentMethod:
        paymentMethod === 'card'
          ? `Credit/Debit Card (ending in ${cardDetails.cardNumber.slice(-4) || '••••'})`
          : paymentMethod === 'upi'
          ? `UPI (${upiId.trim()})`
          : 'Cash On Delivery (COD)'
    };

    localStorage.setItem('airawati_last_order', JSON.stringify(orderData));
    const existingOrders = JSON.parse(localStorage.getItem('airawati_user_orders') || '[]');
    localStorage.setItem('airawati_user_orders', JSON.stringify([orderData, ...existingOrders]));

    if (!isDirectBuy) {
      clearCart();
    } else if (primaryProduct && primaryProduct.id) {
      removeFromCart(primaryProduct.id);
    }

    setIsProcessing(false);
    navigate(`/order-confirm?orderNumber=${orderNumber}&id=${primaryProduct.id || primaryProduct._id || ''}&qty=${qty}`);
  };

  return (
    <div className="bg-[#FAF2EE]/50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* TOP ROW: BACK ARROW (Matching Screenshot 3) */}
        <div className="mb-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* PAGE HEADER: "Complete Your Purchase" */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A151B]">
            Complete Your Purchase
          </h1>
          <p className="text-sm font-semibold text-stone-700 mt-2">
            Please provide your shipping details and payment information to finalize your order.
          </p>
        </div>

        {/* 2-CARD GRID LAYOUT (Matching Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT CARD: SHIPPING DETAILS (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-stone-200">
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#4A151B] pb-3 border-b border-stone-200">
              Shipping Details
            </h2>

            <form onSubmit={handlePay} className="space-y-4 pt-4 text-sm">
              {/* Full Name */}
              <div>
                <label className="block text-stone-900 font-bold mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={shippingForm.fullName}
                  onChange={handleInputChange}
                  className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                    errors.fullName ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-stone-900 font-bold mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={shippingForm.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                    errors.phone ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-stone-900 font-bold mb-1.5">
                  Address Line (House / Flat / Street) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Complete street address"
                  value={shippingForm.address}
                  onChange={handleInputChange}
                  className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                    errors.address ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{errors.address}</p>
                )}
              </div>

              {/* City & State (Side-by-side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-900 font-bold mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={shippingForm.city}
                    onChange={handleInputChange}
                    className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                      errors.city ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-stone-900 font-bold mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="e.g. Madhya Pradesh"
                    value={shippingForm.state}
                    onChange={handleInputChange}
                    className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                      errors.state ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                    }`}
                  />
                  {errors.state && (
                    <p className="text-xs text-red-600 font-semibold mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* PIN Code */}
              <div>
                <label className="block text-stone-900 font-bold mb-1.5">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pinCode"
                  maxLength={6}
                  placeholder="6-digit postal PIN code"
                  value={shippingForm.pinCode}
                  onChange={handleInputChange}
                  className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                    errors.pinCode ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{errors.pinCode}</p>
                )}
              </div>

              {/* Payment Method Radio Options */}
              <div className="pt-2">
                <label className="block text-stone-900 font-bold mb-2.5">
                  Payment Method
                </label>
                <div className="space-y-2.5 text-stone-900">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethodRadio"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#4A151B] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-semibold flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#4A151B]" /> UPI
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethodRadio"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#4A151B] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-semibold flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#4A151B]" /> Credit/Debit Card
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethodRadio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#4A151B] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-semibold flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#4A151B]" /> COD
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT CARD: ORDER SUMMARY (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-stone-200">
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#4A151B] pb-3 border-b border-stone-200">
              Order Summary
            </h2>

            {/* EXACT SELECTED PRODUCTS PREVIEW */}
            <div className="py-2 border-b border-stone-200 divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
              {checkoutItems.map((item, idx) => (
                <div key={item.id || idx} className="flex items-center gap-4 py-3">
                  <img
                    src={item.image || '/images/hero_model.jpg'}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded-md shadow-sm border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 truncate">
                      {item.shortTitle || item.title}
                    </h3>
                    <p className="text-xs font-semibold text-stone-700 mt-0.5 truncate">
                      {item.fabric || item.category || (item.selectedSize ? `Size: ${item.selectedSize}` : 'Pure Handloom')}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="font-bold text-stone-800">
                        Qty: {item.quantity || 1}
                      </span>
                      <span className="font-bold text-[#4A151B]">
                        ₹ {((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PRICING BREAKDOWN */}
            <div className="py-3.5 space-y-2.5 text-sm text-stone-800 border-b border-stone-200">
              <div className="flex justify-between">
                <span className="font-medium">Item Total</span>
                <span className="font-bold text-stone-900">₹ {itemTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Shipping</span>
                <span className="font-bold text-emerald-800">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tax</span>
                <span className="font-bold text-stone-900">₹ 0</span>
              </div>
            </div>

            {/* TOTAL */}
            <div className="py-3.5 flex justify-between items-center text-sm font-bold text-stone-900 border-b border-stone-200">
              <span className="text-base">Total</span>
              <span className="text-base text-[#4A151B]">₹ {total.toLocaleString()}</span>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div className="pt-4 space-y-3 text-sm">
              <div className="text-stone-900 font-bold">
                Payment Method
              </div>

              <div className="space-y-2 text-stone-900">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="rightPaymentMethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-[#4A151B] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-semibold flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#4A151B]" /> UPI
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="rightPaymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#4A151B] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-semibold flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#4A151B]" /> Credit/Debit Card
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="rightPaymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#4A151B] w-4 h-4 cursor-pointer"
                  />
                  <span className="font-semibold flex items-center gap-1.5">
                    <Banknote className="w-3.5 h-3.5 text-[#4A151B]" /> COD
                  </span>
                </label>
              </div>

              {/* DYNAMIC FORM FIELDS BASED ON SELECTED PAYMENT METHOD */}

              {/* 1. CREDIT / DEBIT CARD FIELDS */}
              {paymentMethod === 'card' && (
                <div className="space-y-2.5 pt-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                      maxLength={19}
                      value={cardDetails.cardNumber}
                      onChange={handleCardNumberChange}
                      className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                        errors.cardNumber ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardDetails.expiry}
                        onChange={handleExpiryChange}
                        className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                          errors.expiry ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                        }`}
                      />
                      {errors.expiry && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{errors.expiry}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={handleCvvChange}
                        className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                          errors.cvv ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                        }`}
                      />
                      {errors.cvv && (
                        <p className="text-xs text-red-600 font-semibold mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. UPI DETAILS FIELDS */}
              {paymentMethod === 'upi' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Enter UPI ID / VPA <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9876543210@upi / username@okhdfcbank"
                      value={upiId}
                      onChange={handleUpiChange}
                      className={`w-full bg-[#FAF2EE] rounded-lg px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-500 outline-none border transition-colors ${
                        errors.upi ? 'border-red-500 focus:border-red-600' : 'border-stone-200/60 focus:border-[#4A151B]'
                      }`}
                    />
                    {errors.upi && (
                      <p className="text-xs text-red-600 font-semibold mt-1">{errors.upi}</p>
                    )}
                  </div>

                  {/* Popular UPI Apps quick choices */}
                  <div className="pt-1">
                    <span className="text-xs text-stone-600 font-semibold block mb-1.5">
                      Or select UPI App:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {['Google Pay', 'PhonePe', 'Paytm'].map((app) => {
                        const appHandle = app === 'Google Pay' ? 'okaxis' : app === 'PhonePe' ? 'ybl' : 'paytm';
                        return (
                          <button
                            key={app}
                            type="button"
                            onClick={() => {
                              setSelectedUpiApp(app);
                              const phonePrefix = (shippingForm.phone || currentUser?.phone || '9876543210').replace(/\D/g, '');
                              setUpiId(`${phonePrefix || 'user'}@${appHandle}`);
                              if (errors.upi) setErrors((prev) => ({ ...prev, upi: '' }));
                            }}
                            className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition-all ${
                              selectedUpiApp === app
                                ? 'border-[#4A151B] bg-[#4A151B]/10 text-[#4A151B]'
                                : 'border-stone-200 bg-[#FAF2EE] text-stone-800 hover:border-stone-400'
                            }`}
                          >
                            {app}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">
                    You will receive a payment verification request on your chosen UPI app.
                  </p>
                </div>
              )}

              {/* 3. CASH ON DELIVERY (COD) INFO */}
              {paymentMethod === 'cod' && (
                <div className="p-3.5 rounded-lg bg-[#FAF2EE] border border-stone-200 text-stone-800 space-y-1 pt-2.5">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs sm:text-sm">
                    <span>💵 Cash on Delivery Available</span>
                  </div>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed">
                    Pay ₹{total.toLocaleString()} in cash or via QR code upon receiving your handcrafted saree at your address.
                  </p>
                </div>
              )}

              {/* ACTION PAY BUTTON */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full bg-[#4A151B] hover:bg-[#380E13] disabled:opacity-60 text-white py-3.5 rounded-lg font-bold text-sm tracking-wider transition-colors shadow-sm mt-3"
              >
                {isProcessing
                  ? 'Processing Order...'
                  : paymentMethod === 'cod'
                  ? `Place Order (Cash on Delivery)`
                  : `Pay ₹${total.toLocaleString()}`}
              </button>
            </div>

          </div>

        </div>

        {/* TRUST BADGES FOOTER BAR (Matching Screenshot 3) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-bold text-stone-700 mt-12 pt-6">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-stone-800" />
            <span>Secure Payments</span>
          </span>
          <span className="text-stone-300">|</span>
          <span>Easy Returns</span>
          <span className="text-stone-300">|</span>
          <span>100% Handcrafted Products</span>
        </div>

      </div>
    </div>
  );
}

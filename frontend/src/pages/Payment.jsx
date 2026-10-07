// frontend/src/pages/Payment.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Smartphone, Building, Truck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { INITIAL_ADDRESSES } from '../data/mockData';
import api from '../services/api';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart, showToast, currentUser } = useCart();

  const stateData = location.state || {};
  const addBlouseCustomization = stateData.addBlouseCustomization || false;
  const discountAmount = stateData.discountAmount || 0;
  const blousePrice = addBlouseCustomization ? 1850 : 0;
  const finalTotal = stateData.finalTotal || Math.max(0, cartSubtotal + blousePrice - discountAmount);

  // Dynamic user address list fallback
  const savedAddressList = (currentUser?.addresses && currentUser.addresses.length > 0)
    ? currentUser.addresses.map((a, idx) => ({
        id: a._id || `addr-user-${idx}`,
        label: a.addressType || 'Home',
        fullName: currentUser.name || 'Customer',
        phone: currentUser.phone || '',
        address: a.street || '',
        additionalInfo: a.landmark || '',
        city: `${a.city || ''}, ${a.state || ''}`,
        pincode: a.pincode || '',
        isDefault: a.isDefault || idx === 0
      }))
    : currentUser
    ? [
        {
          id: 'addr-curr-user',
          label: 'Default Address',
          fullName: currentUser.name || 'Customer',
          phone: currentUser.phone || '',
          address: currentUser.addresses?.[0]?.street || 'Main Street, Malabar Hill',
          additionalInfo: '',
          city: currentUser.addresses?.[0]?.city || 'Mumbai, Maharashtra',
          pincode: currentUser.addresses?.[0]?.pincode || '400001',
          isDefault: true
        }
      ]
    : INITIAL_ADDRESSES;

  // Address state
  const [selectedAddressId, setSelectedAddressId] = useState(() => savedAddressList[0]?.id || 'addr-01');
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.addresses?.[0]?.street || '',
    landmark: currentUser?.addresses?.[0]?.landmark || '',
    city: currentUser?.addresses?.[0]?.city || 'Mumbai',
    state: currentUser?.addresses?.[0]?.state || 'Maharashtra',
    pincode: currentUser?.addresses?.[0]?.pincode || '400001',
    addressType: 'Home'
  });

  // Sync shippingForm when currentUser loads
  React.useEffect(() => {
    if (currentUser) {
      setShippingForm((prev) => ({
        ...prev,
        fullName: currentUser.name || prev.fullName,
        phone: currentUser.phone || prev.phone,
        address: currentUser.addresses?.[0]?.street || prev.address,
        city: currentUser.addresses?.[0]?.city || prev.city,
        state: currentUser.addresses?.[0]?.state || prev.state,
        pincode: currentUser.addresses?.[0]?.pincode || prev.pincode
      }));
    }
  }, [currentUser]);

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard' | 'express'
  const expressFee = deliveryMethod === 'express' ? 450 : 0;
  const orderGrandTotal = finalTotal + expressFee;

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiId, setUpiId] = useState('royal@okhdfcbank');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8829',
    expiry: '12/28',
    cvv: '•••',
    name: (currentUser?.name || 'AIRAWATI ROYAL PATRON').toUpperCase()
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCompletePayment = async () => {
    // Payment Method Validation
    if (paymentMethod === 'upi') {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,64}@[a-zA-Z]{2,32}$/;
      if (!upiId.trim() || !upiRegex.test(upiId.trim())) {
        showToast('Please enter a valid UPI ID (e.g. 9876543210@upi or name@okhdfcbank)');
        return;
      }
    } else if (paymentMethod === 'card') {
      const cleanNum = (cardDetails.number || '').replace(/\D/g, '');
      if (cleanNum.length < 15 || cleanNum.length > 16) {
        showToast('Please enter a valid 16-digit card number');
        return;
      }
      if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry.trim())) {
        showToast('Please enter a valid expiry date (MM/YY)');
        return;
      }
      const cleanCvv = (cardDetails.cvv || '').replace(/\D/g, '');
      if (!cleanCvv || cleanCvv.length < 3) {
        showToast('Please enter a valid 3-digit CVV');
        return;
      }
    }

    setIsProcessing(true);
    showToast('Securely verifying payment with royal bank gateway...');

    const chosenAddr = savedAddressList.find((a) => a.id === selectedAddressId) || savedAddressList[0];
    const customerName = isNewAddress
      ? (shippingForm.fullName || currentUser?.name || 'Customer')
      : (currentUser?.name || chosenAddr?.fullName || 'Customer');
    const customerEmail = (currentUser?.email || 'customer@airawati.com').toLowerCase().trim();
    const customerPhone = isNewAddress
      ? (shippingForm.phone || currentUser?.phone || '')
      : (currentUser?.phone || chosenAddr?.phone || shippingForm.phone || '');

    const streetAddress = isNewAddress
      ? (shippingForm.address || 'Address Line')
      : (chosenAddr?.address || chosenAddr?.street || currentUser?.addresses?.[0]?.street || 'Address on file');
    const city = isNewAddress ? (shippingForm.city || 'Bhopal') : (chosenAddr?.city || currentUser?.addresses?.[0]?.city || 'Bhopal');
    const state = isNewAddress ? (shippingForm.state || 'Madhya Pradesh') : (chosenAddr?.state || currentUser?.addresses?.[0]?.state || 'Madhya Pradesh');
    const pincode = isNewAddress ? (shippingForm.pincode || '462001') : (chosenAddr?.pincode || chosenAddr?.postalCode || currentUser?.addresses?.[0]?.pincode || '462001');

    const orderPayload = {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress: {
        street: streetAddress,
        city: city,
        state: state,
        pincode: pincode,
        phone: customerPhone
      },
      paymentMethod: paymentMethod.toUpperCase(),
      subtotal: finalTotal,
      shippingCost: expressFee,
      totalAmount: orderGrandTotal,
      items: cart.map((it) => ({
        product: it.id || it._id,
        sku: it.sku || '',
        title: it.title,
        price: it.price,
        quantity: it.quantity || 1,
        image: it.image,
        fabric: it.fabric || 'Pure Silk Handloom'
      }))
    };

    let generatedOrderNum = 'AWT' + Math.floor(10000 + Math.random() * 90000);

    try {
      const res = await api.orders.create(orderPayload);
      if (res && res.order) {
        generatedOrderNum = res.order.orderNumber;
      }
    } catch (err) {
      console.warn('Backend order creation offline fallback:', err.message);
    }

    setIsProcessing(false);
    const newOrder = {
      id: 'order-' + Date.now(),
      orderNumber: generatedOrderNum,
      placedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'CONFIRMED',
      statusLabel: 'Order Confirmed',
      totalAmount: orderGrandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      shippingAddress: `${streetAddress}, ${city}, ${state} ${pincode}`,
      items: [...cart],
      addBlouseCustomization
    };

    // Store in localStorage for persistence across OrderConfirm and Account views
    const existingOrders = JSON.parse(localStorage.getItem('airawati_user_orders') || '[]');
    localStorage.setItem('airawati_user_orders', JSON.stringify([newOrder, ...existingOrders]));
    localStorage.setItem('airawati_last_order', JSON.stringify(newOrder));

    clearCart();
    navigate(`/order-confirm?orderNumber=${generatedOrderNum}`);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1E060D] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* STEP PROGRESS INDICATOR */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-stone-200 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 w-2/3 h-[2px] bg-[#5C1329] -translate-y-1/2 z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold ring-4 ring-[#FAF6F0]">
                ✓
              </div>
              <span className="text-[11px] font-medium text-emerald-800 uppercase tracking-wider mt-2">Bag Review</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#5C1329] text-white flex items-center justify-center text-xs font-bold ring-4 ring-[#FAF6F0]">
                2
              </div>
              <span className="text-[11px] font-semibold text-[#5C1329] uppercase tracking-wider mt-2">Delivery & Pay</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-300 text-stone-500 flex items-center justify-center text-xs font-bold ring-4 ring-[#FAF6F0]">
                3
              </div>
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider mt-2">Confirmation</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#5C1329] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Bag Review</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: SHIPPING ADDRESS & METHOD (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. SHIPPING ADDRESS */}
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-[#C5A059]/20">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
                <h2 className="font-serif text-xl sm:text-2xl text-[#5C1329] font-normal">
                  1. Shipping & Delivery Address
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsNewAddress(false)}
                    className={`text-[11px] uppercase font-semibold tracking-wider px-3 py-1 rounded transition-colors ${
                      !isNewAddress ? 'bg-[#5C1329] text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    Saved Address
                  </button>
                  <button
                    onClick={() => setIsNewAddress(true)}
                    className={`text-[11px] uppercase font-semibold tracking-wider px-3 py-1 rounded transition-colors ${
                      isNewAddress ? 'bg-[#5C1329] text-white' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    + New Address
                  </button>
                </div>
              </div>

              {!isNewAddress ? (
                <div className="space-y-3">
                  {savedAddressList.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-[#5C1329] bg-stone-50 ring-1 ring-[#5C1329]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="address_select"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 text-[#5C1329] focus:ring-[#5C1329]"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-xs text-stone-900">{addr.fullName}</span>
                              <span className="text-[10px] bg-[#C5A059]/20 text-[#5C1329] px-2 py-0.5 rounded font-medium">
                                {addr.label}
                              </span>
                              {addr.isDefault && (
                                <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-600 leading-relaxed">
                              {addr.address}, {addr.additionalInfo}
                            </p>
                            <p className="text-xs text-stone-600">
                              {addr.city} — <strong className="text-stone-800">{addr.pincode}</strong>
                            </p>
                            <p className="text-xs text-stone-500 mt-1">Phone: {addr.phone}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        Mobile Number (For Courier OTP) *
                      </label>
                      <input
                        type="tel"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Flat / House No. / Building Name / Street *
                    </label>
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full text-xs p-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.pincode}
                        onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded bg-[#FAF6F0]/40 focus:outline-none focus:border-[#5C1329]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. DELIVERY METHOD */}
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-[#C5A059]/20">
              <h2 className="font-serif text-xl sm:text-2xl text-[#5C1329] font-normal pb-4 border-b border-stone-100 mb-4">
                2. Shipping Speed & Handling
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-[#5C1329] bg-[#FAF6F0]/50 ring-1 ring-[#5C1329]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="mt-1 text-[#5C1329] focus:ring-[#5C1329]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#5C1329]" />
                        <span className="text-xs font-bold text-stone-900">Royal Handloom Courier</span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">Delivery in 3-5 business days</p>
                      <span className="text-xs font-semibold text-emerald-700 mt-1 block">FREE</span>
                    </div>
                  </div>
                </label>

                <label
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-[#5C1329] bg-[#FAF6F0]/50 ring-1 ring-[#5C1329]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery_method"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="mt-1 text-[#5C1329] focus:ring-[#5C1329]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-bold text-stone-900">Priority Air Express</span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">Guaranteed 24-48 hr dispatch</p>
                      <span className="text-xs font-semibold text-[#5C1329] mt-1 block">+₹450</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. PAYMENT METHOD (UPI / CARD / NETBANKING / COD) */}
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-[#C5A059]/20">
              <h2 className="font-serif text-xl sm:text-2xl text-[#5C1329] font-normal pb-4 border-b border-stone-100 mb-5">
                3. Choose Payment Method
              </h2>

              <div className="space-y-4">
                {/* UPI Option */}
                <div className={`p-4 rounded-lg border transition-all ${paymentMethod === 'upi' ? 'border-[#5C1329] bg-stone-50' : 'border-stone-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-[#5C1329] focus:ring-[#5C1329]"
                    />
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#5C1329]" />
                      <span className="text-xs font-bold text-stone-900">UPI Instant Payment (Google Pay / PhonePe / Paytm / BHIM)</span>
                    </div>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-stone-200 pl-7">
                      <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">
                        Enter UPI VPA / ID
                      </label>
                      <div className="flex gap-2 max-w-sm">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@upi"
                          className="flex-1 text-xs p-2 border border-stone-300 rounded bg-white focus:outline-none focus:border-[#5C1329]"
                        />
                        <button
                          type="button"
                          className="bg-[#5C1329] text-white text-xs px-3 py-1.5 rounded font-medium hover:bg-[#430D1E]"
                        >
                          Verify
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2">
                        A payment request will be sent directly to your UPI banking app.
                      </p>
                    </div>
                  )}
                </div>

                {/* Credit / Debit Card Option */}
                <div className={`p-4 rounded-lg border transition-all ${paymentMethod === 'card' ? 'border-[#5C1329] bg-stone-50' : 'border-stone-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-[#5C1329] focus:ring-[#5C1329]"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#5C1329]" />
                      <span className="text-xs font-bold text-stone-900">Credit / Debit Card (Visa, MasterCard, RuPay, Amex)</span>
                    </div>
                  </label>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-stone-200 pl-7 space-y-3 max-w-md">
                      <div>
                        <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full text-xs p-2 border border-stone-300 rounded bg-white focus:outline-none focus:border-[#5C1329]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">Valid Thru (MM/YY)</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full text-xs p-2 border border-stone-300 rounded bg-white focus:outline-none focus:border-[#5C1329]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-stone-600 mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="w-full text-xs p-2 border border-stone-300 rounded bg-white focus:outline-none focus:border-[#5C1329]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Net Banking Option */}
                <div className={`p-4 rounded-lg border transition-all ${paymentMethod === 'netbanking' ? 'border-[#5C1329] bg-stone-50' : 'border-stone-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="text-[#5C1329] focus:ring-[#5C1329]"
                    />
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#5C1329]" />
                      <span className="text-xs font-bold text-stone-900">Net Banking (All Indian Major Banks)</span>
                    </div>
                  </label>

                  {paymentMethod === 'netbanking' && (
                    <div className="mt-4 pt-3 border-t border-stone-200 pl-7 max-w-sm">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full text-xs p-2 border border-stone-300 rounded bg-white focus:outline-none focus:border-[#5C1329]"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery */}
                <div className={`p-4 rounded-lg border transition-all ${paymentMethod === 'cod' ? 'border-[#5C1329] bg-stone-50' : 'border-stone-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment_select"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#5C1329] focus:ring-[#5C1329]"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900">Cash on Delivery (Handloom Doorstep Verification)</span>
                      <p className="text-[10px] text-stone-500 mt-0.5">Pay via cash or UPI upon delivery inspection.</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: FINAL SUMMARY & PAY BUTTON (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-[#C5A059]/30 sticky top-24">
              <h3 className="font-serif text-xl text-[#5C1329] pb-3 border-b border-stone-100 mb-4">
                Grand Total Breakdown
              </h3>

              {/* Items in order */}
              <div className="space-y-3 mb-5 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <img src={item.image} alt={item.title} className="w-12 h-14 object-cover rounded border border-stone-200 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-800 truncate">{item.title}</p>
                      <p className="text-[10px] text-stone-500">Qty: {item.quantity} &bull; {item.fabric}</p>
                    </div>
                    <span className="font-semibold text-stone-900 shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-4 mb-5">
                <div className="flex justify-between">
                  <span>Saree Items Total</span>
                  <span className="font-medium text-stone-800">₹{cartSubtotal.toLocaleString()}</span>
                </div>

                {addBlouseCustomization && (
                  <div className="flex justify-between text-[#5C1329]">
                    <span>Boutique Blouse Tailoring</span>
                    <span className="font-medium">+₹1,850</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span className="font-medium">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Handling</span>
                  <span className="font-medium text-stone-800">
                    {deliveryMethod === 'express' ? '+₹450' : 'FREE'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Silk Mark Authentication</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm">
                  <span className="font-serif text-base font-semibold text-[#5C1329]">Total To Pay</span>
                  <span className="font-serif text-2xl font-bold text-[#5C1329]">
                    ₹{orderGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="w-full bg-[#5C1329] text-[#FAF6F0] py-4 rounded text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#430D1E] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Royal Payment...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#C5A059]" />
                    <span>Pay ₹{orderGrandTotal.toLocaleString()} & Confirm</span>
                  </>
                )}
              </button>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-[10px] text-stone-500 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

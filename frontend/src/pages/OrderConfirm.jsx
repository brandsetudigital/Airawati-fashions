// frontend/src/pages/OrderConfirm.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import SareeCard from '../components/SareeCard';

export default function OrderConfirm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paramOrderNumber = searchParams.get('orderNumber') || 'AWT12345';
  const paramProductId = searchParams.get('id');
  const paramQty = parseInt(searchParams.get('qty'), 10) || 1;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Retrieve the exact order placed from localStorage
    const saved = localStorage.getItem('airawati_last_order');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setOrder(parsed);
        return;
      } catch (e) {
        console.error(e);
      }
    }

    // Fallback: build order object dynamically using query params
    const matchedProduct = PRODUCTS.find((p) => p.id === paramProductId) || PRODUCTS[0];
    setOrder({
      orderNumber: paramOrderNumber,
      product: matchedProduct,
      qty: paramQty,
      itemTotal: (matchedProduct.price || 8150) * paramQty,
      total: (matchedProduct.price || 8150) * paramQty,
      shippingAddress: {
        name: 'Ms. Aditi Sharma',
        address: '789 Green Avenue',
        city: 'Jaipur, Rajasthan',
        pinCode: '302001',
        country: 'India',
        email: 'hello@example.com'
      }
    });
  }, [paramOrderNumber, paramProductId, paramQty]);

  // If order hasn't loaded yet, fallback to default product
  const product = order?.product || PRODUCTS[0];
  const qty = order?.qty || 1;
  const orderNumber = order?.orderNumber || paramOrderNumber;
  const total = order?.total || (product.price || 8150) * qty;
  const itemTotal = order?.itemTotal || total;
  const shippingAddress = order?.shippingAddress || {
    name: 'Ms. Aditi Sharma',
    address: '789 Green Avenue',
    city: 'Jaipur, Rajasthan',
    pinCode: '302001',
    country: 'India',
    email: 'hello@example.com'
  };

  const recommendedSarees = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#FAF2EE]/50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* TOP ROW: BACK ARROW (Matching Screenshot 4) */}
        <div className="mb-3">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            aria-label="Go to shop"
            className="p-1 text-[#4A151B] hover:text-[#1E060D] transition-colors"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* TOP CENTER: CONFIRMATION CIRCULAR CHECKMARK & TITLES */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#EED6D8] flex items-center justify-center text-stone-900 text-lg font-bold mx-auto mb-3 shadow-sm">
            <Check className="w-6 h-6 text-stone-900 stroke-[3]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A151B]">
            Order Confirmed!
          </h1>
          <p className="text-sm font-semibold text-stone-700 mt-1.5">
            Thank you for your purchase.
          </p>
        </div>

        {/* 2-CARD GRID LAYOUT (Matching Screenshot 4) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT CARD: ORDER NUMBER & SHIPPING ADDRESS (6 cols) */}
          <div className="md:col-span-6 bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-stone-200">
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#4A151B] pb-3 border-b border-stone-200">
              Order Number
            </h2>

            {/* ORDER NUMBER & TOTAL */}
            <div className="py-3.5 flex justify-between items-center text-sm font-semibold text-stone-900">
              <span>Order Number</span>
              <span className="font-mono font-bold text-[#4A151B]">#{orderNumber}</span>
            </div>

            <div className="pb-3.5 flex justify-between items-center text-sm font-semibold text-stone-900 border-b border-stone-200">
              <span>Order Total</span>
              <span className="font-bold text-[#4A151B]">₹ {total.toLocaleString()}</span>
            </div>

            {/* SHIPPING ADDRESS */}
            <div className="pt-4 text-sm text-stone-900 space-y-1">
              <p className="font-bold text-[#4A151B] text-sm mb-1.5">
                Shipping Address
              </p>
              <p className="text-stone-900 font-bold">{shippingAddress.name}</p>
              <p className="text-stone-800 font-medium">{shippingAddress.address}</p>
              <p className="text-stone-800 font-medium">{shippingAddress.city}, {shippingAddress.pinCode}</p>
              <p className="text-stone-800 font-medium">{shippingAddress.country}</p>

              <p className="text-xs sm:text-sm text-stone-700 font-medium pt-4 leading-relaxed">
                A confirmation email has been sent to <strong className="text-stone-900">{shippingAddress.email}</strong>. Please keep it for your records as it contains your order details and tracking information.
              </p>
            </div>
          </div>

          {/* RIGHT CARD: ORDER SUMMARY (6 cols) */}
          <div className="md:col-span-6 bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-stone-200">
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#4A151B] pb-3 border-b border-stone-200">
              Order Summary
            </h2>

            {/* EXACT SELECTED PRODUCT PREVIEW */}
            <div className="flex items-center gap-4 py-4 border-b border-stone-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-20 object-cover rounded-md shadow-sm border border-stone-200 shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 truncate">
                  {product.shortTitle || product.title}
                </h3>
                <p className="text-xs font-semibold text-stone-700 mt-1">
                  {product.fabric || 'Banarasi Saree'}
                </p>
                <p className="text-xs font-bold text-stone-800 mt-0.5">
                  Qty: {qty}
                </p>
              </div>
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

            {/* ACTION BUTTONS (Matching Screenshot 4) */}
            <div className="pt-5 flex gap-3">
              <Link
                to="/shop"
                className="flex-1 py-3 px-3 text-center rounded-lg border border-stone-300 text-[#4A151B] font-bold text-xs sm:text-sm hover:bg-[#FAF2EE] transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={() => navigate(`/account?tab=orders&viewOrder=${orderNumber}`)}
                className="flex-1 py-3 px-3 text-center rounded-lg bg-[#4A151B] hover:bg-[#380E13] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                View Order
              </button>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: YOU MAY ALSO LIKE (Matching Screenshot 5) */}
        <section className="mt-14 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B] uppercase tracking-wider mb-8">
            YOU MAY ALSO LIKE
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
            {recommendedSarees.map((saree) => (
              <SareeCard key={saree.id} product={saree} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

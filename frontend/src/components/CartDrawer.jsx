// frontend/src/components/CartDrawer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQty,
    cartSubtotal,
    freeShippingProgress,
    freeShippingThreshold
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/**/}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#C5A059]/30">
          
          {/**/}
          <div className="p-5 border-b border-[#C5A059]/20 flex items-center justify-between bg-white/70">
            <h3 className="font-serif text-xl font-bold text-[#5C1329]">Your Shopping Bag</h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-stone-500 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/**/}
          <div className="p-4 bg-white/50 border-b border-[#C5A059]/10">
            <div className="flex justify-between text-xs text-stone-600 mb-1.5 font-medium">
              <span>{cartSubtotal >= freeShippingThreshold ? '🎉 Free Shipping Unlocked!' : `Add ₹${(freeShippingThreshold - cartSubtotal).toLocaleString()} for Free Shipping`}</span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5C1329] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>

          {/**/}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-stone-500">
                <p className="text-sm">Your shopping bag is empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-5 py-2 bg-[#5C1329] text-white rounded-full text-xs font-semibold"
                >
                  Explore Sarees
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-3 bg-white rounded-xl border border-[#C5A059]/20 flex gap-3 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 rounded-lg object-cover border border-[#C5A059]/20"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-xs text-[#1E060D] line-clamp-1">{item.shortTitle || item.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-500">{item.fabric}</p>
                      <p className="text-xs font-bold text-[#5C1329] mt-1">₹{item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center border border-[#C5A059]/30 rounded overflow-hidden w-fit bg-[#FAF6F0]">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-[#C5A059]/10"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-[#C5A059]/10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/**/}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#C5A059]/20 space-y-3">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-sm text-[#5C1329]">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-stone-400">Shipping & taxes calculated at checkout.</p>
              
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 bg-[#5C1329] hover:bg-[#430D1E] text-white rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

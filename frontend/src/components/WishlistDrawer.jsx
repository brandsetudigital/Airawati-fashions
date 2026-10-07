// frontend/src/components/WishlistDrawer.jsx
import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/**/}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen sm:w-[420px] max-w-full bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#C5A059]/30">
          
          {/**/}
          <div className="p-4 sm:p-5 border-b border-[#C5A059]/20 flex items-center justify-between bg-white/70">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5C1329]">Saved Sarees ({wishlist.length})</h3>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/**/}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 text-stone-500">
                <p className="text-sm">No sarees saved in your wishlist yet.</p>
              </div>
            ) : (
              wishlist.map((item) => (
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
                          onClick={() => toggleWishlist(item)}
                          className="text-stone-400 hover:text-red-600 ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-500">{item.fabric}</p>
                      <p className="text-xs font-bold text-[#5C1329] mt-1">₹{item.price.toLocaleString()}</p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(item, 1);
                        toggleWishlist(item);
                      }}
                      className="mt-2 w-full py-1.5 bg-[#5C1329] hover:bg-[#430D1E] text-white rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

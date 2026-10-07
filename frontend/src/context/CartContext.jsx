// frontend/src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

const CartContext = createContext();

const getUserKey = (user) => {
  if (!user) return 'guest';
  if (user.email && user.email.trim()) return user.email.trim().toLowerCase();
  if (user.id || user._id) return String(user.id || user._id);
  return 'guest';
};

const getStoredCartForUser = (userKey) => {
  try {
    const raw = localStorage.getItem(`airawati_cart_${userKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return null;
};

const getStoredWishlistForUser = (userKey) => {
  try {
    const raw = localStorage.getItem(`airawati_wishlist_${userKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return null;
};

export function CartProvider({ children }) {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('airawati_token');
    const saved = localStorage.getItem('airawati_is_logged_in');
    return Boolean(token && saved === 'true');
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('airawati_token');
    const saved = localStorage.getItem('airawati_auth_user');
    if (token && saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Cart state: start with user-scoped cart or session cart
  const [cart, setCart] = useState(() => {
    const token = localStorage.getItem('airawati_token');
    const savedUser = localStorage.getItem('airawati_auth_user');
    let uKey = 'guest';
    if (token && savedUser) {
      try {
        const u = JSON.parse(savedUser);
        uKey = getUserKey(u);
      } catch (e) {}
    }
    const userCart = getStoredCartForUser(uKey);
    if (userCart && userCart.length > 0) return userCart;

    const saved = localStorage.getItem('airawati_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  // Wishlist state: start with user-scoped wishlist or session wishlist
  const [wishlist, setWishlist] = useState(() => {
    const token = localStorage.getItem('airawati_token');
    const savedUser = localStorage.getItem('airawati_auth_user');
    let uKey = 'guest';
    if (token && savedUser) {
      try {
        const u = JSON.parse(savedUser);
        uKey = getUserKey(u);
      } catch (e) {}
    }
    const userWl = getStoredWishlistForUser(uKey);
    if (userWl && userWl.length > 0) return userWl;

    const saved = localStorage.getItem('airawati_wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  // Drawer & Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin'); // 'signin' | 'signup' | 'otp'
  const [otpEmail, setOtpEmail] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Persist cart to active & user-scoped storage
  useEffect(() => {
    localStorage.setItem('airawati_cart', JSON.stringify(cart));
    const uKey = getUserKey(currentUser);
    localStorage.setItem(`airawati_cart_${uKey}`, JSON.stringify(cart));
  }, [cart, currentUser]);

  // Persist wishlist to active & user-scoped storage
  useEffect(() => {
    localStorage.setItem('airawati_wishlist', JSON.stringify(wishlist));
    const uKey = getUserKey(currentUser);
    localStorage.setItem(`airawati_wishlist_${uKey}`, JSON.stringify(wishlist));
  }, [wishlist, currentUser]);

  // Auto-sync cart and wishlist to MongoDB in background
  const syncTimerRef = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem('airawati_token');
    if (isLoggedIn && token && currentUser) {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
      syncTimerRef.current = setTimeout(() => {
        api.auth.updateCartWishlist({ cart, wishlist }).catch(() => {});
      }, 700);
    }
    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
  }, [cart, wishlist, isLoggedIn, currentUser]);

  // Sync fresh cart & wishlist from backend on app load / auth state change
  useEffect(() => {
    const token = localStorage.getItem('airawati_token');
    if (token && isLoggedIn) {
      api.auth.getCartWishlist()
        .then((res) => {
          if (res && res.success) {
            const uKey = getUserKey(currentUser);
            if (Array.isArray(res.cart) && res.cart.length > 0) {
              setCart(res.cart);
              localStorage.setItem('airawati_cart', JSON.stringify(res.cart));
              localStorage.setItem(`airawati_cart_${uKey}`, JSON.stringify(res.cart));
            }
            if (Array.isArray(res.wishlist) && res.wishlist.length > 0) {
              setWishlist(res.wishlist);
              localStorage.setItem('airawati_wishlist', JSON.stringify(res.wishlist));
              localStorage.setItem(`airawati_wishlist_${uKey}`, JSON.stringify(res.wishlist));
            }
          }
        })
        .catch(() => {});
    }
  }, [isLoggedIn]);

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem('airawati_token', token);
    }
    const user = userData || { name: 'Customer', email: '' };
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem('airawati_is_logged_in', 'true');
    localStorage.setItem('airawati_auth_user', JSON.stringify(user));

    const uKey = getUserKey(user);

    // 1. Recover user's saved items from server response or user-scoped storage
    const serverCart = Array.isArray(user.cart) ? user.cart : [];
    const localUserCart = getStoredCartForUser(uKey) || [];
    const baseCart = serverCart.length > 0 ? serverCart : localUserCart;

    const serverWl = Array.isArray(user.wishlist) ? user.wishlist : [];
    const localUserWl = getStoredWishlistForUser(uKey) || [];
    const baseWl = serverWl.length > 0 ? serverWl : localUserWl;

    // 2. Intelligently merge any items the user added while browsing as guest
    const mergedCart = [...baseCart];
    cart.forEach((guestItem) => {
      const idx = mergedCart.findIndex((it) => it.id === guestItem.id || it.id === guestItem._id);
      if (idx >= 0) {
        mergedCart[idx].quantity = Math.max(mergedCart[idx].quantity, guestItem.quantity);
      } else {
        mergedCart.push(guestItem);
      }
    });

    const mergedWl = [...baseWl];
    wishlist.forEach((guestItem) => {
      const exists = mergedWl.some((it) => it.id === guestItem.id || it.id === guestItem._id);
      if (!exists) {
        mergedWl.push(guestItem);
      }
    });

    setCart(mergedCart);
    setWishlist(mergedWl);

    localStorage.setItem('airawati_cart', JSON.stringify(mergedCart));
    localStorage.setItem(`airawati_cart_${uKey}`, JSON.stringify(mergedCart));
    localStorage.setItem('airawati_wishlist', JSON.stringify(mergedWl));
    localStorage.setItem(`airawati_wishlist_${uKey}`, JSON.stringify(mergedWl));

    // Clear temporary guest storage
    localStorage.removeItem('airawati_cart_guest');
    localStorage.removeItem('airawati_wishlist_guest');

    // Sync merged state to MongoDB
    if (token || localStorage.getItem('airawati_token')) {
      api.auth.updateCartWishlist({ cart: mergedCart, wishlist: mergedWl }).catch(() => {});
    }

    showToast(`Welcome back, ${user.name}! Signed in successfully.`);
  };

  const logout = () => {
    const uKey = getUserKey(currentUser);

    // 1. Save current cart & wishlist for this user BEFORE logging out
    if (currentUser) {
      localStorage.setItem(`airawati_cart_${uKey}`, JSON.stringify(cart));
      localStorage.setItem(`airawati_wishlist_${uKey}`, JSON.stringify(wishlist));
      // Best-effort final save to database
      api.auth.updateCartWishlist({ cart, wishlist }).catch(() => {});
    }

    // 2. Clear authentication tokens and session
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.setItem('airawati_is_logged_in', 'false');
    localStorage.removeItem('airawati_token');
    localStorage.removeItem('airawati_auth_user');
    localStorage.removeItem('airawati_user_profile');

    // 3. Clear active screen state for subsequent guest session
    setCart([]);
    setWishlist([]);
    localStorage.removeItem('airawati_cart');
    localStorage.removeItem('airawati_wishlist');

    // Note: airawati_cart_${uKey} and airawati_wishlist_${uKey} are safely kept!
    showToast('Logged out of Airawati successfully.');
  };

  // Toast trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const prodId = product.id || product._id;
      const size = product.selectedSize || product.size || '';
      const existing = prev.find(item => 
        (item.id === prodId || item._id === prodId) && (item.selectedSize || '') === size
      );
      if (existing) {
        return prev.map(item =>
          ((item.id === prodId || item._id === prodId) && (item.selectedSize || '') === size)
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }
      return [...prev, {
        id: prodId,
        title: product.title,
        shortTitle: product.shortTitle || product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        fabric: product.fabric,
        category: product.category,
        sku: product.sku,
        selectedSize: size,
        quantity: qty
      }];
    });
    showToast(`Added "${product.shortTitle || product.title}" ${product.selectedSize ? `(Size: ${product.selectedSize})` : ''} to bag! 🛍️`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId && item._id !== productId));
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId || item._id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id || item._id === product.id || (product._id && item.id === product._id));
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter(item => item.id !== product.id && item.id !== product._id);
      } else {
        showToast(`Added to wishlist! ❤️`);
        return [...prev, {
          id: product.id || product._id,
          title: product.title,
          shortTitle: product.shortTitle || product.title,
          price: product.price,
          image: product.image,
          fabric: product.fabric
        }];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId && item._id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId || item._id === productId);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const freeShippingThreshold = 20000;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      cartSubtotal,
      cartCount,
      freeShippingProgress,
      freeShippingThreshold,
      wishlist,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isAuthOpen,
      setIsAuthOpen,
      authTab,
      setAuthTab,
      otpEmail,
      setOtpEmail,
      quickViewProduct,
      setQuickViewProduct,
      toastMessage,
      showToast,
      isLoggedIn,
      currentUser,
      login,
      logout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

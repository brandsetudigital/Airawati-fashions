// frontend/src/context/AdminContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Fallback initial data in case server is starting
const INITIAL_ORDERS = [
  {
    id: 'AWT12345',
    orderNumber: 'AWT12345',
    customer: 'Aditi Sharma',
    customerName: 'Aditi Sharma',
    email: 'aditi.sharma@example.com',
    phone: '+91 8982065895',
    product: 'Rakashi Olive Banarasi Saree',
    amount: 8150,
    totalAmount: 8150,
    date: 'Today',
    orderDate: 'Today, 10:45 AM',
    payment: 'Paid',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    orderStatus: 'Confirmed',
    address: 'B-402, Lotus Grandeur, Linking Road, Bandra West, Mumbai 400050'
  }
];

export const AdminProvider = ({ children }) => {
  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('airawati_admin_auth') === 'true';
  });

  // Admin profile state
  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('airawati_admin_profile');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Airawati Admin',
          email: 'admin@airawati.com',
          supportEmail: 'hello@airawati.com',
          role: 'Admin',
          avatar: '/images/admin_avatar.jpg',
          bio: 'Airawati Handloom administration console.',
          lastLogin: 'Today, 11:40 AM',
          ip: '127.0.0.1 - Localhost'
        };
  });

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminNotification, setAdminNotification] = useState(null);

  const showNotification = (msg) => {
    setAdminNotification(msg);
    setTimeout(() => {
      setAdminNotification(null);
    }, 3500);
  };

  // Fetch live products, orders, and stats from MongoDB backend
  const fetchBackendData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Products (Public endpoint - always load)
      const prodRes = await api.products.getAll();
      if (prodRes && prodRes.products) {
        setProducts(
          prodRes.products.map((p) => ({
            id: p._id,
            sku: p.sku,
            name: p.title,
            title: p.title,
            shortTitle: p.shortTitle,
            category: p.category,
            price: p.price,
            originalPrice: p.originalPrice,
            stock: p.stock,
            stockStatus: p.stock > 0 ? 'In Stock' : 'Out of Stock',
            unitsSold: p.unitsSold || 0,
            status: p.status,
            image: p.image,
            thumbnails: p.thumbnails || (p.image ? [p.image] : []),
            gallery: p.thumbnails || (p.image ? [p.image] : []),
            description: p.description,
            fabricDetails: p.fabricDetails,
            careInstructions: p.careInstructions,
            lowStockAlert: p.lowStockAlert || 3
          }))
        );
      }

      // ONLY fetch protected admin endpoints if admin is actually logged in
      const adminToken = localStorage.getItem('airawati_admin_token');
      if (!isAdminLoggedIn || !adminToken) {
        return;
      }

      // 2. Fetch Orders (Protected)
      const orderRes = await api.orders.getAll();
      if (orderRes && orderRes.orders) {
        setOrders(
          orderRes.orders.map((o) => ({
            id: o._id,
            orderNumber: o.orderNumber,
            customer: o.customerName,
            customerName: o.customerName,
            email: o.customerEmail,
            phone: o.customerPhone,
            product: o.items && o.items.length > 0 ? o.items[0].title : 'Handloom Saree',
            items: o.items,
            amount: o.totalAmount,
            totalAmount: o.totalAmount,
            date: o.orderDateFormatted || new Date(o.createdAt).toLocaleDateString(),
            orderDate: o.orderDateFormatted || new Date(o.createdAt).toLocaleString(),
            payment: o.paymentStatus || 'Paid',
            paymentStatus: o.paymentStatus || 'Paid',
            status: o.orderStatus || 'Confirmed',
            orderStatus: o.orderStatus || 'Confirmed',
            address: typeof o.shippingAddress === 'string'
              ? o.shippingAddress
              : `${o.shippingAddress?.street || ''}, ${o.shippingAddress?.city || ''}, ${o.shippingAddress?.pincode || ''}`
          }))
        );
      }

      // 3. Fetch Dashboard Stats (Protected)
      const statsRes = await api.admin.getDashboardStats();
      if (statsRes && statsRes.stats) {
        setDashboardStats(statsRes.stats);
      }

      // 4. Fetch Customers (Protected)
      const custRes = await api.admin.getCustomers();
      if (custRes && custRes.customers) {
        setCustomers(custRes.customers);
      }
    } catch (err) {
      console.warn('Backend data notice:', err.message);
      if (err.message && err.message.includes('401')) {
        setIsAdminLoggedIn(false);
        localStorage.removeItem('airawati_admin_auth');
        localStorage.removeItem('airawati_admin_token');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, [isAdminLoggedIn]);

  // Auth methods
  const adminLogin = async (email, password) => {
    try {
      const res = await api.auth.adminLogin({ email, password });
      if (res && res.success) {
        setIsAdminLoggedIn(true);
        localStorage.setItem('airawati_admin_auth', 'true');
        localStorage.setItem('airawati_admin_token', res.token);
        if (!localStorage.getItem('airawati_token')) {
          localStorage.setItem('airawati_token', res.token);
        }
        if (res.admin) {
          const profile = {
            name: res.admin.name || 'Airawati Admin',
            email: res.admin.email || email,
            supportEmail: 'hello@airawati.com',
            role: 'Admin',
            avatar: res.admin.avatar || '/images/admin_avatar.jpg',
            bio: 'Airawati Handloom administration console.',
            lastLogin: 'Just now',
            ip: '127.0.0.1 - Localhost'
          };
          setAdminProfile(profile);
          localStorage.setItem('airawati_admin_profile', JSON.stringify(profile));
        }
        showNotification('Welcome back, Admin!');
        await fetchBackendData();
        return { success: true };
      }
      return { success: false, error: res?.message || 'Invalid admin credentials' };
    } catch (err) {
      console.warn('Admin login notice:', err.message);
      return { success: false, error: err.message || 'Invalid admin credentials' };
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('airawati_admin_auth');
    localStorage.removeItem('airawati_admin_token');
    showNotification('Logged out from Admin Console');
  };

  // Orders methods
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.orders.updateStatus(orderId, { status: newStatus });
      showNotification(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
    }
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId || order.orderNumber === orderId
          ? { ...order, status: newStatus, orderStatus: newStatus }
          : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
    showNotification(`Order ${orderId} removed`);
  };

  // Products methods
  const addProduct = async (newProduct) => {
    try {
      const payload = {
        title: newProduct.name || newProduct.title,
        shortTitle: newProduct.name || newProduct.title,
        sku: newProduct.sku,
        category: newProduct.category || 'maheshwari',
        price: Number(newProduct.price),
        originalPrice: Number(newProduct.mrp || newProduct.originalPrice || newProduct.price * 1.2),
        stock: Number(newProduct.stock || 10),
        lowStockAlert: Number(newProduct.lowStockAlert || 3),
        image: newProduct.image || '/images/hero_model.jpg',
        thumbnails: newProduct.gallery || [newProduct.image || '/images/hero_model.jpg'],
        fabric: newProduct.fabricDetails || 'Pure Silk Handloom',
        description: newProduct.description || '',
        careInstructions: newProduct.careInstructions || 'Dry clean only'
      };

      const res = await api.products.create(payload);
      if (res && res.product) {
        const created = {
          id: res.product._id,
          sku: res.product.sku,
          name: res.product.title,
          stock: res.product.stock,
          price: res.product.price,
          status: res.product.status,
          image: res.product.image,
          ...newProduct
        };
        setProducts((prev) => [created, ...prev]);
        showNotification(`Product "${newProduct.name}" added to MongoDB!`);
        return created;
      }
    } catch (err) {
      console.error('Failed to create in backend, updating local state:', err);
    }

    // Local fallback
    const fallback = {
      id: `p-${Date.now()}`,
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      status: Number(newProduct.stock) > 0 ? 'Active' : 'Out of Stock',
      image: newProduct.image || '/images/hero_model.jpg',
      ...newProduct
    };
    setProducts((prev) => [fallback, ...prev]);
    showNotification(`Product "${newProduct.name}" added successfully!`);
    return fallback;
  };

  const updateProduct = async (productId, updatedFields) => {
    try {
      await api.products.update(productId, updatedFields);
      showNotification('Product updated in MongoDB!');
    } catch (err) {
      console.error(err);
    }
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId || p._id === productId) {
          const updated = { ...p, ...updatedFields };
          if (updated.stock !== undefined) {
            updated.stock = Number(updated.stock);
            updated.stockStatus = updated.stock > 0 ? 'In Stock' : 'Out of Stock';
            updated.status = updated.stock > 0 ? 'Active' : 'Out of Stock';
          }
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = async (productId) => {
    try {
      await api.products.delete(productId);
      showNotification('Product deleted from MongoDB');
    } catch (err) {
      console.error(err);
    }
    setProducts((prev) => prev.filter((p) => p.id !== productId && p._id !== productId));
  };

  const updateStock = async (productId, newStock) => {
    try {
      await api.products.updateStock(productId, { stock: newStock });
      showNotification('Stock updated in MongoDB');
    } catch (err) {
      console.error(err);
    }
    updateProduct(productId, { stock: newStock });
  };

  // Profile methods
  const updateProfile = (fields) => {
    setAdminProfile((prev) => ({ ...prev, ...fields }));
    localStorage.setItem('airawati_admin_profile', JSON.stringify({ ...adminProfile, ...fields }));
    showNotification('Admin profile updated!');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminProfile,
        orders,
        products,
        customers,
        dashboardStats,
        loading,
        adminNotification,
        showNotification,
        adminLogin,
        adminLogout,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        updateProfile,
        refreshData: fetchBackendData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

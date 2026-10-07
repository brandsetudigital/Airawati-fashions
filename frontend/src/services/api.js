// frontend/src/services/api.js
// Universal API Client connecting React Frontend to Express + MongoDB Backend

const API_BASE_URL = '/api';

const getAuthHeaders = (endpoint = '', options = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  const isAdminEndpoint =
    endpoint.startsWith('/admin') ||
    endpoint.startsWith('/boutique/consultation') ||
    (endpoint.startsWith('/orders') && !endpoint.includes('my-orders') && method !== 'POST') ||
    (endpoint.startsWith('/products') && method !== 'GET') ||
    (endpoint.startsWith('/categories') && method !== 'GET') ||
    (endpoint.startsWith('/contact') && method === 'GET');

  let token = null;
  if (isAdminEndpoint) {
    // Admin calls: prioritize admin token, fallback to user token
    token = localStorage.getItem('airawati_admin_token') || localStorage.getItem('airawati_token');
  } else {
    // Storefront calls: prioritize customer token, fallback to admin token
    token = localStorage.getItem('airawati_token') || localStorage.getItem('airawati_admin_token');
  }

  const headers = {
    'Content-Type': 'application/json'
  };

  if (token && token.trim() !== '') {
    headers['Authorization'] = `Bearer ${token.trim()}`;
  }

  return headers;
};

// Generic request wrapper with friendly error handling
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(endpoint, options),
      ...(options.headers || {})
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({ message: 'Server returned non-JSON response' }));

    if (!response.ok) {
      // If 401 Unauthorized, automatically purge invalid or expired tokens
      // But NEVER purge stored tokens if this is merely an unsuccessful login attempt
      if (response.status === 401 && !endpoint.includes('/login')) {
        const method = (options.method || 'GET').toUpperCase();
        const isAdmin =
          endpoint.startsWith('/admin') ||
          endpoint.startsWith('/boutique/consultation') ||
          (endpoint.startsWith('/orders') && !endpoint.includes('my-orders') && method !== 'POST') ||
          (endpoint.startsWith('/products') && method !== 'GET');

        if (isAdmin) {
          localStorage.removeItem('airawati_admin_token');
          localStorage.removeItem('airawati_admin_auth');
        } else {
          localStorage.removeItem('airawati_token');
          localStorage.removeItem('airawati_auth_user');
          localStorage.setItem('airawati_is_logged_in', 'false');
        }
      }
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // 1. AUTHENTICATION (Customer & Admin)
  auth: {
    register: (userData) =>
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      }),

    login: (credentials) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      }),

    adminLogin: (credentials) =>
      request('/auth/admin-login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      }),

    verifyCode: (data) =>
      request('/auth/verify-code', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    getProfile: () => request('/auth/me'),

    updateProfile: (profileData) =>
      request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      }),

    getCartWishlist: () => request('/auth/cart-wishlist'),

    updateCartWishlist: (data) =>
      request('/auth/cart-wishlist', {
        method: 'PUT',
        body: JSON.stringify(data)
      })
  },

  // 2. PRODUCTS & INVENTORY CRUD
  products: {
    getAll: (params = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && value !== 'All') {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      return request(`/products${queryString ? `?${queryString}` : ''}`);
    },

    getById: (id) => request(`/products/${id}`),

    create: (productData) =>
      request('/products', {
        method: 'POST',
        body: JSON.stringify(productData)
      }),

    update: (id, productData) =>
      request(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
      }),

    delete: (id) =>
      request(`/products/${id}`, {
        method: 'DELETE'
      }),

    updateStock: (id, stockData) =>
      request(`/products/${id}/stock`, {
        method: 'PATCH',
        body: JSON.stringify(stockData)
      })
  },

  // 3. IMAGE UPLOAD
  upload: {
    uploadImage: (image, filename) =>
      request('/upload', {
        method: 'POST',
        body: JSON.stringify({ image, filename })
      })
  },

  // 4. ORDERS & REAL-TIME STOCK DECREMENT
  orders: {
    create: (orderData) =>
      request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      }),

    getMyOrders: () => request('/orders/my-orders'),

    getById: (id) => request(`/orders/${id}`),

    getAll: (params = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All') searchParams.append(key, value);
      });
      const queryString = searchParams.toString();
      return request(`/orders${queryString ? `?${queryString}` : ''}`);
    },

    updateStatus: (id, statusData) =>
      request(`/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(statusData)
      }),

    cancel: (id, cancelData = {}) =>
      request(`/orders/${id}/cancel`, {
        method: 'PATCH',
        body: JSON.stringify(cancelData)
      })
  },

  // 5. ADMIN DASHBOARD ANALYTICS & CUSTOMERS
  admin: {
    getDashboardStats: () => request('/admin/dashboard-stats'),
    getCustomers: () => request('/admin/customers')
  },

  // 6. CATEGORIES
  categories: {
    getAll: () => request('/categories'),
    create: (data) =>
      request('/categories', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  },

  // 7. BOUTIQUE / BLOUSE CONSULTATIONS
  boutique: {
    createConsultation: (data) =>
      request('/boutique/consultation', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    getConsultations: () => request('/boutique/consultations'),
    updateStatus: (id, status) =>
      request(`/boutique/consultations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      })
  },

  // 8. CONTACT MESSAGES
  contact: {
    send: (data) =>
      request('/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    getAll: () => request('/contact')
  },

  // 9. IMAGE UPLOAD
  upload: {
    uploadImage: (imageData, filename = 'product.jpg') =>
      request('/upload', {
        method: 'POST',
        body: JSON.stringify({ image: imageData, filename })
      })
  },

  // 10. SERVER HEALTH
  health: () => request('/health')
};

export default api;

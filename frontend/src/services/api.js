// StreetCart API Client
// Connects to NestJS backend with automatic fallback to seed data if server is offline

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Fallback seed data in case backend is starting up or disconnected
import { SEED_FALLBACK_SHOPS, SEED_FALLBACK_PRODUCTS } from './seedFallback';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('streetcart_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('streetcart_token', token);
    } else {
      localStorage.removeItem('streetcart_token');
    }
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[StreetCart API Notice] Endpoint ${endpoint} used fallback:`, err.message);
      return null;
    }
  }

  // --- Auth APIs ---
  async login(credentials) {
    const result = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (result && result.token) {
      this.setToken(result.token);
      return result;
    }
    // Fallback demo mock login
    if (credentials.email.includes('owner')) {
      const mockOwner = {
        user: {
          id: 'owner_rahim',
          name: 'Rahim (SM Street)',
          email: credentials.email,
          role: 'shop_owner',
          phone: '+91 98470 12345',
        },
        token: 'mock_jwt_owner_token',
      };
      this.setToken(mockOwner.token);
      return mockOwner;
    } else {
      const mockCustomer = {
        user: {
          id: 'user_arjun',
          name: 'Arjun Nadapuram',
          email: credentials.email,
          role: 'customer',
          phone: '+91 98470 11111',
        },
        token: 'mock_jwt_customer_token',
      };
      this.setToken(mockCustomer.token);
      return mockCustomer;
    }
  }

  async register(userData) {
    const result = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (result && result.token) {
      this.setToken(result.token);
      return result;
    }
    // Fallback registration
    const fallbackUser = {
      user: {
        id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'customer',
        phone: userData.phone || '',
      },
      token: 'mock_jwt_' + Date.now(),
    };
    this.setToken(fallbackUser.token);
    return fallbackUser;
  }

  // --- Shops APIs ---
  async getShops(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);

    const data = await this.request(`/shops?${query.toString()}`);
    if (data && Array.isArray(data)) return data;

    // Fallback
    let shops = [...SEED_FALLBACK_SHOPS];
    if (params.category && params.category !== 'All') {
      shops = shops.filter((s) => s.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      shops = shops.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }
    return shops;
  }

  async getShopByIdOrSlug(idOrSlug) {
    const data = await this.request(`/shops/${idOrSlug}`);
    if (data && data._id) return data;
    return (
      SEED_FALLBACK_SHOPS.find(
        (s) => s.id === idOrSlug || s._id === idOrSlug || s.slug === idOrSlug,
      ) || null
    );
  }

  async getMyShop(ownerId) {
    const data = await this.request('/shops/my-shop');
    if (data && data.shop) return data.shop;
    
    // Check custom shops in localStorage
    try {
      const customShops = JSON.parse(localStorage.getItem('streetcart_custom_shops') || '[]');
      if (ownerId) {
        const found = customShops.find((s) => s.ownerId === ownerId);
        if (found) return found;
        const seedFound = SEED_FALLBACK_SHOPS.find((s) => s.ownerId === ownerId);
        if (seedFound) return seedFound;
      }
      if (customShops.length > 0) return customShops[0];
    } catch (e) {}

    return SEED_FALLBACK_SHOPS[0];
  }

  async saveMyShop(shopData, ownerId = 'owner_rahim') {
    const data = await this.request('/shops/my-shop', {
      method: 'POST',
      body: JSON.stringify(shopData),
    });
    if (data && data.shop) return data.shop;

    try {
      let customShops = JSON.parse(localStorage.getItem('streetcart_custom_shops') || '[]');
      const id = shopData._id || shopData.id || 'shop_' + Date.now();
      const updatedShop = {
        ...SEED_FALLBACK_SHOPS[0],
        ...shopData,
        _id: id,
        id,
        ownerId: shopData.ownerId || ownerId,
        slug: (shopData.name || 'shop').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };
      const idx = customShops.findIndex((s) => (s._id || s.id) === id);
      if (idx > -1) {
        customShops[idx] = updatedShop;
      } else {
        customShops.unshift(updatedShop);
      }
      localStorage.setItem('streetcart_custom_shops', JSON.stringify(customShops));
      return updatedShop;
    } catch (e) {
      return { ...SEED_FALLBACK_SHOPS[0], ...shopData };
    }
  }

  async updateShop(id, updateData) {
    const data = await this.request(`/shops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
    if (data && data.shop) return data.shop;
    const index = SEED_FALLBACK_SHOPS.findIndex((s) => s.id === id || s._id === id);
    if (index > -1) {
      SEED_FALLBACK_SHOPS[index] = { ...SEED_FALLBACK_SHOPS[index], ...updateData };
      return SEED_FALLBACK_SHOPS[index];
    }
    return updateData;
  }

  // --- Products APIs ---
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.shopId) query.append('shopId', params.shopId);
    if (params.search) query.append('search', params.search);
    if (params.hasOffer) query.append('hasOffer', 'true');
    if (params.sort) query.append('sort', params.sort);

    const data = await this.request(`/products?${query.toString()}`);
    if (data && Array.isArray(data)) return data;

    // Fallback
    let products = [...SEED_FALLBACK_PRODUCTS];
    try {
      const customProds = JSON.parse(localStorage.getItem('streetcart_custom_products') || '[]');
      const existingIds = new Set(products.map((p) => p._id || p.id));
      customProds.forEach((cp) => {
        if (!existingIds.has(cp._id || cp.id)) {
          products.unshift(cp);
        }
      });
    } catch (e) {}

    if (params.category && params.category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.shopId) {
      products = products.filter((p) => p.shopId === params.shopId);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.offerTag?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }
    if (params.sort === 'discount_desc') {
      products.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    } else if (params.sort === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    }
    return products;
  }

  async createProduct(productData) {
    const data = await this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    if (data && data.product) return data.product;
    const newProd = {
      _id: 'prod_' + Date.now(),
      id: 'prod_' + Date.now(),
      ...productData,
      discountPercentage: productData.originalPrice > productData.price
        ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)
        : 0,
      createdAt: new Date().toISOString(),
    };
    SEED_FALLBACK_PRODUCTS.unshift(newProd);

    // Persist to localStorage
    try {
      const storedProds = JSON.parse(localStorage.getItem('streetcart_custom_products') || '[]');
      storedProds.unshift(newProd);
      localStorage.setItem('streetcart_custom_products', JSON.stringify(storedProds));
    } catch (e) {}

    return newProd;
  }

  async deleteProduct(id) {
    const data = await this.request(`/products/${id}`, { method: 'DELETE' });
    const idx = SEED_FALLBACK_PRODUCTS.findIndex((p) => p._id === id || p.id === id);
    if (idx !== -1) SEED_FALLBACK_PRODUCTS.splice(idx, 1);

    try {
      let storedProds = JSON.parse(localStorage.getItem('streetcart_custom_products') || '[]');
      storedProds = storedProds.filter((p) => (p._id || p.id) !== id);
      localStorage.setItem('streetcart_custom_products', JSON.stringify(storedProds));
    } catch (e) {}

    return { success: true };
  }
}

export const api = new ApiService();

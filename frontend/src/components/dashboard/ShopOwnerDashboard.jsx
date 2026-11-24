import React, { useState, useEffect, useRef } from 'react';
import {
  Store,
  Package,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Tag,
  MapPin,
  Phone,
  MessageCircle,
  Layers,
  ChevronDown,
  Info,
  DollarSign,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { api } from '../../services/api';
import { THEME } from '../../theme/theme';

// Quick Preset Photography for Kozhikode Merchants
const PRESET_IMAGES = [
  {
    label: 'Malabar Cotton Kurti',
    category: 'Dress',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format&fit=crop&q=80',
    title: 'Pure Malabar Cotton Embroidered Kurti',
  },
  {
    label: 'Kasavu Traditional Saree',
    category: 'Dress',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&auto=format&fit=crop&q=80',
    title: 'Kerala Kasavu Handloom Saree with Zari Border',
  },
  {
    label: 'White Sports Sneakers',
    category: 'Bags & Shoes',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
    title: 'Pro Running Performance Sneakers',
  },
  {
    label: 'Leather Handbag',
    category: 'Bags & Shoes',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&auto=format&fit=crop&q=80',
    title: 'Premium Leather Ladies Tote Handbag',
  },
  {
    label: 'Football Cleats / Studs',
    category: 'Sports',
    url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=700&auto=format&fit=crop&q=80',
    title: 'Lightweight Turf Football Cleats',
  },
  {
    label: 'Chronograph Watch',
    category: 'Accessories',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
    title: 'Classic Quartz Chronograph Water-Resistant Watch',
  },
  {
    label: 'Wireless Earbuds',
    category: 'Electronics',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=80',
    title: 'True Wireless Noise-Cancelling Earbuds with Mic',
  },
];

export const ShopOwnerDashboard = ({ user, allShops = [], onOpenShop, onRefreshShops }) => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'profile' | 'create_shop'
  const [currentShop, setCurrentShop] = useState(null);
  const [myShopsList, setMyShopsList] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingShop, setSavingShop] = useState(false);
  const [shopMsg, setShopMsg] = useState('');
  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url' | 'presets'

  const fileInputRef = useRef(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Dress',
    targetShopId: '',
    price: '',
    originalPrice: '',
    offerTag: '',
    imageUrl: '',
    description: '',
    stockStatus: 'in_stock', // 'in_stock' | 'limited' | 'out_of_stock'
    sizes: 'S, M, L, XL',
  });
  const [addingProduct, setAddingProduct] = useState(false);
  const [productSuccessMsg, setProductSuccessMsg] = useState('');

  // Shop profile state
  const [profileForm, setProfileForm] = useState({
    name: '',
    category: 'Dress',
    area: 'SM Street (Mittayi Theruvu)',
    address: '',
    phone: '',
    whatsapp: '',
    description: '',
    brandColor: '#E04F2E',
    logoUrl: '',
    bannerUrl: '',
  });

  // Load merchant's stores and products
  useEffect(() => {
    loadDashboard();
  }, [user, allShops]);

  const loadDashboard = async () => {
    setLoading(true);

    // Find all stores matching this owner or available
    let availableStores = [...allShops];
    if (user?.id) {
      const owned = allShops.filter((s) => s.ownerId === user.id);
      if (owned.length > 0) {
        availableStores = owned;
      }
    }

    if (availableStores.length === 0) {
      const defaultShop = await api.getMyShop(user?.id);
      if (defaultShop) availableStores = [defaultShop];
    }

    setMyShopsList(availableStores);

    // Set active shop
    const active = currentShop
      ? availableStores.find((s) => (s._id || s.id) === (currentShop._id || currentShop.id)) || availableStores[0]
      : availableStores[0];

    if (active) {
      setCurrentShop(active);
      setNewProduct((prev) => ({
        ...prev,
        targetShopId: active._id || active.id || active.slug,
        category: active.category || 'Dress',
      }));

      setProfileForm({
        name: active.name || '',
        category: active.category || 'Dress',
        area: active.area || 'SM Street (Mittayi Theruvu)',
        address: active.address || '',
        phone: active.phone || '',
        whatsapp: active.whatsapp || '',
        description: active.description || '',
        brandColor: active.brandColor || '#E04F2E',
        logoUrl: active.logoUrl || '',
        bannerUrl: active.bannerUrl || '',
      });

      // Load products for this specific store
      const shopProds = await api.getProducts({ shopId: active._id || active.id });
      setProducts(shopProds || []);
    }

    setLoading(false);
  };

  // Switch active shop
  const handleSelectShop = async (shopId) => {
    const selected = myShopsList.find((s) => (s._id || s.id || s.slug) === shopId);
    if (!selected) return;

    setCurrentShop(selected);
    setNewProduct((prev) => ({
      ...prev,
      targetShopId: selected._id || selected.id || selected.slug,
      category: selected.category || prev.category,
    }));

    setProfileForm({
      name: selected.name || '',
      category: selected.category || 'Dress',
      area: selected.area || 'SM Street (Mittayi Theruvu)',
      address: selected.address || '',
      phone: selected.phone || '',
      whatsapp: selected.whatsapp || '',
      description: selected.description || '',
      brandColor: selected.brandColor || '#E04F2E',
      logoUrl: selected.logoUrl || '',
      bannerUrl: selected.bannerUrl || '',
    });

    const shopProds = await api.getProducts({ shopId: selected._id || selected.id });
    setProducts(shopProds || []);
  };

  // Handle local image file upload (FileReader converts to base64 Data URL)
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setNewProduct((prev) => ({
        ...prev,
        imageUrl: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Select Preset Image
  const handleSelectPreset = (preset) => {
    setNewProduct((prev) => ({
      ...prev,
      imageUrl: preset.url,
      title: prev.title || preset.title,
      category: preset.category,
    }));
  };

  // Add Product to the Selected Store
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;
    setAddingProduct(true);

    const priceNum = Number(newProduct.price);
    const origPriceNum = newProduct.originalPrice ? Number(newProduct.originalPrice) : 0;
    const discount =
      origPriceNum > priceNum
        ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)
        : 0;

    const targetId = newProduct.targetShopId || currentShop?._id || currentShop?.id;

    const payload = {
      title: newProduct.title,
      category: newProduct.category,
      price: priceNum,
      originalPrice: origPriceNum,
      discountPercentage: discount,
      offerTag: newProduct.offerTag || (discount > 0 ? `${discount}% OFF` : ''),
      imageUrl:
        newProduct.imageUrl ||
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      description: newProduct.description,
      stockStatus: newProduct.stockStatus,
      sizes: newProduct.sizes,
      shopId: targetId,
    };

    const created = await api.createProduct(payload);
    if (created) {
      setProducts([created, ...products]);
      setProductSuccessMsg(`Successfully added "${created.title}" to ${currentShop?.name}!`);
      setTimeout(() => setProductSuccessMsg(''), 4000);

      // Reset form fields
      setNewProduct({
        title: '',
        category: currentShop?.category || 'Dress',
        targetShopId: targetId,
        price: '',
        originalPrice: '',
        offerTag: '',
        imageUrl: '',
        description: '',
        stockStatus: 'in_stock',
        sizes: 'S, M, L, XL',
      });
    }
    setAddingProduct(false);
  };

  // Delete product
  const handleDeleteProduct = async (prodId) => {
    if (!window.confirm('Are you sure you want to delete this offer from your store catalog?')) return;
    await api.deleteProduct(prodId);
    setProducts(products.filter((p) => (p._id || p.id) !== prodId));
  };

  // Save Shop Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingShop(true);
    const updated = await api.saveMyShop(
      { ...profileForm, _id: currentShop?._id || currentShop?.id },
      user?.id,
    );
    if (updated) {
      setCurrentShop(updated);
      setShopMsg('Store Profile & Kozhikode address updated successfully!');
      setTimeout(() => setShopMsg(''), 3000);
      if (onRefreshShops) onRefreshShops();
    }
    setSavingShop(false);
  };

  // Auto-calculated discount for live preview
  const previewPrice = Number(newProduct.price) || 0;
  const previewOrigPrice = Number(newProduct.originalPrice) || 0;
  const previewDiscount =
    previewOrigPrice > previewPrice && previewPrice > 0
      ? Math.round(((previewOrigPrice - previewPrice) / previewOrigPrice) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Merchant Header & Store Selector Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-orange-600/30 text-orange-400 text-xs font-bold uppercase tracking-wider flex items-center">
                <Store className="w-3.5 h-3.5 mr-1 text-orange-400" />
                Merchant Store Control Center
              </span>
              <span className="text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-full font-bold">
                ● Live Seller
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentShop?.name || 'Kozhikode Merchant Dashboard'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                Merchant: <strong className="text-white">{user?.name}</strong> ({user?.email}) •{' '}
                <span className="text-orange-400 font-semibold">{currentShop?.area || 'Kozhikode City'}</span>
              </p>
            </div>
          </div>

          {/* Right Action: Store Switcher & Live Shop Page Link */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Store Switcher Dropdown */}
            <div className="bg-slate-800 p-1.5 rounded-2xl border border-slate-700 flex items-center space-x-2">
              <span className="text-xs text-stone-400 pl-2 font-medium hidden sm:inline">
                Managing Store:
              </span>
              <select
                value={currentShop?._id || currentShop?.id || ''}
                onChange={(e) => handleSelectShop(e.target.value)}
                className="bg-slate-900 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                {myShopsList.map((s) => (
                  <option key={s._id || s.id} value={s._id || s.id}>
                    🏬 {s.name} ({s.area || 'Calicut'})
                  </option>
                ))}
              </select>
            </div>

            {/* View Live Shop Page Button */}
            {currentShop && (
              <button
                onClick={() => onOpenShop(currentShop._id || currentShop.id || currentShop.slug)}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl flex items-center space-x-2 transition-all shadow-md shadow-orange-600/30 cursor-pointer"
              >
                <span>View Live Shop Page</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center space-x-2 sm:space-x-3 mb-8 border-b border-stone-200/90 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Package className="w-4 h-4 text-orange-400" />
          <span>Products &amp; Offers ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Store className="w-4 h-4 text-orange-400" />
          <span>Store Profile &amp; Location</span>
        </button>
      </div>

      {/* Success Banner */}
      {productSuccessMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{productSuccessMsg}</span>
        </div>
      )}

      {/* ==================== TAB 1: ADD & MANAGE PRODUCTS ==================== */}
      {activeTab === 'products' && (
        <div className="space-y-10">
          {/* Main Card: Add New Product / Offer with Rich Image Options & Live Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-stone-100 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-xl bg-orange-100 text-orange-600">
                    <Plus className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Add New Product / Offer
                  </h2>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Upload photos from your device, configure price discounts, and add products directly to{' '}
                  <strong className="text-slate-900 font-bold">{currentShop?.name}</strong>.
                </p>
              </div>

              {/* Target Store Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold">
                <Store className="w-3.5 h-3.5" />
                <span>Store: {currentShop?.name}</span>
              </div>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Columns (2 cols): Product Details & Image Upload */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Row: Target Store Selection & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Add to Store *
                      </label>
                      <select
                        value={newProduct.targetShopId}
                        onChange={(e) => {
                          setNewProduct({ ...newProduct, targetShopId: e.target.value });
                          handleSelectShop(e.target.value);
                        }}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      >
                        {myShopsList.map((s) => (
                          <option key={s._id || s.id} value={s._id || s.id || s.slug}>
                            {s.name} ({s.area || 'Calicut'})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Category *
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, category: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      >
                        {THEME.categories
                          .filter((c) => c.id !== 'All')
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Product Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.title}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, title: e.target.value })
                      }
                      placeholder="e.g. Pure Malabar Cotton Embroidered Kurti / White Running Shoes"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  {/* Pricing & Discount Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Original MRP (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newProduct.originalPrice}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, originalPrice: e.target.value })
                        }
                        placeholder="1499"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-orange-700 mb-1.5">
                        Selling / Offer Price (₹) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        placeholder="899"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-orange-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Special Offer Tag
                      </label>
                      <input
                        type="text"
                        value={newProduct.offerTag}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, offerTag: e.target.value })
                        }
                        placeholder="e.g. Flat 40% OFF"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  {/* Live Discount Calculator Pill */}
                  {previewDiscount > 0 && (
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                      <span className="font-bold">
                        🔥 Real-Time Customer Savings:
                      </span>
                      <span className="font-extrabold text-emerald-700">
                        {previewDiscount}% OFF (Save ₹{previewOrigPrice - previewPrice})
                      </span>
                    </div>
                  )}

                  {/* Stock Status & Sizes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Inventory / Stock Status
                      </label>
                      <select
                        value={newProduct.stockStatus}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, stockStatus: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      >
                        <option value="in_stock">🟢 In Stock (Immediate Dispatch)</option>
                        <option value="limited">🟡 Limited Stock (Only Few Left)</option>
                        <option value="out_of_stock">🔴 Out of Stock</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Available Sizes / Options
                      </label>
                      <input
                        type="text"
                        value={newProduct.sizes}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, sizes: e.target.value })
                        }
                        placeholder="e.g. S, M, L, XL or UK 7, 8, 9, 10"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  {/* ================= PRODUCT IMAGE OPTIONS ================= */}
                  <div className="pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center">
                        <ImageIcon className="w-4 h-4 mr-1 text-orange-600" />
                        <span>Product Photo / Image Options *</span>
                      </label>

                      {/* Image Input Mode Toggle */}
                      <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setImageInputMode('upload')}
                          className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${
                            imageInputMode === 'upload'
                              ? 'bg-white text-slate-900 font-bold shadow-xs'
                              : 'text-stone-600 hover:text-slate-900'
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageInputMode('presets')}
                          className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${
                            imageInputMode === 'presets'
                              ? 'bg-white text-slate-900 font-bold shadow-xs'
                              : 'text-stone-600 hover:text-slate-900'
                          }`}
                        >
                          Preset Photos
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageInputMode('url')}
                          className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${
                            imageInputMode === 'url'
                              ? 'bg-white text-slate-900 font-bold shadow-xs'
                              : 'text-stone-600 hover:text-slate-900'
                          }`}
                        >
                          Web URL
                        </button>
                      </div>
                    </div>

                    {/* Mode 1: Device File Upload */}
                    {imageInputMode === 'upload' && (
                      <div className="space-y-3">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-stone-300 hover:border-orange-500 bg-[#FAF9F6] rounded-2xl p-6 text-center cursor-pointer transition-all group"
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageFileUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-slate-900">
                            Click to upload photo from your device
                          </p>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Supports PNG, JPG, WEBP. Ready for high-res mobile photos.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Mode 2: One-Click Calicut Product Presets */}
                    {imageInputMode === 'presets' && (
                      <div className="space-y-2">
                        <p className="text-[11px] text-stone-500">
                          Click any verified product photo below to auto-populate image &amp; category:
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PRESET_IMAGES.map((preset) => (
                            <button
                              type="button"
                              key={preset.label}
                              onClick={() => handleSelectPreset(preset)}
                              className="p-2 bg-[#FAF9F6] hover:bg-orange-50 border border-stone-200 rounded-xl text-left transition-all cursor-pointer group flex items-center space-x-2"
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0"
                              />
                              <div className="overflow-hidden">
                                <p className="text-[11px] font-bold text-slate-900 truncate">
                                  {preset.label}
                                </p>
                                <p className="text-[9px] text-stone-400 capitalize">
                                  {preset.category}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mode 3: Image URL input */}
                    {imageInputMode === 'url' && (
                      <div>
                        <input
                          type="url"
                          value={newProduct.imageUrl}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, imageUrl: e.target.value })
                          }
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Product Description &amp; Highlights
                    </label>
                    <textarea
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                      }
                      placeholder="e.g. 100% pure Malabar cotton, pre-shrunk, hand-embroidered neckline, direct from SM Street master weavers."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>

                {/* Right Column (1 col): Real-Time Customer Live Preview Card */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                    <Eye className="w-3.5 h-3.5 text-orange-600" />
                    <span>Customer Live Preview</span>
                  </div>

                  <div className="bg-[#FAF9F6] rounded-3xl p-4 border border-stone-200/90 shadow-xs space-y-3">
                    {/* Media container */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200">
                      {newProduct.imageUrl ? (
                        <img
                          src={newProduct.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 text-xs p-4 text-center">
                          <ImageIcon className="w-8 h-8 mb-2 text-stone-300" />
                          <span>Photo will appear here in real time</span>
                        </div>
                      )}

                      {/* Discount Badge on Preview */}
                      {(previewDiscount > 0 || newProduct.offerTag) && (
                        <div className="absolute top-2.5 right-2.5 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded-lg shadow-md">
                          {newProduct.offerTag || `${previewDiscount}% OFF`}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wide">
                        {currentShop?.name || 'Your Store'}
                      </p>
                      <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2">
                        {newProduct.title || 'Product Title Appears Here'}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {newProduct.description || 'Short product description...'}
                      </p>
                    </div>

                    <div className="flex items-baseline space-x-2 pt-1 border-t border-stone-200/60">
                      <span className="text-lg font-black text-slate-900">
                        ₹{newProduct.price || '0'}
                      </span>
                      {previewOrigPrice > 0 && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{previewOrigPrice}
                        </span>
                      )}
                      {previewDiscount > 0 && (
                        <span className="text-xs font-bold text-emerald-600">
                          Save ₹{previewOrigPrice - previewPrice}
                        </span>
                      )}
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-stone-200/70 text-[10px] text-stone-600 flex items-center justify-between">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 text-orange-500 mr-1" />
                        {currentShop?.area || 'Kozhikode'}
                      </span>
                      <span className="text-emerald-700 font-bold">
                        {newProduct.stockStatus === 'in_stock'
                          ? '● In Stock'
                          : newProduct.stockStatus === 'limited'
                          ? '● Limited'
                          : '● Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 hidden sm:inline">
                  Will be published immediately on <strong>{currentShop?.name}</strong> storefront.
                </span>

                <button
                  type="submit"
                  disabled={addingProduct}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-orange-600/20 transition-all flex items-center space-x-2 cursor-pointer hover:scale-102 active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {addingProduct
                      ? 'Publishing Product...'
                      : `Add Product to ${currentShop?.name || 'Store'}`}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* ================= CURRENT STORE PRODUCTS LIST ================= */}
          <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs">
            <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                  <span>Current Store Products &amp; Offers</span>
                  <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-bold">
                    {products.length} Items
                  </span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Showing active listings in <strong className="text-slate-900">{currentShop?.name}</strong>
                </p>
              </div>

              {currentShop && (
                <button
                  onClick={() => onOpenShop(currentShop._id || currentShop.id || currentShop.slug)}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Preview Storefront</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {products.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">No products in this store yet</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Use the form above to add your first offer or product with custom photos and discount tags!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {products.map((p) => {
                  const savings =
                    p.originalPrice && p.originalPrice > p.price
                      ? p.originalPrice - p.price
                      : 0;

                  return (
                    <div
                      key={p._id || p.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-16 h-16 rounded-2xl object-cover bg-stone-100 border border-stone-200 shrink-0 aspect-square"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                              {p.category}
                            </span>
                            {p.discountPercentage > 0 && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-100 text-red-700">
                                {p.discountPercentage}% OFF
                              </span>
                            )}
                            <span className="text-[10px] font-bold text-emerald-700">
                              ● {p.stockStatus === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
                            </span>
                          </div>

                          <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                            {p.title}
                          </h4>

                          <div className="flex items-baseline space-x-2">
                            <span className="text-base font-black text-slate-900">
                              ₹{p.price}
                            </span>
                            {p.originalPrice && p.originalPrice > p.price && (
                              <span className="text-xs text-stone-400 line-through">
                                ₹{p.originalPrice}
                              </span>
                            )}
                            {savings > 0 && (
                              <span className="text-xs font-semibold text-emerald-600">
                                Save ₹{savings}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-2 self-end sm:self-auto">
                        <button
                          onClick={() => handleDeleteProduct(p._id || p.id)}
                          className="p-2.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 2: STORE PROFILE SETTINGS ==================== */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm max-w-4xl">
          <div className="pb-6 border-b border-stone-100 mb-6">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Edit Store Profile &amp; Calicut Location
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Customize your storefront name, branding theme color, phone, WhatsApp, and address in Kozhikode.
            </p>
          </div>

          {shopMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{shopMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Shop Name *
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Primary Category *
                </label>
                <select
                  value={profileForm.category}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, category: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  {THEME.categories
                    .filter((c) => c.id !== 'All')
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Kozhikode Area / Street *
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.area}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, area: e.target.value })
                  }
                  placeholder="SM Street (Mittayi Theruvu) / Mavoor Road"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Brand Theme Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={profileForm.brandColor}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, brandColor: e.target.value })
                    }
                    className="w-10 h-10 rounded-xl border border-stone-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={profileForm.brandColor}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, brandColor: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Full Physical Address in Kozhikode *
              </label>
              <textarea
                rows={2}
                required
                value={profileForm.address}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, address: e.target.value })
                }
                placeholder="Near Sweet Street Clock Tower, SM Street, Kozhikode, Kerala 673001"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  placeholder="+91 98470 12345"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={profileForm.whatsapp}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, whatsapp: e.target.value })
                  }
                  placeholder="+919847012345"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Logo Image URL
                </label>
                <input
                  type="url"
                  value={profileForm.logoUrl}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, logoUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Cover Banner URL
                </label>
                <input
                  type="url"
                  value={profileForm.bannerUrl}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bannerUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Store Bio / Description
              </label>
              <textarea
                rows={3}
                value={profileForm.description}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, description: e.target.value })
                }
                placeholder="Premier ethnic wear, cotton kurtas, bridal silks, and casual western outfits in the heart of Calicut SM Street."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-stone-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={savingShop}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>{savingShop ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

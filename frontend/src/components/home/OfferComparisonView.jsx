import React, { useState } from 'react';
import {
  Tag,
  MapPin,
  Store,
  ArrowUpDown,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  Check,
  Plus,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const OfferComparisonView = ({
  products = [],
  shops = [],
  onOpenShop,
  selectedCategory,
}) => {
  const { addToCart } = useCart();
  const [sortOption, setSortOption] = useState('discount_desc');
  const [comparedIds, setComparedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to find shop details for a product
  const getShop = (shopId) => {
    return (
      (shops || []).find((s) => s._id === shopId || s.id === shopId) || {
        name: 'Local Kozhikode Store',
        area: 'Kozhikode',
        brandColor: '#E04F2E',
        whatsapp: '+919847012345',
      }
    );
  };

  // Filter products by internal comparison search
  const filteredProducts = (products || []).filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const shop = getShop(p?.shopId);
    return (
      (p?.title || '').toLowerCase().includes(term) ||
      (p?.category || '').toLowerCase().includes(term) ||
      p?.offerTag?.toLowerCase().includes(term) ||
      (shop?.name || '').toLowerCase().includes(term) ||
      (shop?.area || shop?.address || '').toLowerCase().includes(term)
    );
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'discount_desc') {
      return (b.discountPercentage || 0) - (a.discountPercentage || 0);
    }
    if (sortOption === 'price_asc') {
      return a.price - b.price;
    }
    if (sortOption === 'price_desc') {
      return b.price - a.price;
    }
    return 0;
  });

  // Toggle item in comparison bar
  const toggleCompare = (id) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 products side by side at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const comparedProducts = (products || []).filter((p) => comparedIds.includes(p._id || p.id));

  return (
    <section id="offers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <Tag className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Offers Across City Stores
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
            Side-by-side pricing & discount intelligence from SM Street, Mavoor Road, Focus Mall & Palayam.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items (e.g. Kurti, Sneaker)..."
              className="pl-3 pr-8 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 shadow-2xs w-56"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs font-semibold bg-white border border-stone-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-2xs cursor-pointer"
            >
              <option value="discount_desc">🔥 Highest Discount</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Dock (when items are selected for comparison) */}
      {comparedProducts.length > 0 && (
        <div className="mb-8 p-5 bg-white rounded-3xl border-2 border-orange-500/30 shadow-lg animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                Side-by-Side Price Comparison ({comparedProducts.length} selected)
              </h3>
            </div>
            <button
              onClick={() => setComparedIds([])}
              className="text-xs text-stone-400 hover:text-red-600 font-semibold cursor-pointer"
            >
              Clear Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparedProducts.map((p) => {
              const shop = getShop(p.shopId);
              return (
                <div
                  key={p._id || p.id}
                  className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 flex flex-col justify-between space-y-3 relative"
                >
                  <button
                    onClick={() => toggleCompare(p._id || p.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white text-stone-400 hover:text-red-500 shadow-xs cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-3">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 aspect-square"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-orange-600 uppercase">
                        {shop.name}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 flex items-center">
                        <MapPin className="w-3 h-3 text-orange-600 mr-1" />
                        {shop.area}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-100 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-stone-500">Offer Price:</span>
                      <span className="text-base font-black text-slate-900">₹{p.price}</span>
                    </div>
                    {p.originalPrice > p.price && (
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-stone-400">Original MRP:</span>
                        <span className="line-through text-stone-400">₹{p.originalPrice}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline text-xs font-bold text-emerald-600">
                      <span>Discount:</span>
                      <span>{p.discountPercentage}% OFF</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => addToCart(p, shop)}
                      className="py-2 px-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-500 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                      className="py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Store</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-stone-200">
          <Tag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 text-base">No offers found</h3>
          <p className="text-xs text-stone-500 mt-1">
            Try adjusting your search keyword or selected category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const shop = getShop(product.shopId);
            const isCompared = comparedIds.includes(product._id || product.id);
            const savings =
              product.originalPrice && product.originalPrice > product.price
                ? product.originalPrice - product.price
                : 0;

            return (
              <div
                key={product._id || product.id}
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Container with Proper Aspect Ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Discount percentage tag */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-md flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{product.discountPercentage}% OFF</span>
                    </div>
                  )}

                  {/* Special Offer Tag */}
                  {product.offerTag && (
                    <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-xs text-orange-300 font-bold text-[10px] px-2.5 py-1 rounded-lg shadow">
                      {product.offerTag}
                    </div>
                  )}

                  {/* Compare Checkbox Icon Button */}
                  <button
                    onClick={() => toggleCompare(product._id || product.id)}
                    className={`absolute top-3 right-3 p-1.5 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                      isCompared
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white/90 text-stone-700 hover:bg-white'
                    }`}
                    title={isCompared ? 'Remove from compare' : 'Compare side by side'}
                  >
                    {isCompared ? <Check className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Shop details */}
                    <div
                      onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                      className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-orange-600 cursor-pointer transition-colors mb-1.5"
                    >
                      <Store className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="font-bold text-slate-800 truncate">
                        {shop.name}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="truncate text-stone-500">{shop.area}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 mt-3 border-t border-stone-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-lg font-black text-slate-900">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-stone-400 line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {savings > 0 && (
                          <span className="text-[10px] text-emerald-600 font-semibold">
                            Save ₹{savings.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        In Store
                      </span>
                    </div>

                    {/* Action buttons: Add to Cart + WhatsApp */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product, shop)}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <a
                        href={`https://wa.me/${(shop.whatsapp || '919847012345').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20saw%20${encodeURIComponent(product.title)}%20(₹${product.price})%20on%20StreetCart!`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

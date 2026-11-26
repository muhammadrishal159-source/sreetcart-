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
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const OfferComparisonView = ({
  products = [],
  shops = [],
  onOpenShop,
  onOpenProduct,
}) => {
  const { addToCart } = useCart();
  const [sortOption, setSortOption] = useState('discount_desc');
  const [comparedIds, setComparedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getShop = (shopId) => {
    return (
      (shops || []).find((s) => s._id === shopId || s.id === shopId) || {
        name: 'Local Nadapuram Store',
        area: 'Nadapuram',
        brandColor: '#EAB308',
        whatsapp: '+919847012345',
      }
    );
  };

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
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A16207] block mb-1">
            Explore Our Collection
          </span>
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-xl bg-[#FEF9C3] border border-[#FDE047]/60 text-[#854D0E]">
              <Tag className="w-5 h-5" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B1C19] tracking-tight">
              Compare Offers Across City Stores
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5647] mt-1.5 max-w-2xl leading-relaxed">
            Side-by-side pricing &amp; discount intelligence from SM Street, Mavoor Road, Focus Mall &amp; Palayam.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items (e.g. Kurti, Sneaker)..."
              className="pl-4 pr-8 py-2 text-xs bg-white border border-[#EAE4D3] rounded-full focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/25 shadow-2xs w-56 text-[#1B1C19] placeholder-[#817660]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#817660] hover:text-[#1B1C19] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#817660]" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs font-semibold bg-white border border-[#EAE4D3] rounded-full px-3.5 py-2 text-[#1B1C19] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/25 shadow-2xs cursor-pointer"
            >
              <option value="discount_desc">Highest Discount</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Dock */}
      {comparedProducts.length > 0 && (
        <div className="mb-8 p-6 bg-white rounded-3xl border-2 border-[#FACC15] shadow-[0_16px_38px_-10px_rgba(234,179,8,0.25)]">
          <div className="flex items-center justify-between pb-4 border-b border-[#F5F3EE] mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] animate-ping" />
              <h3 className="font-bold text-sm text-[#1B1C19] tracking-tight">
                Side-by-Side Price Comparison ({comparedProducts.length} selected)
              </h3>
            </div>
            <button
              onClick={() => setComparedIds([])}
              className="text-xs text-[#817660] hover:text-red-600 font-semibold cursor-pointer"
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
                  className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#EAE4D3] flex flex-col justify-between space-y-3 relative"
                >
                  <button
                    onClick={() => toggleCompare(p._id || p.id)}
                    className="absolute top-2.5 right-2.5 p-1 rounded-full bg-white text-[#817660] hover:text-red-500 shadow-xs cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-3">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 aspect-square"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#A16207] uppercase">
                        {shop.name}
                      </span>
                      <h4 className="font-bold text-xs text-[#1B1C19] truncate">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-[#5C5647] flex items-center">
                        <MapPin className="w-3 h-3 text-[#CA8A04] mr-1" />
                        {shop.area}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#EAE4D3] space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-[#5C5647]">Offer Price:</span>
                      <span className="text-base font-extrabold text-[#1B1C19]">₹{p.price}</span>
                    </div>
                    {p.originalPrice > p.price && (
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-[#817660]">Original MRP:</span>
                        <span className="line-through text-[#817660]">₹{p.originalPrice}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline text-xs font-bold text-emerald-700">
                      <span>Discount:</span>
                      <span>{p.discountPercentage}% OFF</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => addToCart(p, shop)}
                      className="py-2 px-3 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] font-bold text-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                      className="py-2 px-3 rounded-full bg-[#1B1C19] text-white font-bold text-xs hover:bg-[#2E2F2A] transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Store</span>
                      <ExternalLink className="w-3 h-3 text-[#FACC15]" />
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
        <div className="bg-white rounded-3xl p-16 text-center border border-[#EAE4D3]">
          <Tag className="w-12 h-12 text-[#D3C5AC] mx-auto mb-3" />
          <h3 className="font-bold text-[#1B1C19] text-base">No offers found</h3>
          <p className="text-xs text-[#5C5647] mt-1">
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
                className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-[0_2px_14px_rgba(27,28,25,0.04)] hover:shadow-[0_18px_38px_-10px_rgba(234,179,8,0.22)] hover:border-[#FACC15] transition-all duration-300 flex flex-col justify-between group"
              >
                <div
                  onClick={() =>
                    onOpenProduct && onOpenProduct(product._id || product.id)
                  }
                  className="relative aspect-[4/3] overflow-hidden bg-[#F5F3EE] cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {product.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-[#FACC15] text-[#1B1C19] font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{product.discountPercentage}% OFF</span>
                    </div>
                  )}

                  {product.offerTag && (
                    <div className="absolute bottom-3 left-3 bg-[#1B1C19]/85 backdrop-blur-xs text-[#FACC15] font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
                      {product.offerTag}
                    </div>
                  )}

                  <button
                    onClick={() => toggleCompare(product._id || product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isCompared
                        ? 'bg-[#1B1C19] text-[#FACC15] shadow-md'
                        : 'bg-white/90 text-[#4F4633] hover:bg-white'
                    }`}
                    title={isCompared ? 'Remove from compare' : 'Compare side by side'}
                  >
                    {isCompared ? <Check className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div
                      onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                      className="flex items-center space-x-1.5 text-xs text-[#5C5647] hover:text-[#1B1C19] cursor-pointer transition-colors mb-1.5"
                    >
                      <Store className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                      <span className="font-bold text-[#1B1C19] truncate">
                        {shop.name}
                      </span>
                      <span className="text-[#D3C5AC]">•</span>
                      <span className="truncate text-[#5C5647]">{shop.area}</span>
                    </div>

                    <h3
                      onClick={() =>
                        onOpenProduct && onOpenProduct(product._id || product.id)
                      }
                      className="font-bold text-[#1B1C19] text-sm line-clamp-2 leading-snug group-hover:text-[#A16207] transition-colors cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-xs text-[#5C5647] line-clamp-1 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#F5F3EE]">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-lg font-extrabold text-[#1B1C19]">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-[#817660] line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {savings > 0 && (
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            Save ₹{savings.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        In Store
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product, shop)}
                        className="w-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs font-bold py-2.5 px-3 rounded-full transition-all flex items-center justify-center space-x-1 shadow-2xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <a
                        href={`https://wa.me/${(shop.whatsapp || '919847012345').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20saw%20${encodeURIComponent(product.title)}%20(₹${product.price})%20on%20StreetCart!`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-[#1B1C19] hover:bg-[#2E2F2A] text-white text-xs font-semibold py-2.5 px-3 rounded-full transition-all flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#FACC15]" />
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

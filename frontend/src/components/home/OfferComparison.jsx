import React, { useState } from 'react';
import { Tag, MapPin, Store, ArrowUpDown, ExternalLink, MessageCircle, Sparkles } from 'lucide-react';

export const OfferComparison = ({
  products,
  shops,
  onOpenShop,
  selectedCategory,
}) => {
  const [sortOption, setSortOption] = useState('discount_desc');

  // Helper to find shop details for a product
  const getShop = (shopId) => {
    return (
      shops.find((s) => s._id === shopId || s.id === shopId) || {
        name: 'Local Nadapuram Store',
        area: 'Nadapuram',
        brandColor: '#FF5A36',
        whatsapp: '+919847012345',
      }
    );
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <Tag className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Compare Offers Across Stores
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare city store prices, discounts and active deals •{' '}
            <span className="font-semibold text-slate-700">
              {products.length} Products & Offers Available
            </span>
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            <option value="discount_desc">🔥 Biggest Discount</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">
            No products found matching this filter in Nadapuram stores.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const shop = getShop(product.shopId);
            const savings =
              product.originalPrice && product.originalPrice > product.price
                ? product.originalPrice - product.price
                : 0;

            return (
              <div
                key={product._id || product.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Discount percentage tag */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{product.discountPercentage}% OFF</span>
                    </div>
                  )}

                  {/* Special Offer Tag */}
                  {product.offerTag && (
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm text-orange-300 font-bold text-[11px] px-2.5 py-1 rounded-md shadow">
                      {product.offerTag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Shop details header */}
                    <div
                      onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                      className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-orange-600 cursor-pointer transition-colors mb-1.5"
                    >
                      <Store className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="font-semibold text-slate-700 truncate">
                        {shop.name}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="truncate text-slate-500">{shop.area}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 mt-2 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-lg font-black text-slate-900">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {savings > 0 && (
                          <span className="text-[10px] text-emerald-600 font-semibold">
                            You save ₹{savings.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        In Store
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <span>View Shop</span>
                        <ExternalLink className="w-3 h-3 text-orange-400" />
                      </button>

                      <a
                        href={`https://wa.me/${(shop.whatsapp || '919847012345').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20saw%20${encodeURIComponent(product.title)}%20on%20StreetCart%20for%20₹${product.price}.%20Is%20it%20available?`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
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

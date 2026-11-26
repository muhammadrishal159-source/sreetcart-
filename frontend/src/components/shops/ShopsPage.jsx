import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Star,
  Search,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { THEME } from '../../theme/theme';

export const ShopsPage = ({ shops, products, onOpenShop, onOpenAuth }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  // Filter shops based on category & search
  const filteredShops = shops.filter((shop) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      shop.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchFilter ||
      shop.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      shop.area?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      shop.address?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      shop.description?.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Helper to count products for each shop
  const getProductCount = (shopId) => {
    return products.filter((p) => p.shopId === shopId).length;
  };

  return (
    <div className="min-h-screen pb-20 bg-[#FFFDF7]">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1B1C19] via-[#262520] to-[#3B3318] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2E2F2A] shadow-md">
        <img
          src="/images/bg-shops-header.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1B1C19]/90 via-[#1B1C19]/75 to-[#1B1C19]/65"
        />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/40 text-[#FACC15] text-xs font-semibold mb-3">
              <Store className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>City Store Directory • Kozhikode</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Registered Kozhikode Stores
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore verified local shops registered on StreetCart across SM Street, Mavoor Road, Palayam, Focus Mall and other shopping hubs in Calicut.
            </p>
          </div>

          {/* Quick Hub summary */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs space-y-1.5 shrink-0">
            <span className="font-bold text-[#FACC15] flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
              Verified Local Stores
            </span>
            <p className="text-slate-300">
              <strong className="text-white">{shops.length} Stores</strong> actively listed in Kozhikode
            </p>
            <p className="text-[11px] text-slate-400">
              Direct WhatsApp order support with store owners
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white p-4 rounded-2xl border border-[#EAE4D3] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {THEME.categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B1C19] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search inside registered shops */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search shops by name or area..."
              className="w-full pl-9 pr-3.5 py-2 bg-[#FFFDF7] border border-[#EAE4D3] rounded-xl text-xs text-[#1B1C19] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30"
            />
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-[#5C5647]">
            Showing <strong className="text-[#1B1C19]">{filteredShops.length}</strong> shops in Kozhikode
          </p>
        </div>

        {filteredShops.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE4D3]">
            <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1B1C19]">No shops found</h3>
            <p className="text-xs text-[#5C5647] mt-1">
              There are no stores matching "{searchFilter}" under {selectedCategory}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => {
              const prodCount = getProductCount(shop._id || shop.id || shop.slug);
              const brandColor = shop.brandColor || '#FF5A36';

              return (
                <div
                  key={shop._id || shop.id}
                  className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#FACC15] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Banner */}
                    <div className="h-36 w-full relative overflow-hidden bg-slate-100">
                      <img
                        src={shop.bannerUrl}
                        alt={shop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {shop.isFeatured && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-[#1B1C19] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow">
                          <Sparkles className="w-3 h-3 text-[#1B1C19]" />
                          <span>FEATURED</span>
                        </span>
                      )}

                      <div className="absolute bottom-2.5 right-3 text-white text-xs font-semibold flex items-center space-x-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{shop.rating || 4.8}</span>
                      </div>
                    </div>

                    {/* Logo & Shop Info */}
                    <div className="px-5 pb-5 pt-0 relative">
                      {/* Logo Overlap with Brand Color Accent */}
                      <div
                        className="w-16 h-16 rounded-2xl border-4 bg-white shadow-md overflow-hidden -mt-8 relative z-10"
                        style={{ borderColor: brandColor }}
                      >
                        <img
                          src={shop.logoUrl}
                          alt={shop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: `${brandColor}15`,
                              color: brandColor,
                            }}
                          >
                            {shop.category}
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-600">
                            ● Open in {shop.area}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-[#1B1C19] text-lg leading-snug group-hover:text-[#CA8A04] transition-colors">
                          {shop.name}
                        </h3>

                        <p className="text-xs text-[#5C5647] flex items-center">
                          <MapPin className="w-3.5 h-3.5 text-[#CA8A04] mr-1 shrink-0" />
                          <span className="truncate">{shop.address}</span>
                        </p>

                        <p className="text-xs text-slate-600 line-clamp-2 pt-1 leading-relaxed">
                          {shop.description}
                        </p>

                        <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#5C5647]">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            <strong className="text-[#1B1C19]">{prodCount || 3}</strong> live products & offers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-5 py-3.5 bg-[#FFFDF7] border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                      className="flex-1 bg-[#1B1C19] hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 group-hover:bg-[#FACC15] hover:text-[#1B1C19] cursor-pointer"
                    >
                      <span>Explore Shop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {shop.whatsapp && (
                      <a
                        href={`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20found%20your%20shop%20on%20StreetCart!`}
                        target="_blank"
                        rel="noreferrer"
                        title="Chat on WhatsApp"
                        className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Merchant invitation banner */}
        <div className="mt-14 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              Own a retail shop in Kozhikode?
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
              List your retail store and promotional offers on StreetCart today for free and reach thousands of shoppers across Calicut!
            </p>
          </div>
          <button
            onClick={() => onOpenAuth && onOpenAuth()}
            className="bg-white text-[#1B1C19] hover:bg-slate-100 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 shrink-0 cursor-pointer"
          >
            Register Your Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

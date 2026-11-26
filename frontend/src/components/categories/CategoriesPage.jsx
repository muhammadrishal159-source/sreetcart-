import React, { useState } from 'react';
import {
  Layers,
  Store,
  Tag,
  ArrowRight,
  Shirt,
  Watch,
  ShoppingBag,
  Trophy,
  Smartphone,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { THEME } from '../../theme/theme';

const ICON_MAP = {
  Store,
  Shirt,
  Watch,
  ShoppingBag,
  Trophy,
  Smartphone,
};

const CATEGORY_META = {
  Dress: {
    heroImg: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&auto=format&fit=crop&q=80',
    description: 'Cotton kurtis, bridal silks, Kasavu traditional sarees, and mens casual linen shirts in SM Street and city centers.',
    highlight: 'Up to 50% Off in Calicut Boutiques',
    popularIn: 'SM Street (Sweet Street), Palayam',
  },
  Accessories: {
    heroImg: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=1000&auto=format&fit=crop&q=80',
    description: 'Designer sunglasses, minimalist watches, fashion jewelry, and premium fragrances.',
    highlight: 'Flash Deals in Focus Mall & Rajaji Road',
    popularIn: 'Focus Mall, RP Mall',
  },
  'Bags & Shoes': {
    heroImg: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=80',
    description: 'Lightweight running sneakers, ladies leather handbags, waterproof school/college backpacks, and formal shoes.',
    highlight: 'Wholesale & Retail Discounts',
    popularIn: 'Mavoor Road (Opp. New Bus Stand)',
  },
  Sports: {
    heroImg: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&auto=format&fit=crop&q=80',
    description: 'Football boots, Sevens match balls, graphite badminton racquets, jerseys, and gym accessories.',
    highlight: 'Tournament Specials for Calicut Players',
    popularIn: 'Stadium Junction, Palayam',
  },
  Electronics: {
    heroImg: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1000&auto=format&fit=crop&q=80',
    description: 'True wireless stereo earbuds, fast charging power banks, phone accessories, and computer peripherals.',
    highlight: 'Up to 56% Off with Store Warranty',
    popularIn: 'Mavoor Road Tech Hubs',
  },
};

export const CategoriesPage = ({
  shops,
  products,
  onSelectCategoryAndGo,
  onOpenShop,
}) => {
  const [activeCatId, setActiveCatId] = useState('All');

  // Categories list (excluding 'All')
  const categoriesList = THEME.categories.filter((c) => c.id !== 'All');

  const selectedMeta = CATEGORY_META[activeCatId] || CATEGORY_META['Dress'];

  // Count shops and products per category
  const getShopsCount = (catId) => shops.filter((s) => s.category === catId).length;
  const getProductsCount = (catId) => products.filter((p) => p.category === catId).length;

  return (
    <div className="min-h-screen pb-20 bg-[#FFFDF7]">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1B1C19] via-[#262520] to-[#3B3318] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2E2F2A] shadow-md">
        <img
          src="/images/bg-categories-showcase.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1B1C19]/90 via-[#1B1C19]/78 to-[#1B1C19]/65"
        />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/40 text-[#FACC15] text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>Explore by Category • Kozhikode</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              City Marketplace Categories
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore dress boutiques, footwear, sports kits, watches, and electronics neatly categorized across local stores in Calicut.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs space-y-1 shrink-0">
            <span className="font-bold text-[#FACC15]">5 Popular Retail Categories</span>
            <p className="text-slate-300">Direct comparison across 50+ local shops</p>
          </div>
        </div>
      </div>

      {/* Main Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Store;
            const meta = CATEGORY_META[cat.id] || {};
            const shopCount = getShopsCount(cat.id);
            const prodCount = getProductsCount(cat.id);

            // Get top product under this category
            const sampleProducts = products.filter((p) => p.category === cat.id).slice(0, 2);

            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Image Header */}
                  <div className="h-44 w-full relative overflow-hidden bg-[#1B1C19]">
                    <img
                      src={meta.heroImg}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#FACC15]/95 backdrop-blur-xs text-white flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-extrabold text-xl tracking-tight text-white">
                        {cat.label}
                      </h3>
                      <p className="text-[11px] text-[#FACC15] font-medium mt-0.5">
                        {meta.highlight}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {meta.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-semibold py-2 px-3 rounded-xl bg-[#FFFDF7] border border-slate-100 text-slate-700">
                      <span>🏬 {shopCount} Verified Shops</span>
                      <span>🏷️ {prodCount} Active Offers</span>
                    </div>

                    {/* Preview of Top Products */}
                    {sampleProducts.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Top City Deals:
                        </span>
                        {sampleProducts.map((p) => (
                          <div
                            key={p._id || p.id}
                            className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0"
                          >
                            <span className="truncate text-slate-700 font-medium max-w-[180px]">
                              {p.title}
                            </span>
                            <span className="font-extrabold text-[#1B1C19] shrink-0">
                              ₹{p.price}
                              {p.discountPercentage > 0 && (
                                <span className="text-[10px] text-red-600 font-bold ml-1">
                                  ({p.discountPercentage}% off)
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectCategoryAndGo(cat.id)}
                    className="w-full bg-[#1B1C19] hover:bg-[#FACC15] text-[#1B1C19] font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 group-hover:shadow-md cursor-pointer"
                  >
                    <span>Browse {cat.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

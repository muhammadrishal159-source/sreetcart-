import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Store, ShieldCheck, Tag } from 'lucide-react';

export const FlipkartBannerCarousel = ({ shops = [], products = [], onOpenShop }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Curated prominent campaign banners for Calicut top stores
  const banners = [
    {
      id: 'banner_sm_street',
      shopId: 'shop_sm_street_dress',
      tag: 'SM STREET BESTSELLER',
      headline: 'Pure Malabar Cotton & Silk Kurtis',
      subline: 'Handcrafted embroidery & festive bridal wear directly from Mittayi Theruvu.',
      priceTag: 'From ₹899',
      offerBadge: 'FLAT 40% OFF',
      badgeColor: 'bg-rose-600',
      bgGradient: 'from-amber-950 via-stone-900 to-slate-900',
      textColor: 'text-amber-100',
      accentColor: 'text-amber-400',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
      locality: 'SM Street, Calicut',
    },
    {
      id: 'banner_metro_shoes',
      shopId: 'shop_calicut_footwear',
      tag: 'MAVOOR ROAD MEGA DEAL',
      headline: 'Metro Footwear & Leather Bags',
      subline: 'Trending white sneakers, formal leather shoes & ladies tote bags at wholesale rates.',
      priceTag: 'From ₹799',
      offerBadge: 'UP TO 50% OFF',
      badgeColor: 'bg-blue-600',
      bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
      textColor: 'text-blue-100',
      accentColor: 'text-cyan-400',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&auto=format&fit=crop&q=80',
      locality: 'Opp. New Bus Stand, Mavoor Rd',
    },
    {
      id: 'banner_sports_arena',
      shopId: 'shop_champions_sports',
      tag: 'CALICUT SPORTS FIESTA',
      headline: 'Champions Sports Arena',
      subline: 'Official football team jerseys, lightweight studs, badminton racquets & fitness gear.',
      priceTag: 'From ₹499',
      offerBadge: 'MIN. 35% OFF',
      badgeColor: 'bg-emerald-600',
      bgGradient: 'from-emerald-950 via-stone-900 to-slate-950',
      textColor: 'text-emerald-100',
      accentColor: 'text-emerald-400',
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=900&auto=format&fit=crop&q=80',
      locality: 'Near Stadium, Calicut',
    },
  ];

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 mb-6">
      {/* 3 Prominent Flipkart-Style Cards Side-by-Side (Desktop) or Carousel (Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {banners.map((b, index) => {
          const isFeaturedInMobile = index === activeSlide;

          return (
            <div
              key={b.id}
              onClick={() => onOpenShop(b.shopId)}
              className={`rounded-3xl overflow-hidden relative cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 flex flex-col justify-between ${
                index !== activeSlide ? 'hidden md:flex' : 'flex'
              }`}
            >
              {/* High-res Image Background with Dark Rich Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={b.imageUrl}
                  alt={b.headline}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${b.bgGradient} opacity-90 transition-opacity group-hover:opacity-85`}
                />
              </div>

              {/* Card Content (Flipkart Reference Style) */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-64 sm:h-72">
                {/* Header Tag + Sponsored Pill */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white backdrop-blur-md">
                    {b.tag}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className={`${b.badgeColor} text-white font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs`}>
                      {b.offerBadge}
                    </span>
                    <span className="text-[9px] font-bold text-white/70 bg-black/40 px-1.5 py-0.5 rounded">
                      AD
                    </span>
                  </div>
                </div>

                {/* Main Headline & Price Callout */}
                <div className="space-y-1.5 my-auto">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
                    {b.headline}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                    {b.subline}
                  </p>
                  <div className="pt-2 flex items-baseline space-x-2">
                    <span className="text-lg sm:text-xl font-black text-white">
                      {b.priceTag}
                    </span>
                    <span className="text-[11px] text-stone-300">
                      • {b.locality}
                    </span>
                  </div>
                </div>

                {/* Footer Action Pill */}
                <div className="pt-2 flex items-center justify-between border-t border-white/15">
                  <span className="text-xs font-bold text-white flex items-center group-hover:translate-x-1 transition-transform">
                    <span>Visit Store Deals</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-orange-400" />
                  </span>
                  <span className="text-[10px] text-stone-300 flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
                    Verified Merchant
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Dots Pagination (Matching Flipkart screenshot) */}
      <div className="flex items-center justify-center space-x-1.5 mt-3.5 md:hidden">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
              i === activeSlide ? 'w-6 bg-orange-600' : 'w-1.5 bg-stone-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

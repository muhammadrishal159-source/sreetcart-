import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const FlipkartBannerCarousel = ({ onOpenShop }) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {banners.map((b, index) => (
          <div
            key={b.id}
            onClick={() => onOpenShop(b.shopId)}
            className={`rounded-3xl overflow-hidden relative cursor-pointer group shadow-[0_12px_36px_-12px_rgba(27,28,25,0.16)] hover:shadow-[0_22px_48px_-12px_rgba(234,179,8,0.28)] transition-all duration-300 border border-[#EAE4D3] hover:border-[#FACC15] flex flex-col justify-between ${
              index !== activeSlide ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Image Background with Deep Charcoal Editorial Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={b.imageUrl}
                alt={b.headline}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C19]/95 via-[#1B1C19]/70 to-[#1B1C19]/35 transition-opacity" />
            </div>

            {/* Card Content */}
            <div className="relative z-10 p-6 flex flex-col justify-between h-64 sm:h-72">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/15 text-[#FFFDF7] backdrop-blur-md border border-white/15">
                  {b.tag}
                </span>
                <div className="flex items-center space-x-1.5">
                  <span className="bg-[#FACC15] text-[#1B1C19] font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-xs">
                    {b.offerBadge}
                  </span>
                  <span className="text-[9px] font-bold text-white/75 bg-black/45 px-1.5 py-0.5 rounded-full">
                    AD
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 my-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-[#FACC15] transition-colors">
                  {b.headline}
                </h3>
                <p className="text-xs text-[#E5E0D3] line-clamp-2 leading-relaxed">
                  {b.subline}
                </p>
                <div className="pt-2 flex items-baseline space-x-2">
                  <span className="text-lg sm:text-xl font-extrabold text-[#FACC15]">
                    {b.priceTag}
                  </span>
                  <span className="text-[11px] text-[#D6D3C9]">
                    • {b.locality}
                  </span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-white/15">
                <span className="text-xs font-bold text-white flex items-center group-hover:translate-x-1 transition-transform">
                  <span>Visit Store Deals</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#FACC15]" />
                </span>
                <span className="text-[10px] text-[#E5E0D3] flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#FACC15]" />
                  Verified Merchant
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots Pagination */}
      <div className="flex items-center justify-center space-x-1.5 mt-4 md:hidden">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
              i === activeSlide ? 'w-7 bg-[#EAB308]' : 'w-1.5 bg-[#D3C5AC]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

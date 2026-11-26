import React from 'react';
import { ArrowRight, Store, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export function PremiumHomeHero({ onExploreCollection, onBrowseShops, shopCount = 0 }) {
  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden bg-[#1B1C19]">
      {/* Full-width Luxury Lifestyle Background Image */}
      <img
        src="/images/bg-home-hero-banner.jpg"
        alt="Curated Kozhikode boutique showcase with leather bag, footwear, and handloom textiles"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center scale-[1.01] transition-transform duration-1000"
      />

      {/* Subtle Dark Gradient Overlay for Crisp Readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1B1C19]/92 via-[#1B1C19]/72 to-[#1B1C19]/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1C19]/70 via-transparent to-[#1B1C19]/25"
      />

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="max-w-2xl space-y-6">
          {/* Editorial Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FACC15]/35 text-[#FACC15] text-[11px] font-bold uppercase tracking-[0.16em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kozhikode’s Premier Local Marketplace</span>
          </div>

          {/* Powerful Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-[-0.025em] leading-[1.08]">
            Discover City Stores &amp;{' '}
            <span className="text-[#FACC15]">Curated Offers</span> in One Place.
          </h1>

          {/* Engaging Short Description */}
          <p className="text-sm sm:text-base lg:text-lg text-[#E5E0D3] leading-relaxed max-w-xl font-normal">
            Explore verified fashion boutiques, footwear, watches, sports gear, and electronics across SM Street, Mavoor Road, Focus Mall, and Palayam—at honest local prices.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3.5">
            <button
              type="button"
              onClick={onExploreCollection}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] shadow-[0_16px_38px_-6px_rgba(250,204,21,0.48)] hover:shadow-[0_22px_46px_-4px_rgba(250,204,21,0.65)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onBrowseShops}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#FACC15]" />
              <span>Browse {shopCount > 0 ? `${shopCount} ` : ''}Stores</span>
            </button>
          </div>

          {/* Subtle Trust Strip */}
          <div className="pt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#D6D3C9] border-t border-white/15">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FACC15]" />
              <span>Verified Calicut Merchants</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FACC15]" />
              <span>SM Street • Mavoor Rd • Palayam</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

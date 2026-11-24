import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Tag,
  ExternalLink,
} from 'lucide-react';

export const FeaturedSponsoredBanner = ({ shops = [], products = [], onOpenShop }) => {
  // Filter shops that have paid for homepage promotion
  const sponsoredShops = (shops || []).filter((s) => s?.isFeatured || (s?.adPriority && s.adPriority > 5));

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!sponsoredShops || sponsoredShops.length === 0) return null;

  const currentShop = sponsoredShops[currentIndex] || sponsoredShops[0];
  if (!currentShop) return null;

  // Find top offer from this sponsored shop
  const shopOffer = (products || []).find(
    (p) =>
      p?.shopId === (currentShop._id || currentShop.id || currentShop.slug) &&
      p?.discountPercentage > 0,
  ) || (products || []).find((p) => p?.shopId === (currentShop._id || currentShop.id || currentShop.slug));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sponsoredShops.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sponsoredShops.length) % sponsoredShops.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
      {/* Editorial Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-md bg-amber-500/10 text-amber-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
              <span>Featured Stores &amp; Sponsored Offers</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded border border-amber-300">
                PROMOTED
              </span>
            </h2>
          </div>
        </div>

        {sponsoredShops.length > 1 && (
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-slate-900 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Previous Sponsored Store"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-stone-400 px-1">
              {currentIndex + 1} / {sponsoredShops.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-slate-900 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Next Sponsored Store"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Sponsored Banner Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Cover & Visuals */}
          <div className="lg:col-span-7 relative h-56 sm:h-72 lg:h-auto overflow-hidden bg-slate-900">
            <img
              src={currentShop.bannerUrl}
              alt={currentShop.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/60" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>Sponsored Partner</span>
              </span>

              <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Calicut Store</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <h3 className="font-extrabold text-xl">{currentShop.name}</h3>
              <p className="text-xs text-stone-200 flex items-center mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400 mr-1" />
                {currentShop.area}
              </p>
            </div>
          </div>

          {/* Details & Featured Offer */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="hidden lg:flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-xl border-2 bg-white overflow-hidden shadow-xs shrink-0"
                  style={{ borderColor: currentShop.brandColor || '#E04F2E' }}
                >
                  <img
                    src={currentShop.logoUrl}
                    alt={currentShop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-0.5"
                    style={{
                      backgroundColor: `${currentShop.brandColor || '#E04F2E'}15`,
                      color: currentShop.brandColor || '#E04F2E',
                    }}
                  >
                    {currentShop.category}
                  </span>
                  <h3 className="font-extrabold text-xl text-slate-900 tracking-tight leading-snug">
                    {currentShop.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-stone-500">
                <span className="flex items-center font-medium text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1" />
                  {currentShop.area}
                </span>
                <span className="flex items-center font-semibold text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  {currentShop.rating || 4.9} Rating
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                {currentShop.description}
              </p>

              {/* Spotlighted Offer Box */}
              {shopOffer && (
                <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-3.5 flex items-center space-x-3.5 shadow-2xs">
                  <img
                    src={shopOffer.imageUrl}
                    alt={shopOffer.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-stone-200 aspect-square"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] bg-red-100 text-red-700 font-extrabold px-1.5 py-0.2 rounded">
                        {shopOffer.discountPercentage}% OFF
                      </span>
                      {shopOffer.offerTag && (
                        <span className="text-[10px] text-stone-500 truncate">
                          {shopOffer.offerTag}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">
                      {shopOffer.title}
                    </h4>
                    <div className="flex items-baseline space-x-2 mt-0.5">
                      <span className="text-sm font-black text-slate-900">
                        ₹{shopOffer.price}
                      </span>
                      {shopOffer.originalPrice > shopOffer.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{shopOffer.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenShop(currentShop._id || currentShop.id || currentShop.slug)}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>Visit Sponsored Storefront</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

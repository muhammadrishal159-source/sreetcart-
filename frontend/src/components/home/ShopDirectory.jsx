import React from 'react';
import { Store, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';

export const ShopDirectory = ({ shops, onOpenShop }) => {
  return (
    <section className="relative overflow-hidden py-10">
      <img
        src="/images/bg-storefront-directory.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFFDF7] via-[#FFFDF7]/80 to-[#FFFDF7]"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-xl bg-[#FEF9C3] border border-[#FDE047]/60 text-[#854D0E]">
              <Store className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1C19] tracking-tight">
              City Store Directory
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5647] mt-1">
            Visit individual shop profiles, browse exclusive catalogs, and contact store owners directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(shops || []).map((shop) => (
          <div
            key={shop._id || shop.id}
            onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
            className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-[0_2px_14px_rgba(27,28,25,0.04)] hover:shadow-[0_18px_38px_-10px_rgba(234,179,8,0.22)] hover:border-[#FACC15] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Banner */}
              <div className="h-36 w-full relative overflow-hidden bg-[#F5F3EE]">
                <img
                  src={shop.bannerUrl}
                  alt={shop.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C19]/70 to-transparent" />

                {shop.isFeatured && (
                  <span className="absolute top-3 left-3 bg-[#FACC15] text-[#1B1C19] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow">
                    <Sparkles className="w-3 h-3 text-[#1B1C19]" />
                    <span>FEATURED</span>
                  </span>
                )}

                <div className="absolute bottom-2.5 right-3 text-white text-xs font-semibold flex items-center space-x-1 bg-[#1B1C19]/70 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  <Star className="w-3 h-3 fill-[#FACC15] text-[#FACC15]" />
                  <span>{shop.rating || 4.8}</span>
                </div>
              </div>

              {/* Logo & Info */}
              <div className="px-5 pt-0 pb-4 relative">
                <div className="w-14 h-14 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-white -mt-7 relative z-10 ring-1 ring-[#EAE4D3]">
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047]/60">
                      {shop.category}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      ● Open Now
                    </span>
                  </div>

                  <h3 className="font-bold text-[#1B1C19] text-base group-hover:text-[#A16207] transition-colors">
                    {shop.name}
                  </h3>

                  <p className="text-xs text-[#5C5647] flex items-center pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#CA8A04] mr-1 shrink-0" />
                    <span className="truncate">{shop.area || shop.address}</span>
                  </p>

                  <p className="text-xs text-[#5C5647] line-clamp-2 pt-1 leading-relaxed">
                    {shop.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-[#FFFDF7] border-t border-[#F5F3EE] flex items-center justify-between text-xs font-bold text-[#1B1C19] group-hover:text-[#A16207]">
              <span>View Shop &amp; Catalog</span>
              <ArrowRight className="w-4 h-4 text-[#CA8A04] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Store, MapPin, Star, Phone, ArrowRight, Sparkles } from 'lucide-react';

export const ShopDirectory = ({ shops, onOpenShop, onSelectCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
              <Store className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              City Store Directory
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visit individual shop profiles, browse exclusive catalogs, and contact store owners directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(shops || []).map((shop) => (
          <div
            key={shop._id || shop.id}
            onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Banner */}
              <div className="h-32 w-full relative overflow-hidden bg-slate-200">
                <img
                  src={shop.bannerUrl}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {shop.isFeatured && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow">
                    <Sparkles className="w-3 h-3 text-slate-900" />
                    <span>FEATURED</span>
                  </span>
                )}

                <div className="absolute bottom-2 right-3 text-white text-xs font-semibold flex items-center space-x-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{shop.rating || 4.8}</span>
                </div>
              </div>

              {/* Logo & Info */}
              <div className="px-5 pt-0 pb-4 relative">
                {/* Overlapping Logo */}
                <div
                  className="w-14 h-14 rounded-xl border-4 border-white shadow-md overflow-hidden bg-white -mt-7 relative z-10"
                  style={{ borderColor: shop.brandColor || '#FF5A36' }}
                >
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${shop.brandColor || '#FF5A36'}15`,
                        color: shop.brandColor || '#FF5A36',
                      }}
                    >
                      {shop.category}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      ● Open Now
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                    {shop.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 mr-1 shrink-0" />
                    <span className="truncate">{shop.area || shop.address}</span>
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 pt-1">
                    {shop.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-orange-600">
              <span>View Shop & Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

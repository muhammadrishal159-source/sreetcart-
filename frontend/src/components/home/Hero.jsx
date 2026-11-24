import React from 'react';
import {
  Sparkles,
  MapPin,
  Tag,
  ShieldCheck,
  ArrowRight,
  Store,
  User,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Hero = ({ onExploreShops, onOpenAuth, onNavigate }) => {
  const { user, isShopOwner } = useAuth();

  return (
    <div className="relative overflow-hidden bg-white border border-stone-200/90 rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-xs">
      {/* Editorial subtle warm ambient glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="max-w-2xl space-y-6 text-center lg:text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs font-bold tracking-tight shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Kozhikode City Marketplace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="font-semibold text-stone-600">SM Street • Mavoor Rd • Focus Mall</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Discover City Stores &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500">
              Best Offers
            </span>{' '}
            in One Place
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
            Browse verified local boutiques, footwear, sports kits, and electronics across Kozhikode in one refined application instead of checking dozens of separate social media accounts.
          </p>

          {/* Smart Contextual Actions based on Auth State */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            {user ? (
              // When user is already logged in: show contextual welcome & actions
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-100 text-slate-900 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Welcome back, {user.name}</span>
                </div>

                {isShopOwner ? (
                  <button
                    onClick={() => onNavigate && onNavigate('dashboard')}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-orange-400" />
                    <span>My Store Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onExploreShops}
                    className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Explore Today's Offers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => onNavigate && onNavigate('shops')}
                  className="px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-slate-900 hover:bg-stone-50 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <span>Browse All Shops</span>
                </button>
              </div>
            ) : (
              // When user is a visitor: clean, prominent entry buttons
              <>
                <button
                  onClick={() => onOpenAuth('customer')}
                  className="px-5 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Customer Login</span>
                </button>

                <button
                  onClick={() => onOpenAuth('shop_owner')}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Store className="w-4 h-4 text-amber-400" />
                  <span>Shop Owner Login</span>
                </button>

                <button
                  onClick={onExploreShops}
                  className="px-4 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Explore Deals</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
                </button>
              </>
            )}
          </div>

          {/* Social Proof & Value Props */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100 text-xs text-stone-600">
            <div>
              <p className="font-extrabold text-slate-900 text-base sm:text-lg">50+ Stores</p>
              <p className="text-[11px] text-stone-400">SM Street &amp; City Hubs</p>
            </div>
            <div>
              <p className="font-extrabold text-orange-600 text-base sm:text-lg">Up to 60% Off</p>
              <p className="text-[11px] text-stone-400">Verified City Deals</p>
            </div>
            <div>
              <p className="font-extrabold text-emerald-600 text-base sm:text-lg">Instant Delivery</p>
              <p className="text-[11px] text-stone-400">60-Min Doorstep Delivery</p>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Spotlight Card with Clean Ratio */}
        <div className="w-full lg:w-96 shrink-0 bg-[#FAF9F6] p-5 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
            <span className="text-xs font-bold text-orange-700 flex items-center">
              <Tag className="w-3.5 h-3.5 mr-1 text-orange-600" />
              City Offer Spotlight
            </span>
            <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-extrabold">
              FEATURED
            </span>
          </div>

          {/* Image with Aspect Ratio [4/3] so it never stretches */}
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] bg-stone-200 shadow-2xs">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format&fit=crop&q=80"
              alt="Malabar Kurti"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2.5 right-2.5 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-md">
              40% OFF
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-orange-600 font-bold uppercase tracking-wide">
              SM Street Heritage Silks
            </p>
            <h4 className="font-extrabold text-sm text-slate-900 truncate">
              Pure Malabar Cotton Kurti with Embroidery
            </h4>
            <div className="flex items-baseline space-x-2 pt-1">
              <span className="text-xl font-black text-slate-900">₹899</span>
              <span className="text-xs text-stone-400 line-through">₹1,499</span>
              <span className="text-xs font-bold text-emerald-600">Save ₹600</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-stone-600 flex items-center justify-between bg-white p-2.5 rounded-xl border border-stone-200/70">
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1" />
              SM Street, Kozhikode
            </span>
            <span className="text-emerald-700 font-bold">● In Stock</span>
          </div>
        </div>
      </div>
    </div>
  );
};

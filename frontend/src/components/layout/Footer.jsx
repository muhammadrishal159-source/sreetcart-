import React from 'react';
import { ShoppingBag, MapPin, Store, Phone, ShieldCheck } from 'lucide-react';
import { THEME } from '../../theme/theme';

export const Footer = ({ onOpenAuth, onSelectCategory }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Street<span className="text-orange-500">Cart</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover City Stores & Best Offers in One Place. Connect directly with
              local shops across Kozhikode without scrolling through hundreds of separate Instagram and WhatsApp feeds.
            </p>
            <p className="text-xs text-orange-400 font-medium">
              "Discover City Stores & Best Offers in One Place"
            </p>
          </div>

          {/* Quick Hubs in Calicut */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Kozhikode Shopping Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {(THEME.city?.popularHubs || []).map((hub) => (
                <li key={hub} className="flex items-center">
                  <MapPin className="w-3 h-3 text-orange-500 mr-2 shrink-0" />
                  <span>{hub}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {THEME.categories.filter((c) => c.id !== 'All').map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(c.id)}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Shop Owners */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              For Local Merchants
            </h4>
            <p className="text-xs text-slate-400">
              Own a retail shop in Kozhikode? List your store profile and publish daily offers directly to city shoppers.
            </p>
            <button
              onClick={() => onOpenAuth('shop_owner')}
              className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>Register Your Shop</span>
            </button>
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero commission in Phase 1</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StreetCart Kozhikode. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Phase 1 Working Foundation • Clean Modular Architecture</p>
        </div>
      </div>
    </footer>
  );
};

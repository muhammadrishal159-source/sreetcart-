import React from 'react';
import { MapPin, Store, ShieldCheck } from 'lucide-react';
import { THEME } from '../../theme/theme';
import { StreetCartLogo } from '../common/StreetCartLogo';

export const Footer = ({ onOpenAuth, onSelectCategory }) => {
  return (
    <footer className="bg-[#1B1C19] text-[#D6D3C9] mt-20 border-t border-[#2E2F2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <StreetCartLogo className="w-9 h-9 rounded-xl" />
              <span className="font-extrabold text-xl text-white tracking-tight">
                Street<span className="text-[#FACC15]">Cart</span>
              </span>
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              Discover City Stores &amp; Best Offers in One Place. Connect directly with
              local shops across Nadapuram without scrolling through hundreds of separate Instagram and WhatsApp feeds.
            </p>
            <p className="text-xs text-[#FACC15] font-semibold">
              &ldquo;Discover City Stores &amp; Best Offers in One Place&rdquo;
            </p>
          </div>

          {/* Quick Hubs in Calicut */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] mb-4">
              Nadapuram Shopping Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              {(THEME.city?.popularHubs || []).map((hub) => (
                <li key={hub} className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-[#FACC15] mr-2 shrink-0" />
                  <span>{hub}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              {THEME.categories
                .filter((c) => c.id !== 'All')
                .map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => onSelectCategory && onSelectCategory(c.id)}
                      className="hover:text-[#FACC15] transition-colors text-left cursor-pointer"
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* For Shop Owners */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.14em] mb-4">
              For Local Merchants
            </h4>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              Own a retail shop in Nadapuram? List your store profile and publish daily offers directly to city shoppers.
            </p>
            <button
              onClick={() => onOpenAuth('shop_owner')}
              className="inline-flex items-center space-x-2 bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>Register Your Shop</span>
            </button>
            <div className="flex items-center space-x-1.5 text-[11px] text-[#A8A29E] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>Zero commission in Phase 1</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#2E2F2A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#817660]">
          <p>© {new Date().getFullYear()} StreetCart Nadapuram. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Phase 1 Working Foundation • Clean Modular Architecture</p>
        </div>
      </div>
    </footer>
  );
};

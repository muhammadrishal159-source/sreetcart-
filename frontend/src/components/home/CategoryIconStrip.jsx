import React from 'react';
import {
  Sparkles,
  Shirt,
  ShoppingBag,
  Watch,
  Trophy,
  Smartphone,
  MapPin,
  Flame,
  Store,
} from 'lucide-react';
import { THEME } from '../../theme/theme';

const ICON_MAP = {
  Sparkles,
  Shirt,
  ShoppingBag,
  Watch,
  Trophy,
  Smartphone,
  Store,
};

export const CategoryIconStrip = ({
  selectedCategory,
  onSelectCategory,
  selectedArea,
  onSelectArea,
}) => {
  return (
    <div className="bg-white border-b border-stone-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: Flipkart-Style Horizontal Category Icon Navigation */}
        <div className="flex items-center justify-between sm:justify-center space-x-6 sm:space-x-10 overflow-x-auto py-3 scrollbar-none">
          {(THEME.categories || []).map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Store;
            const isSelected = (selectedCategory || 'All').toLowerCase() === cat.id.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col items-center justify-center space-y-1.5 shrink-0 focus:outline-none cursor-pointer py-1 relative"
              >
                {/* Round Category Icon / Image Avatar */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-105 ring-2 ring-orange-500/30'
                      : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-100 group-hover:scale-105 border border-stone-200/80'
                  }`}
                >
                  {cat.img ? (
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        isSelected ? 'brightness-90 ring-2 ring-orange-600' : ''
                      }`}
                    />
                  ) : (
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? 'text-white' : 'text-stone-700'}`} />
                  )}

                  {cat.id === 'All' && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white" />
                  )}
                </div>

                {/* Category Label */}
                <span
                  className={`text-[11px] sm:text-xs tracking-tight transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'font-black text-orange-600'
                      : 'font-semibold text-stone-700 group-hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </span>

                {/* Active Indicator Bar Underneath */}
                {isSelected && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Row 2: Kozhikode Shopping Hub Locality Chips */}
        <div className="py-2.5 border-t border-stone-100 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-1 text-stone-400 text-xs shrink-0 pr-1">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 hidden sm:inline">
              Calicut Hubs:
            </span>
          </div>

          {(THEME.city?.districts || []).map((district) => {
            const isSelected = (selectedArea || 'all').toLowerCase() === district.id.toLowerCase();
            return (
              <button
                key={district.id}
                onClick={() => onSelectArea && onSelectArea(district.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'bg-stone-100/80 hover:bg-stone-200/80 text-stone-600 hover:text-slate-900'
                }`}
              >
                <span>{district.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

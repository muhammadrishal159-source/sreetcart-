import React from 'react';
import {
  MapPin,
  Store,
  Shirt,
  Watch,
  ShoppingBag,
  Trophy,
  Smartphone,
  X,
} from 'lucide-react';
import { THEME } from '../../theme/theme';

const ICON_MAP = {
  Store,
  Shirt,
  Watch,
  ShoppingBag,
  Trophy,
  Smartphone,
};

export const DiscoveryBar = ({
  selectedCategory,
  onSelectCategory,
  selectedArea,
  onSelectArea,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-4">
        {/* Top: Categories Pills */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 rounded-full bg-orange-600 mr-2" />
              Product Category
            </h3>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => onSelectCategory('All')}
                className="text-[11px] text-orange-600 hover:text-orange-700 font-semibold flex items-center cursor-pointer"
              >
                <span>Reset</span>
                <X className="w-3 h-3 ml-0.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {(THEME.categories || []).map((cat) => {
              const Icon = ICON_MAP[cat.icon] || Store;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-[#FAF9F6] text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-orange-400' : 'text-stone-500'
                    }`}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom: Nadapuram Localities / Shopping Hubs */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1.5" />
              Nadapuram Shopping Hub / Area
            </h3>
            {selectedArea && selectedArea !== 'all' && (
              <button
                onClick={() => onSelectArea('all')}
                className="text-[11px] text-orange-600 hover:text-orange-700 font-semibold flex items-center cursor-pointer"
              >
                <span>All Areas</span>
                <X className="w-3 h-3 ml-0.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {(THEME.city?.districts || []).map((district) => {
              const isSelected =
                (selectedArea || 'all').toLowerCase() === district.id.toLowerCase();

              return (
                <button
                  key={district.id}
                  onClick={() => onSelectArea(district.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs font-bold'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/70'
                  }`}
                >
                  <span>{district.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

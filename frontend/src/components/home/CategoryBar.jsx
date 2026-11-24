import React from 'react';
import {
  Store,
  Shirt,
  Watch,
  ShoppingBag,
  Trophy,
  Smartphone,
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

export const CategoryBar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
          <span className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
          Browse by Category
        </h3>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-2 scrollbar-none">
        {THEME.categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Store;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-102 ring-2 ring-orange-500/50'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isSelected ? 'text-orange-400' : 'text-slate-500'
                }`}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

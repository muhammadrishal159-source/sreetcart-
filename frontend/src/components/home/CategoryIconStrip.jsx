import React, { useState } from 'react';
import {
  Sparkles,
  Shirt,
  ShoppingBag,
  Watch,
  Trophy,
  Smartphone,
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

const CATEGORY_SLUGS = {
  All: 'for-you',
  Dress: 'fashion',
  'Bags & Shoes': 'footwear-bags',
  Accessories: 'watches-jewelry',
  Sports: 'sports-fitness',
  Electronics: 'electronics',
};

export const CategoryIconStrip = ({
  selectedCategory,
  onSelectCategory,
  onOpenCategoryPage,
}) => {
  const [brokenImgs, setBrokenImgs] = useState({});

  return (
    <div className="relative overflow-hidden bg-[#FFFDF7] border-b border-[#EAE4D3] shadow-[0_4px_16px_rgba(27,28,25,0.03)]">
      <img
        src="/images/bg-marketplace-hero.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-right opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFDF7]/95 via-[#FFFDF7]/88 to-[#FFFDF7]/60"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: Category Icon Navigation right below Navbar */}
        <div className="flex items-center justify-between sm:justify-center space-x-5 sm:space-x-9 overflow-x-auto py-3.5 scrollbar-none">
          {(THEME.categories || []).map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Store;
            const isSelected = (selectedCategory || 'All').toLowerCase() === cat.id.toLowerCase();
            const showImage = cat.img && !brokenImgs[cat.id];

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (onOpenCategoryPage) {
                    onOpenCategoryPage(CATEGORY_SLUGS[cat.id] || 'for-you');
                  }
                }}
                className="group flex flex-col items-center justify-center space-y-1.5 shrink-0 focus:outline-none cursor-pointer py-1 relative transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#FACC15] text-[#1B1C19] shadow-[0_10px_24px_-6px_rgba(234,179,8,0.55)] scale-105 ring-2 ring-[#EAB308]'
                      : 'bg-white text-[#4F4633] hover:bg-[#FEF9C3]/60 border border-[#EAE4D3] shadow-2xs group-hover:border-[#FACC15]'
                  }`}
                >
                  {showImage ? (
                    <img
                      src={cat.img}
                      alt={cat.label}
                      onError={() =>
                        setBrokenImgs((prev) => ({ ...prev, [cat.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        isSelected ? 'text-[#1B1C19]' : 'text-[#854D0E]'
                      }`}
                    />
                  )}

                  {cat.id === 'All' && (
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#FACC15] ring-2 ring-white shadow-xs" />
                  )}
                </div>

                <span
                  className={`text-[11px] sm:text-xs tracking-tight transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'font-extrabold text-[#1B1C19]'
                      : 'font-semibold text-[#5C5647] group-hover:text-[#1B1C19]'
                  }`}
                >
                  {cat.label}
                </span>

                {isSelected && (
                  <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#EAB308] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

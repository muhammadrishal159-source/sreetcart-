import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const LUXURY_EASE = [0.22, 1, 0.36, 1];

// Matching multi-variant / color-cycling images for each category thumbnail
const CATEGORY_VARIANTS = {
  All: {
    intervalMs: 3600,
    images: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=200&auto=format&fit=crop&q=80',
    ],
  },
  Dress: {
    intervalMs: 3200,
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&auto=format&fit=crop&q=80',
    ],
  },
  'Bags & Shoes': {
    intervalMs: 2800,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&auto=format&fit=crop&q=80',
    ],
  },
  Accessories: {
    intervalMs: 3400,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=200&auto=format&fit=crop&q=80',
    ],
  },
  Sports: {
    intervalMs: 3900,
    images: [
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=200&auto=format&fit=crop&q=80',
    ],
  },
  Electronics: {
    intervalMs: 3000,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&auto=format&fit=crop&q=80',
    ],
  },
};

function CategoryThumbButton({ cat, isSelected, onClick }) {
  const Icon = ICON_MAP[cat.icon] || Store;
  const variantConfig = CATEGORY_VARIANTS[cat.id];
  const images = variantConfig?.images || (cat.img ? [cat.img] : []);
  const intervalMs = variantConfig?.intervalMs || 3400;

  const [activeIdx, setActiveIdx] = useState(0);
  const [brokenUrls, setBrokenUrls] = useState({});

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  const currentSrc = images[activeIdx];
  const showImage = currentSrc && !brokenUrls[currentSrc];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group flex flex-col items-center justify-center space-y-1.5 shrink-0 focus:outline-none cursor-pointer py-1 relative"
    >
      {/* 3D Recessed Luxury Thumbnail Frame */}
      <div
        style={{ perspective: '600px' }}
        className={`w-14 h-14 sm:w-16 sm:h-16 p-1 rounded-2xl transition-all duration-300 relative ${
          isSelected
            ? 'bg-gradient-to-br from-[#FDE047] via-[#FACC15] to-[#EAB308] shadow-[0_12px_26px_-6px_rgba(234,179,8,0.58)] ring-2 ring-[#EAB308]'
            : 'bg-gradient-to-br from-white via-[#FFFDF7] to-[#FEF9C3] border border-[#EAE4D3] shadow-[0_6px_16px_-6px_rgba(133,77,14,0.18)] group-hover:border-[#FACC15] group-hover:shadow-[0_10px_22px_-6px_rgba(234,179,8,0.35)]'
        }`}
      >
        <div className="w-full h-full rounded-xl overflow-hidden bg-[#F6F3EA] relative flex items-center justify-center">
          {showImage ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSrc}
                src={currentSrc}
                alt={cat.label}
                initial={{ opacity: 0, scale: 1.1, rotateY: 22 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: -22 }}
                transition={{ duration: 0.5, ease: LUXURY_EASE }}
                onError={() =>
                  setBrokenUrls((prev) => ({ ...prev, [currentSrc]: true }))
                }
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          ) : (
            <Icon
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                isSelected ? 'text-[#1B1C19]' : 'text-[#854D0E]'
              }`}
            />
          )}

          {/* Subtle Glossy Specular Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/35 opacity-50 group-hover:opacity-80 transition-opacity"
          />
        </div>

        {cat.id === 'All' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FACC15] ring-2 ring-white shadow-xs" />
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
    </motion.button>
  );
}

export const CategoryIconStrip = ({
  selectedCategory,
  onSelectCategory,
  onOpenCategoryPage,
}) => {
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
        <div className="flex items-center justify-between sm:justify-center space-x-5 sm:space-x-9 overflow-x-auto py-3.5 scrollbar-none">
          {(THEME.categories || []).map((cat) => {
            const isSelected =
              (selectedCategory || 'All').toLowerCase() === cat.id.toLowerCase();

            return (
              <CategoryThumbButton
                key={cat.id}
                cat={cat}
                isSelected={isSelected}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (onOpenCategoryPage) {
                    onOpenCategoryPage(CATEGORY_SLUGS[cat.id] || 'for-you');
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

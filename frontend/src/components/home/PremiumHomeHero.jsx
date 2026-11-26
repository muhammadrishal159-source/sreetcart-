import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Store, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export function PremiumHomeHero({ onExploreCollection, onBrowseShops, shopCount = 0 }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Subtle editorial parallax on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden bg-[#FFFDF7]"
    >
      {/* Full-width Bright Luxury Fashion Background Image with Subtle Parallax */}
      <motion.img
        src="/images/bg-home-hero-banner.jpg"
        alt="Bright luxury fashion and gold jewelry editorial showcase for Nadapuram stores"
        fetchPriority="high"
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-[70%_20%] sm:object-[center_20%] will-change-transform"
      />

      {/* Light Warm-Ivory Gradient Overlay for Crisp Readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFDF7]/96 via-[#FFFDF7]/82 to-[#FFFDF7]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FFFDF7]/85 via-transparent to-[#FFFDF7]/35"
      />

      {/* Hero Foreground Content with Staggered Reveal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        <div className="max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9E7]/90 backdrop-blur-md border border-[#FACC15]/60 text-[#92400E] text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Nadapuram’s Premier Local Marketplace</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: LUXURY_EASE }}
            className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1B1C19] tracking-[-0.025em] leading-[1.08]"
          >
            Discover City Stores &amp;{' '}
            <span
              className="text-[#B45309] font-semibold italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Curated Offers
            </span>{' '}
            in One Place.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: LUXURY_EASE }}
            className="text-sm sm:text-base lg:text-lg text-[#4B4A42] leading-relaxed max-w-xl font-normal"
          >
            Explore verified fashion boutiques, footwear, watches, sports gear, and electronics across SM Street, Mavoor Road, Focus Mall, and Palayam—at honest local prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: LUXURY_EASE }}
            className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3.5"
          >
            <motion.button
              type="button"
              onClick={onExploreCollection}
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] shadow-[0_16px_38px_-6px_rgba(250,204,21,0.48)] hover:shadow-[0_22px_46px_-4px_rgba(250,204,21,0.65)] transition-colors duration-300 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              type="button"
              onClick={onBrowseShops}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#1B1C19]/15 text-[#1B1C19] text-xs sm:text-sm font-bold uppercase tracking-[0.1em] shadow-sm transition-colors duration-200 cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#D97706]" />
              <span>Browse {shopCount > 0 ? `${shopCount} ` : ''}Stores</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.42, ease: LUXURY_EASE }}
            className="pt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#57564E] border-t border-[#1B1C19]/10"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>Verified Nadapuram Merchants</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D97706]" />
              <span>SM Street • Mavoor Rd • Palayam</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

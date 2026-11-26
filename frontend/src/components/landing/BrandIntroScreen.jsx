import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import { StreetCartLogo } from '../common/StreetCartLogo';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

// Curated multi-color / multi-variant product sets for each 3D side card
const FLOATING_SHOWCASE_CARDS = [
  {
    id: 'fashion',
    label: 'Fashion',
    slug: 'fashion',
    rotate: -14,
    yOffset: 26,
    intervalMs: 3200,
    variants: [
      {
        src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&auto=format&fit=crop&q=80',
        dot: '#E5E0D3',
      },
      {
        src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&auto=format&fit=crop&q=80',
        dot: '#EAB308',
      },
      {
        src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80',
        dot: '#78550A',
      },
    ],
  },
  {
    id: 'footwear',
    label: 'Footwear',
    slug: 'footwear-bags',
    rotate: -7,
    yOffset: -12,
    intervalMs: 2800,
    variants: [
      {
        src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80',
        dot: '#B45309',
      },
      {
        src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop&q=80',
        dot: '#FACC15',
      },
      {
        src: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&auto=format&fit=crop&q=80',
        dot: '#1B1C19',
      },
    ],
  },
  {
    id: 'watches',
    label: 'Watches',
    slug: 'watches-jewelry',
    rotate: 7,
    yOffset: -12,
    intervalMs: 3400,
    variants: [
      {
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
        dot: '#E5E7EB',
      },
      {
        src: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80',
        dot: '#CA8A04',
      },
      {
        src: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&auto=format&fit=crop&q=80',
        dot: '#27272A',
      },
    ],
  },
  {
    id: 'electronics',
    label: 'Electronics',
    slug: 'electronics',
    rotate: 14,
    yOffset: 26,
    intervalMs: 3000,
    variants: [
      {
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
        dot: '#FACC15',
      },
      {
        src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80',
        dot: '#FFFDF7',
      },
      {
        src: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80',
        dot: '#1B1C19',
      },
    ],
  },
];

function ShowcaseVariantCard({
  card,
  sizeClass,
  marginClass,
  delay,
  hoverY,
  hoverZ,
  parallaxX,
  parallaxY,
  onClick,
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % card.variants.length);
    }, card.intervalMs);
    return () => clearInterval(timer);
  }, [card.intervalMs, card.variants.length]);

  const currentVariant = card.variants[activeIdx];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={card.label}
      style={{
        x: parallaxX,
        y: parallaxY,
        transformStyle: 'preserve-3d',
        boxShadow:
          '0 28px 60px -14px rgba(133, 77, 14, 0.34), 0 10px 24px -8px rgba(27, 28, 25, 0.14)',
      }}
      initial={{ opacity: 0, y: card.yOffset + 24, rotate: card.rotate * 1.3 }}
      animate={{
        opacity: 1,
        rotate: card.rotate,
        y: card.yOffset,
      }}
      whileHover={{
        rotate: 0,
        scale: 1.12,
        y: hoverY,
        z: hoverZ,
        boxShadow:
          '0 38px 80px -14px rgba(133, 77, 14, 0.45), 0 14px 30px -8px rgba(234, 179, 8, 0.35)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.75, delay, ease: LUXURY_EASE }}
      className={`${sizeClass} ${marginClass} relative p-2.5 rounded-[28px] bg-gradient-to-br from-white via-[#FFFDF7] to-[#FEF9C3] border-2 border-white ring-1 ring-[#FDE68A] cursor-pointer shrink-0 group`}
    >
      {/* Inner 3D Recessed Image Frame */}
      <div
        style={{ transform: 'translateZ(18px)', perspective: '800px' }}
        className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#F6F3EA] shadow-inner"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentVariant.src}
            src={currentVariant.src}
            alt={card.label}
            initial={{ opacity: 0, scale: 1.08, rotateY: 22 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.94, rotateY: -22 }}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Subtle Glossy Specular Highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-white/40 opacity-50 group-hover:opacity-75 transition-opacity"
        />

        {/* Minimalist Color Variant Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-xs">
          {card.variants.map((v, i) => (
            <span
              key={v.src}
              className={`rounded-full transition-all duration-300 border border-[#1B1C19]/15 ${
                i === activeIdx ? 'w-3 h-1.5 scale-105' : 'w-1.5 h-1.5 opacity-60'
              }`}
              style={{ backgroundColor: v.dot }}
            />
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function BrandIntroScreen({
  onOpeningStart,
  onEnter,
  onSelectCategorySlug,
  onOpenCartPage,
}) {
  const [isEntering, setIsEntering] = useState(false);
  const triggeredRef = useRef(false);

  // Smooth 3D pointer-tracking parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const stageRotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const stageRotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const cardsParallaxX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const cardsParallaxY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const triggerExit = (callback) => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    if (onOpeningStart) {
      onOpeningStart();
    }

    setIsEntering(true);
    setTimeout(() => {
      callback();
    }, 620);
  };

  return (
    <motion.div
      aria-label="StreetCart Luxury Showcase"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0 }}
      animate={
        isEntering
          ? { opacity: 0, scale: 1.08 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.65, ease: LUXURY_EASE }}
      className="fixed inset-0 z-50 w-full h-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-12"
      style={{
        perspective: '1400px',
        background:
          'radial-gradient(circle at 50% 42%, #FFFFFF 0%, #FFFDF5 32%, #FEF9C3 62%, #FDE047 88%, #FACC15 100%)',
      }}
    >
      {/* Subtle Luminous White & Golden Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-white/75 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[780px] h-[300px] rounded-full bg-[#EAB308]/25 blur-3xl"
      />

      {/* Top-Left Logo Only & Top-Right Padlock Only at the very top corners */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.08, ease: LUXURY_EASE }}
        className="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-10 z-30 flex items-center justify-between pointer-events-none"
      >
        <button
          type="button"
          onClick={() => triggerExit(onEnter)}
          aria-label="StreetCart Home"
          className="pointer-events-auto cursor-pointer group focus:outline-none transition-transform duration-300 hover:scale-110"
        >
          <StreetCartLogo className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-[0_8px_22px_-4px_rgba(161,98,7,0.38)]" />
        </button>

        <button
          type="button"
          onClick={() =>
            triggerExit(() => (onOpenCartPage ? onOpenCartPage() : onEnter()))
          }
          aria-label="Open Shopping Page"
          title="Open Shopping Page"
          className="pointer-events-auto p-1.5 text-[#4A2E14] hover:text-[#1B1C19] transition-all duration-200 hover:scale-110 cursor-pointer focus:outline-none"
        >
          <Lock className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
        </button>
      </motion.div>

      {/* Centerpiece & 3D Tilted Floating Product Cards */}
      <motion.div
        style={{
          rotateX: stageRotateX,
          rotateY: stageRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl gap-8 sm:gap-10"
      >
        <div className="relative flex items-center justify-center w-full">
          {/* Left Outer Card (Fashion) */}
          <ShowcaseVariantCard
            card={FLOATING_SHOWCASE_CARDS[0]}
            sizeClass="hidden md:flex w-28 h-28 lg:w-36 lg:h-36"
            marginClass="mr-4 lg:mr-7"
            delay={0.22}
            hoverY={-6}
            hoverZ={60}
            parallaxX={cardsParallaxX}
            parallaxY={cardsParallaxY}
            onClick={() =>
              triggerExit(() =>
                onSelectCategorySlug
                  ? onSelectCategorySlug(FLOATING_SHOWCASE_CARDS[0].slug)
                  : onEnter(),
              )
            }
          />

          {/* Left Inner Card (Footwear - Color Cycling) */}
          <ShowcaseVariantCard
            card={FLOATING_SHOWCASE_CARDS[1]}
            sizeClass="hidden sm:flex w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
            marginClass="mr-4 lg:mr-7"
            delay={0.16}
            hoverY={-18}
            hoverZ={75}
            parallaxX={cardsParallaxX}
            parallaxY={cardsParallaxY}
            onClick={() =>
              triggerExit(() =>
                onSelectCategorySlug
                  ? onSelectCategorySlug(FLOATING_SHOWCASE_CARDS[1].slug)
                  : onEnter(),
              )
            }
          />

          {/* Central 3D Floating Logo & Brand Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.04, rotateX: 5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.85, delay: 0.1, ease: LUXURY_EASE }}
            onClick={() => triggerExit(onEnter)}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative flex flex-col items-center justify-center gap-5 sm:gap-6 z-20 mx-4 sm:mx-8 py-4 px-4 cursor-pointer group select-none"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white/80 blur-3xl transition-transform duration-700 group-hover:scale-125"
            />

            <div
              style={{
                transform: 'translateZ(52px)',
                boxShadow:
                  '0 28px 60px -12px rgba(133, 77, 14, 0.42), 0 8px 20px -6px rgba(234, 179, 8, 0.35)',
              }}
              className="relative z-10 p-3.5 sm:p-4 rounded-[2rem] bg-white/95 backdrop-blur-md ring-2 ring-[#FEF08A] transition-transform duration-500 group-hover:scale-105"
            >
              <StreetCartLogo className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32" />
            </div>

            <div
              style={{ transform: 'translateZ(30px)' }}
              className="relative z-10 flex flex-col items-center gap-2.5"
            >
              <span
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  filter: 'drop-shadow(0 6px 18px rgba(133, 77, 14, 0.16))',
                }}
                className="text-3xl sm:text-4xl lg:text-[46px] font-bold uppercase tracking-[0.22em] bg-gradient-to-b from-[#1B1C19] via-[#2F2510] to-[#78550A] bg-clip-text text-transparent leading-none"
              >
                StreetCart
              </span>
              <span className="w-12 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#A16207]/60 to-transparent" />
            </div>
          </motion.div>

          {/* Right Inner Card (Watches - Color Cycling) */}
          <ShowcaseVariantCard
            card={FLOATING_SHOWCASE_CARDS[2]}
            sizeClass="hidden sm:flex w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
            marginClass="ml-4 lg:ml-7"
            delay={0.16}
            hoverY={-18}
            hoverZ={75}
            parallaxX={cardsParallaxX}
            parallaxY={cardsParallaxY}
            onClick={() =>
              triggerExit(() =>
                onSelectCategorySlug
                  ? onSelectCategorySlug(FLOATING_SHOWCASE_CARDS[2].slug)
                  : onEnter(),
              )
            }
          />

          {/* Right Outer Card (Electronics - Color Cycling) */}
          <ShowcaseVariantCard
            card={FLOATING_SHOWCASE_CARDS[3]}
            sizeClass="hidden md:flex w-28 h-28 lg:w-36 lg:h-36"
            marginClass="ml-4 lg:ml-7"
            delay={0.22}
            hoverY={-6}
            hoverZ={60}
            parallaxX={cardsParallaxX}
            parallaxY={cardsParallaxY}
            onClick={() =>
              triggerExit(() =>
                onSelectCategorySlug
                  ? onSelectCategorySlug(FLOATING_SHOWCASE_CARDS[3].slug)
                  : onEnter(),
              )
            }
          />
        </div>

        {/* Bold Editorial Headline placed directly below the 3D Logo */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: LUXURY_EASE }}
          className="relative z-20 text-center"
        >
          <button
            type="button"
            onClick={() => triggerExit(onEnter)}
            className="group inline-flex flex-col items-center cursor-pointer focus:outline-none"
          >
            <h1
              className="text-3xl sm:text-5xl lg:text-[56px] font-medium tracking-[-0.015em] text-[#1B1C19] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Discover your{' '}
              <span className="italic font-semibold text-[#78550A]">
                StreetCart
              </span>
            </h1>
            <span
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              className="mt-4 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/90 hover:bg-[#1B1C19] text-[#1B1C19] hover:text-[#FACC15] text-[11px] font-bold uppercase tracking-[0.22em] shadow-[0_12px_30px_-8px_rgba(133,77,14,0.28)] border border-[#EAB308]/35 transition-all duration-300"
            >
              <span>Explore Nadapuram Stores</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

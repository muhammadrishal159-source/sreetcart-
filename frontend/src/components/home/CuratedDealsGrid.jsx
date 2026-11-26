import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CuratedDealsGrid = ({ shops = [], onOpenShop, onOpenProduct }) => {
  const { addToCart } = useCart();

  // Curated spotlight deals
  const curatedDeals = [
    {
      id: 'deal_shoes',
      shopId: 'shop_calicut_footwear',
      shopName: 'Metro Footwear & Bags',
      brandBadge: 'METRO FOOTWEAR',
      brandLogo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&auto=format&fit=crop&q=80',
      title: 'Performance Sneakers & Loafers',
      discountBanner: 'Min. 50% Off',
      subtitle: 'Made for motion & street comfort',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      price: 1199,
      originalPrice: 2499,
      locality: 'Mavoor Road',
    },
    {
      id: 'deal_dress',
      shopId: 'shop_sm_street_dress',
      shopName: 'SM Street Heritage Silks',
      brandBadge: 'SM STREET SILKS',
      brandLogo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=100&auto=format&fit=crop&q=80',
      title: 'Handloom Cotton & Silk Kurtis',
      discountBanner: 'Up to 60% Off',
      subtitle: 'Pure Malabar festive elegance',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
      price: 899,
      originalPrice: 1499,
      locality: 'SM Street',
    },
    {
      id: 'deal_sports',
      shopId: 'shop_champions_sports',
      shopName: 'Champions Sports Arena',
      brandBadge: 'CHAMPIONS SPORTS',
      brandLogo: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=100&auto=format&fit=crop&q=80',
      title: 'Pro Football Studs & Team Kits',
      discountBanner: 'Up to 55% Off',
      subtitle: 'Engineered for turf & grass traction',
      imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=80',
      price: 1499,
      originalPrice: 2899,
      locality: 'Near Stadium',
    },
  ];

  return (
    <section className="relative overflow-hidden py-8">
      <img
        src="/images/bg-deals-editorial.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFFDF7] via-[#FFFDF7]/80 to-[#FFFDF7]"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-xl bg-[#FEF9C3] border border-[#FDE047]/60 text-[#854D0E]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1C19] tracking-tight">
              Top Verified City Deals
            </h2>
            <span className="text-[10px] bg-[#FACC15] text-[#1B1C19] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              HOT
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5647] mt-1">
            Handpicked bestsellers from Nadapuram&apos;s most popular shopping hubs
          </p>
        </div>
      </div>

      {/* Grid of 3 Prominent Product Deal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {curatedDeals.map((deal, idx) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-[0_4px_20px_-6px_rgba(27,28,25,0.06)] hover:shadow-[0_18px_40px_-10px_rgba(234,179,8,0.22)] hover:border-[#FACC15] transition-colors duration-300 flex flex-col justify-between group"
          >
            {/* Top Media Container */}
            <div
              onClick={() =>
                onOpenProduct ? onOpenProduct(deal.id) : onOpenShop(deal.shopId)
              }
              className="relative aspect-[4/3] bg-[#F5F3EE] overflow-hidden cursor-pointer"
            >
              <img
                src={deal.imageUrl}
                alt={deal.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-3 right-3 bg-[#1B1C19]/75 backdrop-blur-xs text-[#FFFDF7] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                AD
              </div>

              <div className="absolute bottom-11 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-[#EAE4D3] flex items-center space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full overflow-hidden bg-[#FACC15]">
                  <img src={deal.brandLogo} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-extrabold tracking-wider text-[#1B1C19]">
                  {deal.brandBadge}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1B1C19]/90 via-[#1B1C19]/55 to-transparent pt-7 pb-2.5 px-4 flex items-center justify-between text-white">
                <span className="font-extrabold text-sm text-[#FACC15]">
                  {deal.discountBanner}
                </span>
                <span className="text-[11px] text-[#E5E0D3]">
                  {deal.locality}
                </span>
              </div>
            </div>

            {/* Bottom Content Info */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-[#1B1C19] line-clamp-1 group-hover:text-[#A16207] transition-colors">
                  {deal.title}
                </p>
                <p className="text-xs text-[#5C5647] line-clamp-1 font-medium mt-0.5">
                  {deal.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F3EE] flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-[#1B1C19]">₹{deal.price}</span>
                  <span className="text-xs text-[#817660] line-through ml-1.5">
                    ₹{deal.originalPrice}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const shop = (shops || []).find(
                        (s) => (s._id || s.id || s.slug) === deal.shopId,
                      ) || { name: deal.shopName, area: deal.locality };
                      addToCart(
                        {
                          _id: deal.id,
                          id: deal.id,
                          title: deal.title,
                          price: deal.price,
                          originalPrice: deal.originalPrice,
                          imageUrl: deal.imageUrl,
                          shopId: deal.shopId,
                        },
                        shop,
                        1,
                      );
                    }}
                    className="p-2.5 rounded-full bg-[#FEF9C3] hover:bg-[#FACC15] text-[#1B1C19] transition-all cursor-pointer shadow-2xs"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenShop(deal.shopId)}
                    className="px-4 py-2 rounded-full bg-[#1B1C19] hover:bg-[#2E2F2A] text-white text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Store</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FACC15]" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

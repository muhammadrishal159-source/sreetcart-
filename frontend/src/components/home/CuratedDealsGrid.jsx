import React from 'react';
import { Tag, Sparkles, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CuratedDealsGrid = ({ products = [], shops = [], onOpenShop }) => {
  const { addToCart } = useCart();

  // Curated spotlight deals matching Flipkart bottom row structure
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Editorial Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-orange-100 text-orange-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Top Verified City Deals
            </h2>
            <span className="text-[10px] bg-red-100 text-red-700 font-extrabold px-1.5 py-0.5 rounded">
              HOT
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Handpicked bestsellers from Kozhikode's most popular shopping hubs
          </p>
        </div>
      </div>

      {/* Grid of 3 Prominent Product Deal Cards (Flipkart Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {curatedDeals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top Media Container */}
            <div
              onClick={() => onOpenShop(deal.shopId)}
              className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
            >
              <img
                src={deal.imageUrl}
                alt={deal.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* AD Badge on Top Right (Like Flipkart image) */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-xs text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-md">
                AD
              </div>

              {/* Brand Logo Tag (Like Campus/Pond's pill in reference) */}
              <div className="absolute bottom-11 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-stone-100 flex items-center space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full overflow-hidden bg-orange-600">
                  <img src={deal.brandLogo} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-black tracking-wider text-slate-900">
                  {deal.brandBadge}
                </span>
              </div>

              {/* Dark Gradient Discount Ribbon across Bottom of Image */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-6 pb-2 px-3 flex items-center justify-between text-white">
                <span className="font-black text-sm text-amber-300">
                  {deal.discountBanner}
                </span>
                <span className="text-[11px] text-stone-300">
                  {deal.locality}
                </span>
              </div>
            </div>

            {/* Bottom Content Info */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {deal.title}
                </p>
                <p className="text-[11px] text-stone-500 line-clamp-1 font-medium mt-0.5">
                  {deal.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-slate-900">₹{deal.price}</span>
                  <span className="text-xs text-stone-400 line-through ml-1.5">
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
                    className="p-2 rounded-xl bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white transition-all cursor-pointer shadow-2xs"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenShop(deal.shopId)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <span>Store</span>
                    <ArrowRight className="w-3 h-3 text-orange-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

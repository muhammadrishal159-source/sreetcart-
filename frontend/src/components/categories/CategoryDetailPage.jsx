import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Store,
  ShoppingBag,
  Sparkles,
  Tag,
  MessageCircle,
  Star,
  ArrowUpDown,
} from 'lucide-react';
import { THEME } from '../../theme/theme';
import { useCart } from '../../context/CartContext';

const CATEGORY_PAGE_CONFIG = {
  'for-you': {
    catId: 'All',
    eyebrow: 'Curated For You • Kozhikode',
    title: 'For You — Top City Picks & Open Storefronts',
    subtitle:
      'Handpicked bestsellers, verified neighborhood storefronts, and trending daily offers curated across Calicut.',
    highlights: ['All Verified Stores', 'Highest City Discounts', 'Direct Store Pricing'],
    hubs: 'SM Street • Mavoor Road • Focus Mall • Palayam',
  },
  fashion: {
    catId: 'Dress',
    eyebrow: 'Apparel & Ethnic Wear',
    title: 'Fashion — Malabar Silks, Kurtis & Menswear',
    subtitle:
      'Discover handloom cotton kurtis, Kasavu traditional sarees, festive bridal wear, and casual linen outfits from Kozhikode’s iconic textile streets.',
    highlights: ['Handloom & Cotton Kurtis', 'Bridal & Festive Silks', 'SM Street Boutiques'],
    hubs: 'SM Street (Mittayi Theruvu) • Palayam',
  },
  'footwear-bags': {
    catId: 'Bags & Shoes',
    eyebrow: 'Footwear & Leather Goods',
    title: 'Footwear & Bags — Sneakers, Formals & Totes',
    subtitle:
      'Browse street-ready sneakers, formal leather shoes, handcrafted ladies totes, and durable travel backpacks at wholesale-friendly city prices.',
    highlights: ['Trending Sneakers', 'Genuine Leather Totes', 'Mavoor Road Deals'],
    hubs: 'Mavoor Road • Opp. New Bus Stand',
  },
  'watches-jewelry': {
    catId: 'Accessories',
    eyebrow: 'Timepieces & Lifestyle',
    title: 'Watches & Jewelry — Minimalist & Classic Accents',
    subtitle:
      'Explore quartz chronographs, smartwatches, fashion jewelry, sunglasses, and refined everyday accessories from top mall & street counters.',
    highlights: ['Water-Resistant Watches', 'Sunglasses & Jewelry', 'Focus Mall Counters'],
    hubs: 'Focus Mall • Rajaji Road • RP Mall',
  },
  'sports-fitness': {
    catId: 'Sports',
    eyebrow: 'Athletics & Outdoor',
    title: 'Sports & Fitness — Turf Studs, Kits & Gear',
    subtitle:
      'Gear up with lightweight football cleats, Sevens match balls, graphite badminton racquets, team jerseys, and everyday fitness essentials.',
    highlights: ['Turf & Grass Cleats', 'Badminton & Cricket', 'Stadium Junction Hubs'],
    hubs: 'Stadium Junction • Palayam',
  },
  electronics: {
    catId: 'Electronics',
    eyebrow: 'Audio & Smart Tech',
    title: 'Electronics — Wireless Audio, Power & Tech',
    subtitle:
      'Compare store-warranted true wireless earbuds, fast-charging power banks, headphones, and mobile peripherals across Calicut’s tech hubs.',
    highlights: ['Store Warranty Included', 'TWS Earbuds & Audio', 'Mavoor Road Tech Hubs'],
    hubs: 'Mavoor Road • HiLITE Mall Area',
  },
};

export function CategoryDetailPage({
  slug,
  shops = [],
  products = [],
  onBack,
  onOpenShop,
  onOpenProduct,
}) {
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('discount_desc');

  const config = CATEGORY_PAGE_CONFIG[slug] || CATEGORY_PAGE_CONFIG['for-you'];
  const catTheme =
    THEME.categories.find(
      (c) => c.id.toLowerCase() === config.catId.toLowerCase(),
    ) || THEME.categories[0];

  const matchingShops =
    config.catId === 'All'
      ? shops
      : shops.filter(
          (s) => (s.category || '').toLowerCase() === config.catId.toLowerCase(),
        );

  const matchingProducts =
    config.catId === 'All'
      ? products
      : products.filter(
          (p) => (p.category || '').toLowerCase() === config.catId.toLowerCase(),
        );

  const sortedProducts = [...matchingProducts].sort((a, b) => {
    if (sortBy === 'discount_desc') {
      return (b.discountPercentage || 0) - (a.discountPercentage || 0);
    }
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  const getShop = (shopId) =>
    shops.find((s) => s._id === shopId || s.id === shopId || s.slug === shopId) || {
      name: 'Local Kozhikode Store',
      area: 'Kozhikode',
      whatsapp: '+919847012345',
    };

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20">
      {/* Category Hero Header using exact existing category image */}
      <div className="relative overflow-hidden bg-[#1B1C19] text-white border-b border-[#2E2F2A]">
        {catTheme?.img && (
          <img
            src={catTheme.img}
            alt={catTheme.label}
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1B1C19]/95 via-[#1B1C19]/82 to-[#1B1C19]/60"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#FFFDF7] bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 mb-6 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start sm:items-center gap-5">
              {catTheme?.img && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-[#FACC15] shadow-[0_12px_30px_-6px_rgba(250,204,21,0.45)] shrink-0 bg-white">
                  <img
                    src={catTheme.img}
                    alt={catTheme.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#FACC15]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{config.eyebrow}</span>
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {config.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#E5E0D3] leading-relaxed">
                  {config.subtitle}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-4 shrink-0 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#FACC15] font-bold">
                <MapPin className="w-4 h-4" />
                <span>{config.hubs}</span>
              </div>
              <p className="text-[#E5E0D3]">
                <strong className="text-white">{matchingProducts.length}</strong> active offers across{' '}
                <strong className="text-white">{matchingShops.length}</strong> stores
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {config.highlights.map((h) => (
              <span
                key={h}
                className="px-3.5 py-1 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/35 text-[#FACC15] text-[11px] font-bold"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1C19] tracking-tight flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#CA8A04]" />
              <span>{catTheme?.label} Offers ({sortedProducts.length})</span>
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#817660]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-white border border-[#EAE4D3] rounded-full px-3.5 py-2 text-[#1B1C19] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30 cursor-pointer"
            >
              <option value="discount_desc">Highest Discount</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EAE4D3] p-12 text-center">
            <p className="text-sm text-[#5C5647]">
              No active products listed in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => {
              const productId = product._id || product.id;
              const shop = getShop(product.shopId);

              return (
                <div
                  key={productId}
                  className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-[0_2px_14px_rgba(27,28,25,0.04)] hover:shadow-[0_18px_38px_-10px_rgba(234,179,8,0.22)] hover:border-[#FACC15] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div
                    onClick={() => onOpenProduct && onOpenProduct(productId)}
                    className="relative aspect-[4/3] overflow-hidden bg-[#F5F3EE] cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-3 left-3 bg-[#FACC15] text-[#1B1C19] font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-sm">
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenShop &&
                          onOpenShop(shop._id || shop.id || shop.slug)
                        }
                        className="flex items-center space-x-1.5 text-xs text-[#5C5647] hover:text-[#1B1C19] cursor-pointer mb-1.5"
                      >
                        <Store className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                        <span className="font-bold text-[#1B1C19] truncate">
                          {shop.name}
                        </span>
                      </button>

                      <h3
                        onClick={() => onOpenProduct && onOpenProduct(productId)}
                        className="font-bold text-[#1B1C19] text-sm line-clamp-2 leading-snug group-hover:text-[#A16207] transition-colors cursor-pointer"
                      >
                        {product.title}
                      </h3>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#F5F3EE]">
                      <div className="flex items-baseline space-x-2 mb-3">
                        <span className="text-lg font-extrabold text-[#1B1C19]">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-[#817660] line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(product, shop)}
                          className="w-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs font-bold py-2.5 px-3 rounded-full transition-all flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <a
                          href={`https://wa.me/${(shop.whatsapp || '919847012345').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20saw%20${encodeURIComponent(product.title)}%20on%20StreetCart!`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#1B1C19] hover:bg-[#2E2F2A] text-white text-xs font-semibold py-2.5 px-3 rounded-full transition-all flex items-center justify-center space-x-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#FACC15]" />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Participating Stores in this Category */}
        {matchingShops.length > 0 && (
          <div className="mt-14 pt-10 border-t border-[#EAE4D3]">
            <h2 className="text-xl font-bold text-[#1B1C19] tracking-tight mb-6 flex items-center gap-2">
              <Store className="w-5 h-5 text-[#CA8A04]" />
              <span>Verified {catTheme?.label} Stores ({matchingShops.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingShops.map((shop) => (
                <div
                  key={shop._id || shop.id}
                  onClick={() =>
                    onOpenShop && onOpenShop(shop._id || shop.id || shop.slug)
                  }
                  className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#FACC15] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="h-32 relative overflow-hidden bg-[#F5F3EE]">
                    <img
                      src={shop.bannerUrl}
                      alt={shop.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C19]/70 to-transparent" />
                    <div className="absolute bottom-2.5 right-3 text-white text-xs font-semibold flex items-center space-x-1 bg-[#1B1C19]/70 px-2.5 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-[#FACC15] text-[#FACC15]" />
                      <span>{shop.rating || 4.8}</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h3 className="font-bold text-base text-[#1B1C19] group-hover:text-[#A16207]">
                      {shop.name}
                    </h3>
                    <p className="text-xs text-[#5C5647] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#CA8A04]" />
                      <span>{shop.area || shop.address}</span>
                    </p>
                  </div>
                  <div className="px-5 py-3 bg-[#FFFDF7] border-t border-[#F5F3EE] flex items-center justify-between text-xs font-bold text-[#1B1C19]">
                    <span>Visit Storefront</span>
                    <ArrowRight className="w-4 h-4 text-[#CA8A04]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

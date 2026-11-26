import React, { useState } from 'react';
import {
  ArrowLeft,
  Store,
  MapPin,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Plus,
  Minus,
  Tag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Curated Deal entries from CuratedDealsGrid so clicking those images also resolves cleanly
const CURATED_DEAL_FALLBACKS = [
  {
    _id: 'deal_shoes',
    id: 'deal_shoes',
    shopId: 'shop_calicut_footwear',
    title: 'Performance Sneakers & Loafers',
    category: 'Bags & Shoes',
    description: 'Made for motion & street comfort — available at Metro Footwear & Leather Bags, Mavoor Road.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    price: 1199,
    originalPrice: 2499,
    discountPercentage: 52,
    offerTag: 'Min. 50% Off',
  },
  {
    _id: 'deal_dress',
    id: 'deal_dress',
    shopId: 'shop_sm_street_dress',
    title: 'Handloom Cotton & Silk Kurtis',
    category: 'Dress',
    description: 'Pure Malabar festive elegance directly from SM Street Heritage Silks.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    price: 899,
    originalPrice: 1499,
    discountPercentage: 40,
    offerTag: 'Up to 60% Off',
  },
  {
    _id: 'deal_sports',
    id: 'deal_sports',
    shopId: 'shop_champions_sports',
    title: 'Pro Football Studs & Team Kits',
    category: 'Sports',
    description: 'Engineered for turf & grass traction — Calicut Champions Sports Arena.',
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=80',
    price: 1499,
    originalPrice: 2899,
    discountPercentage: 48,
    offerTag: 'Up to 55% Off',
  },
];

export function ProductDetailPage({
  productId,
  products = [],
  shops = [],
  onBack,
  onOpenShop,
  onOpenProduct,
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product =
    products.find((p) => (p._id || p.id) === productId) ||
    CURATED_DEAL_FALLBACKS.find((d) => d.id === productId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <p className="text-[#5C5647] text-sm">Product details not found.</p>
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full bg-[#FACC15] text-[#1B1C19] text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const shop =
    shops.find(
      (s) =>
        s._id === product.shopId ||
        s.id === product.shopId ||
        s.slug === product.shopId,
    ) || {
      name: 'Local Kozhikode Store',
      area: 'Kozhikode',
      whatsapp: '+919847012345',
    };

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  const relatedProducts = products
    .filter(
      (p) =>
        (p._id || p.id) !== (product._id || product.id) &&
        p.category === product.category,
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#1B1C19] bg-white hover:bg-[#FEF9C3]/60 px-4 py-2 rounded-full border border-[#EAE4D3] shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#CA8A04]" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      {/* Main Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="bg-white rounded-3xl border border-[#EAE4D3] p-5 sm:p-8 lg:p-10 shadow-[0_18px_45px_-14px_rgba(27,28,25,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Product Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F5F3EE] border border-[#EAE4D3]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-[#FACC15] text-[#1B1C19] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{product.discountPercentage}% OFF</span>
                </span>
              )}
              {product.offerTag && (
                <span className="absolute bottom-4 left-4 bg-[#1B1C19]/85 backdrop-blur-md text-[#FACC15] font-bold text-xs px-3.5 py-1.5 rounded-full">
                  {product.offerTag}
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FEF9C3] border border-[#FDE047]/70 text-[#854D0E] text-[11px] font-bold uppercase tracking-wider">
                  {product.category || 'City Deal'}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  In Stock at Store
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1B1C19] tracking-tight leading-tight">
                {product.title}
              </h1>

              {product.description && (
                <p className="text-sm text-[#5C5647] leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Pricing Block */}
            <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#EAE4D3] space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#1B1C19]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#817660] line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-xs font-bold text-emerald-700">
                  You save ₹{savings.toLocaleString()} on this local store offer
                </p>
              )}
            </div>

            {/* Store Card Link */}
            <div
              onClick={() =>
                onOpenShop &&
                onOpenShop(shop._id || shop.id || shop.slug || product.shopId)
              }
              className="p-4 rounded-2xl bg-[#F6F3EA] hover:bg-[#FEF9C3]/60 border border-[#EAE4D3] hover:border-[#FACC15] transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE4D3] flex items-center justify-center text-[#CA8A04]">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B1C19]">{shop.name}</p>
                  <p className="text-[11px] text-[#5C5647] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#CA8A04]" />
                    <span>{shop.area || shop.address || 'Kozhikode'}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#854D0E]">Visit Store →</span>
            </div>

            {/* Quantity & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C5647]">
                  Quantity
                </span>
                <div className="flex items-center space-x-2 bg-[#F6F3EA] rounded-full p-1 border border-[#EAE4D3]">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1B1C19] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-extrabold text-[#1B1C19] w-8 text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1B1C19] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => addToCart(product, shop, qty)}
                  className="py-4 px-6 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_14px_34px_-6px_rgba(234,179,8,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <a
                  href={`https://wa.me/${(shop.whatsapp || '919847012345').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20am%20interested%20in%20${encodeURIComponent(product.title)}%20(₹${product.price})%20on%20StreetCart!`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-4 px-6 rounded-full bg-[#1B1C19] hover:bg-[#2E2F2A] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#FACC15]" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#5C5647] pt-2">
                <ShieldCheck className="w-4 h-4 text-[#CA8A04]" />
                <span>Verified Kozhikode store pricing • Store Pickup &amp; City Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Category Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-[#1B1C19] tracking-tight mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#CA8A04]" />
              <span>More in {product.category}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => {
                const relId = rel._id || rel.id;
                return (
                  <div
                    key={relId}
                    onClick={() => onOpenProduct && onOpenProduct(relId)}
                    className="bg-white rounded-3xl border border-[#EAE4D3] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#FACC15] transition-all cursor-pointer group"
                  >
                    <div className="aspect-[4/3] bg-[#F5F3EE] overflow-hidden">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-bold text-sm text-[#1B1C19] line-clamp-1 group-hover:text-[#A16207]">
                        {rel.title}
                      </h3>
                      <p className="font-extrabold text-base text-[#1B1C19]">
                        ₹{rel.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Sparkles,
  Tag,
  Share2,
  Clock,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ShopPage = ({ shop, products, onBack }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copied, setCopied] = useState(false);

  if (!shop) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <p className="text-slate-500 mb-4">Shop details not found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  // Filter only this shop's products
  const shopProducts = products.filter(
    (p) => p.shopId === (shop._id || shop.id || shop.slug),
  );

  const displayedProducts =
    selectedCategory === 'All'
      ? shopProducts
      : shopProducts.filter((p) => p.category === selectedCategory);

  const brandColor = shop.brandColor || '#FF5A36';

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Top back bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Back to Kozhikode Stores</span>
        </button>
      </div>

      {/* Shop Profile Banner & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Cover Banner */}
          <div className="h-48 sm:h-64 lg:h-72 w-full relative overflow-hidden bg-slate-800">
            <img
              src={shop.bannerUrl}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Share Shop'}</span>
              </button>
            </div>
          </div>

          {/* Profile details block */}
          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
              <div className="flex items-end space-x-4">
                {/* Logo with Brand Color Accent */}
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 bg-white shadow-xl overflow-hidden shrink-0 relative z-10"
                  style={{ borderColor: brandColor }}
                >
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
                      style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
                    >
                      {shop.category}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                      Open in {shop.area}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                    {shop.name}
                  </h1>
                </div>
              </div>

              {/* Direct WhatsApp / Phone Contact Action */}
              <div className="flex items-center space-x-3 pt-2 md:pt-0">
                {shop.whatsapp && (
                  <a
                    href={`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20found%20your%20store%20on%20StreetCart%20Kozhikode!`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Store</span>
                  </a>
                )}
                {shop.phone && (
                  <a
                    href={`tel:${shop.phone}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors border border-slate-200"
                  >
                    <Phone className="w-4 h-4 text-slate-600" />
                    <span>Call</span>
                  </a>
                )}
              </div>
            </div>

            {/* Description & Address Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  About this Store
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {shop.description}
                </p>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-start space-x-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Store Address:</span>
                    <span className="text-slate-500">{shop.address}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 pt-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span>
                    Rating: <strong className="text-slate-800">{shop.rating || 4.8} / 5.0</strong> (Verified Calicut Shoppers)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop's Products & Exclusive Offers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
              <Tag className="w-5 h-5 mr-2" style={{ color: brandColor }} />
              Available Products & Current Offers ({shopProducts.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Active products and promotional deals from this store
            </p>
          </div>
        </div>

        {shopProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">
              This shop has not uploaded any products yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shopProducts.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md">
                      {product.discountPercentage}% OFF
                    </div>
                  )}
                  {product.offerTag && (
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 text-orange-300 font-bold text-[11px] px-2 py-0.5 rounded shadow">
                      {product.offerTag}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                      {product.title}
                    </h4>
                    {product.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <div className="self-start sm:self-auto">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-base font-black text-slate-900">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => addToCart(product, shop)}
                        className="flex-1 sm:flex-none bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center justify-center space-x-1 shadow-2xs transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <a
                        href={`https://wa.me/${(shop.whatsapp || '919847012345').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20want%20to%20buy%20${encodeURIComponent(product.title)}%20(₹${product.price})%20seen%20on%20StreetCart!`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center justify-center space-x-1 transition-colors"
                        title="Inquire / Order on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

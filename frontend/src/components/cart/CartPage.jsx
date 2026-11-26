import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Store,
  Zap,
  Truck,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { THEME } from '../../theme/theme';

export function CartPage({ onContinueShopping, onOpenShop }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    deliveryMode,
    setDeliveryMode,
    subtotal,
    deliveryFee,
    totalSavings,
    total,
    itemCount,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const activeDelivery =
    (THEME.deliveryModes || []).find((m) => m.id === deliveryMode) ||
    THEME.deliveryModes?.[0];

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const firstShopPhone = cartItems[0]?.shop?.whatsapp || '919847012345';
    let orderText = `🛍️ *NEW STREETCART ORDER*\n\n`;
    orderText += `*Customer:* ${customerName || 'Valued Shopper'}\n`;
    orderText += `*Phone:* ${customerPhone || 'Not provided'}\n`;
    orderText += `*Delivery Mode:* ${activeDelivery?.title} (${activeDelivery?.tag})\n`;
    if (deliveryMode !== 'pickup' && customerAddress) {
      orderText += `*Address:* ${customerAddress}\n`;
    }
    orderText += `\n*Items Ordered:*\n`;
    cartItems.forEach((item, idx) => {
      orderText += `${idx + 1}. ${item.product.title} x${item.quantity} - ₹${item.product.price * item.quantity} (${item.shop.name})\n`;
    });
    orderText += `\n*Subtotal:* ₹${subtotal}\n`;
    orderText += `*Delivery Fee:* ₹${deliveryFee}\n`;
    orderText += `*Total Amount:* ₹${total}\n\n`;
    orderText += `Placed via StreetCart Nadapuram Marketplace`;

    setOrderSuccess(true);

    const targetUrl = `https://wa.me/${firstShopPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(orderText)}`;
    window.open(targetUrl, '_blank');

    setTimeout(() => {
      clearCart();
      setOrderSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20">
      {/* Premium Cart Header */}
      <div className="relative overflow-hidden bg-white border-b border-[#EAE4D3]">
        <img
          src="/images/bg-cart-checkout.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-right opacity-25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFDF7]/95 via-[#FFFDF7]/85 to-[#FFFDF7]/60"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FACC15] text-[#1B1C19] flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(234,179,8,0.45)]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B1C19] tracking-tight">
                  Your Shopping Cart
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-[#FEF9C3] border border-[#FDE047] text-[#854D0E] text-xs font-bold">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5647] mt-1">
                Review your selected items from Nadapuram partner stores before dispatch.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinueShopping}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FEF9C3]/60 border border-[#EAE4D3] hover:border-[#FACC15] text-[#1B1C19] text-xs font-bold transition-all self-start sm:self-auto cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#CA8A04]" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {orderSuccess ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#EAE4D3] p-10 sm:p-14 text-center shadow-[0_20px_50px_-12px_rgba(27,28,25,0.08)] space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1B1C19] tracking-tight">
              Order Dispatched!
            </h2>
            <p className="text-sm text-[#5C5647] leading-relaxed">
              Your order details have been forwarded to the merchant on WhatsApp. Your local delivery or pickup is being prepared.
            </p>
            <button
              type="button"
              onClick={onContinueShopping}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs font-extrabold uppercase tracking-wider shadow-[0_12px_28px_-6px_rgba(234,179,8,0.45)] transition-all cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="relative overflow-hidden max-w-2xl mx-auto bg-white rounded-3xl border border-[#EAE4D3] p-10 sm:p-16 text-center shadow-[0_18px_45px_-14px_rgba(27,28,25,0.08)]">
            <img
              src="/images/bg-cart-checkout.jpg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/92 to-white"
            />
            <div className="relative z-10 space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-[#FEF9C3] border border-[#FDE047] text-[#854D0E] mx-auto flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-[#1B1C19] tracking-tight">
                  Your StreetCart is empty
                </h2>
                <p className="text-sm text-[#5C5647] max-w-md mx-auto leading-relaxed">
                  Explore verified stores across SM Street, Mavoor Road, Focus Mall, and Palayam to add your favorite city offers.
                </p>
              </div>
              <button
                type="button"
                onClick={onContinueShopping}
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-[0_14px_34px_-6px_rgba(234,179,8,0.5)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleCheckout}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* LEFT COLUMN: Cart Items + Delivery + Recipient */}
            <div className="lg:col-span-8 space-y-6">
              {/* Items Header */}
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#5C5647]">
                  Cart Items ({itemCount})
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-semibold text-[#817660] hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear all items
                </button>
              </div>

              {/* Cart Product Cards */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const productId = item.product._id || item.product.id;
                  const itemSubtotal = item.product.price * item.quantity;
                  const variantText =
                    item.product.selectedSize ||
                    item.product.variant ||
                    item.product.category;

                  return (
                    <div
                      key={productId}
                      className="bg-white rounded-3xl border border-[#EAE4D3] p-4 sm:p-5 shadow-[0_2px_14px_rgba(27,28,25,0.03)] hover:shadow-[0_12px_30px_-10px_rgba(234,179,8,0.2)] hover:border-[#FACC15] transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-28 h-44 sm:h-28 rounded-2xl overflow-hidden bg-[#F5F3EE] shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onOpenShop &&
                              onOpenShop(
                                item.shop?._id ||
                                  item.shop?.id ||
                                  item.shop?.slug ||
                                  item.product.shopId,
                              )
                            }
                            className="inline-flex items-center space-x-1 text-[11px] font-bold uppercase tracking-wider text-[#854D0E] bg-[#FEF9C3] px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-[#FEF08A]"
                          >
                            <Store className="w-3 h-3" />
                            <span>{item.shop?.name || 'Local Store'}</span>
                          </button>

                          {variantText && (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#5C5647] bg-[#F6F3EA] px-2.5 py-0.5 rounded-full">
                              <Tag className="w-3 h-3 text-[#CA8A04]" />
                              <span>{variantText}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-[#1B1C19] leading-snug">
                          {item.product.title}
                        </h3>

                        <div className="flex items-baseline space-x-2">
                          <span className="text-sm font-bold text-[#1B1C19]">
                            ₹{item.product.price.toLocaleString()} each
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-xs text-[#817660] line-through">
                              ₹{item.product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity, Item Subtotal & Remove */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F5F3EE] shrink-0">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#817660] block">
                            Item Subtotal
                          </span>
                          <span className="text-lg font-extrabold text-[#1B1C19]">
                            ₹{itemSubtotal.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-1 bg-[#F6F3EA] rounded-full p-1 border border-[#EAE4D3]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(productId, -1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 rounded-full flex items-center justify-center text-[#1B1C19] hover:bg-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-extrabold text-[#1B1C19] w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(productId, 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 rounded-full flex items-center justify-center text-[#1B1C19] hover:bg-white transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Remove Item Button */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(productId)}
                            aria-label="Remove item"
                            title="Remove item"
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#5C5647] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Mode Selection */}
              <div className="bg-white rounded-3xl border border-[#EAE4D3] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#1B1C19] uppercase tracking-wider">
                    Select Delivery Mode
                  </h3>
                  <span className="text-xs text-emerald-700 font-semibold">
                    Nadapuram City
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(THEME.deliveryModes || []).map((mode) => {
                    const isSelected = deliveryMode === mode.id;
                    const Icon =
                      mode.id === 'pickup'
                        ? Store
                        : mode.id === 'instant'
                        ? Zap
                        : Truck;

                    return (
                      <div
                        key={mode.id}
                        onClick={() => setDeliveryMode(mode.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#FFFDF7] border-[#EAB308] shadow-sm ring-2 ring-[#FACC15]/30'
                            : 'bg-[#FAF8F2] border-[#EAE4D3] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#FACC15] text-[#1B1C19]'
                                : 'bg-white text-[#5C5647] border border-[#EAE4D3]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-extrabold text-xs text-[#1B1C19]">
                            {mode.price === 0 ? 'FREE' : `₹${mode.price}`}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h4 className="font-bold text-xs text-[#1B1C19]">
                              {mode.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-[#5C5647] mt-0.5">
                            {mode.eta} • {mode.tag}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recipient Information */}
              <div className="bg-white rounded-3xl border border-[#EAE4D3] p-5 sm:p-6 space-y-4">
                <h3 className="text-xs font-bold text-[#1B1C19] uppercase tracking-wider">
                  Recipient Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF7] border border-[#EAE4D3] rounded-xl text-[#1B1C19] placeholder-[#817660] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30 focus:border-[#EAB308]"
                  />
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="WhatsApp Phone Number *"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF7] border border-[#EAE4D3] rounded-xl text-[#1B1C19] placeholder-[#817660] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30 focus:border-[#EAB308]"
                  />
                </div>
                {deliveryMode !== 'pickup' && (
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Street Address in Nadapuram (e.g. Near Focus Mall) *"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FFFDF7] border border-[#EAE4D3] rounded-xl text-[#1B1C19] placeholder-[#817660] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30 focus:border-[#EAB308]"
                  />
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl border border-[#EAE4D3] p-6 shadow-[0_18px_45px_-14px_rgba(27,28,25,0.08)] space-y-5">
                <div className="pb-4 border-b border-[#F5F3EE] flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-[#1B1C19] tracking-tight">
                    Order Summary
                  </h2>
                  <span className="text-xs font-semibold text-[#5C5647]">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-[#5C5647]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#1B1C19]">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery ({activeDelivery?.title})</span>
                    <span className="font-bold text-[#1B1C19]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Offer Discount</span>
                      <span>-₹{totalSavings.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#EAE4D3] flex justify-between items-baseline">
                    <span className="font-extrabold text-[#1B1C19] text-base">
                      Total Amount
                    </span>
                    <span className="font-extrabold text-2xl text-[#1B1C19]">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] font-extrabold text-sm uppercase tracking-wider shadow-[0_14px_34px_-6px_rgba(234,179,8,0.5)] hover:shadow-[0_18px_40px_-4px_rgba(234,179,8,0.65)] hover:-translate-y-0.5 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onContinueShopping}
                    className="w-full py-3 rounded-full bg-[#F6F3EA] hover:bg-[#EAE4D3]/60 text-[#1B1C19] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="pt-3 border-t border-[#F5F3EE] flex items-center justify-center space-x-1.5 text-[11px] text-[#5C5647]">
                  <ShieldCheck className="w-4 h-4 text-[#CA8A04]" />
                  <span>Direct merchant fulfillment with verified store receipts</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

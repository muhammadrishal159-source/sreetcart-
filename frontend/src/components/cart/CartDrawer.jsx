import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Store,
  Zap,
  Truck,
  CheckCircle2,
  Sparkles,
  Phone,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { THEME } from '../../theme/theme';

export const CartDrawer = ({ onOpenCartPage }) => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
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

  if (!isCartOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Build structured order receipt
    const activeDelivery = THEME.deliveryModes.find((m) => m.id === deliveryMode);
    const shopList = Array.from(new Set(cartItems.map((i) => i?.shop?.name || 'Local Store'))).join(', ');
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
    orderText += `Placed via StreetCart Kozhikode Marketplace`;

    setOrderSuccess(true);

    // Open WhatsApp after brief delay
    const targetUrl = `https://wa.me/${firstShopPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(orderText)}`;
    window.open(targetUrl, '_blank');

    setTimeout(() => {
      clearCart();
      setOrderSuccess(false);
      closeCart();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF7] border-l border-[#EAE4D3] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="relative overflow-hidden p-5 sm:p-6 bg-white border-b border-[#EAE4D3] flex items-center justify-between">
            <img
              src="/images/bg-cart-checkout.jpg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover object-right opacity-30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60"
            />
            <div className="relative z-10 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF9C3] text-[#854D0E] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#1B1C19] text-lg tracking-tight">
                  Your StreetCart
                </h2>
                <p className="text-xs text-[#5C5647]">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} from Kozhikode stores
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="relative z-10 p-2 rounded-xl text-stone-400 hover:text-[#1B1C19] hover:bg-white/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {orderSuccess ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-black text-[#1B1C19] text-xl tracking-tight">
                  Order Dispatched!
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  Your order details have been forwarded to the merchant on WhatsApp. Your delivery is being scheduled!
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1B1C19] text-base">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#5C5647] max-w-xs mx-auto">
                    Explore stores across SM Street, Mavoor Road & Focus Mall to discover active city offers.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl bg-[#1B1C19] text-white text-xs font-bold hover:bg-[#FACC15] hover:text-[#1B1C19] transition-colors cursor-pointer"
                >
                  Explore Best Offers
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-[#5C5647] font-semibold pb-1">
                    <span>Order Items</span>
                    <button
                      onClick={clearCart}
                      className="text-stone-400 hover:text-red-600 text-[11px] transition-colors cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.product._id || item.product.id}
                      className="p-3.5 bg-white rounded-2xl border border-[#EAE4D3] shadow-2xs flex items-center space-x-3.5"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100 aspect-square"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#CA8A04] uppercase tracking-wide">
                          {item.shop.name}
                        </span>
                        <h4 className="font-bold text-[#1B1C19] text-xs truncate">
                          {item.product.title}
                        </h4>
                        <div className="flex items-baseline space-x-2 mt-0.5">
                          <span className="text-sm font-extrabold text-[#1B1C19]">
                            ₹{item.product.price}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-[11px] text-stone-400 line-through">
                              ₹{item.product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Adjuster */}
                      <div className="flex flex-col items-end space-y-1.5 shrink-0">
                        <div className="flex items-center space-x-1 bg-[#F6F3EA] rounded-full p-0.5 border border-[#EAE4D3]">
                          <button
                            onClick={() =>
                              updateQuantity(item.product._id || item.product.id, -1)
                            }
                            aria-label="Decrease quantity"
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#1B1C19] hover:bg-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold text-[#1B1C19] w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product._id || item.product.id, 1)
                            }
                            aria-label="Increase quantity"
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#1B1C19] hover:bg-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.product._id || item.product.id)
                          }
                          className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Mode Selection */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1B1C19] uppercase tracking-wider">
                      Select Delivery Mode
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Kozhikode City
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
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
                          className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-white border-[#EAB308] shadow-xs ring-2 ring-[#FACC15]/30'
                              : 'bg-white/70 border-[#EAE4D3] hover:bg-white text-[#5C5647]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#FACC15] text-[#1B1C19]'
                                  : 'bg-[#F6F3EA] text-[#5C5647]'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <h4 className="font-extrabold text-xs text-[#1B1C19]">
                                  {mode.title}
                                </h4>
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                                    mode.price === 0
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-stone-100 text-stone-600'
                                  }`}
                                >
                                  {mode.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#5C5647]">
                                {mode.subtitle} • <span className="font-medium text-stone-700">{mode.eta}</span>
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-black text-xs text-[#1B1C19]">
                              {mode.price === 0 ? 'FREE' : `₹${mode.price}`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="bg-white p-4 rounded-2xl border border-[#EAE4D3] space-y-3">
                  <h4 className="text-xs font-bold text-[#1B1C19] uppercase tracking-wider">
                    Recipient Information
                  </h4>

                  <div>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Full Name *"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-[#EAE4D3] rounded-xl focus:outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="WhatsApp Phone Number *"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-[#EAE4D3] rounded-xl focus:outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  {deliveryMode !== 'pickup' && (
                    <div>
                      <input
                        type="text"
                        required
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Street Address in Kozhikode (e.g. Near Focus Mall) *"
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-[#EAE4D3] rounded-xl focus:outline-none focus:border-[#EAB308]"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && !orderSuccess && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EAE4D3] space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-[#1B1C19]">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery ({THEME.deliveryModes.find((m) => m.id === deliveryMode)?.title})</span>
                  <span className="font-bold text-[#1B1C19]">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Special Offer Savings</span>
                    <span>-₹{totalSavings.toLocaleString()}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                  <span className="font-black text-[#1B1C19] text-sm">Estimated Total</span>
                  <span className="font-black text-xl text-[#1B1C19]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] font-extrabold text-sm shadow-[0_12px_28px_-6px_rgba(234,179,8,0.5)] flex items-center justify-center space-x-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Place Order & Dispatch via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                {onOpenCartPage && (
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      onOpenCartPage();
                    }}
                    className="w-full py-2.5 rounded-full bg-[#F6F3EA] hover:bg-[#EAE4D3]/70 text-[#1B1C19] font-bold text-xs transition-colors cursor-pointer"
                  >
                    View Full Cart Page
                  </button>
                )}
              </div>

              <p className="text-[10px] text-center text-stone-400">
                Direct merchant fulfillment with verified local store receipts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

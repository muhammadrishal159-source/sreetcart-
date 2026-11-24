import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEME } from '../theme/theme';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('streetcart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [deliveryMode, setDeliveryMode] = useState(() => {
    return localStorage.getItem('streetcart_delivery') || 'pickup';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('streetcart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('streetcart_delivery', deliveryMode);
  }, [deliveryMode]);

  const addToCart = (product, shop, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => (item.product._id || item.product.id) === (product._id || product.id),
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          shop: shop || { name: 'Kozhikode Partner Store', area: 'Kozhikode' },
          quantity: qty,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => (item.product._id || item.product.id) !== productId,
      ),
    );
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if ((item.product._id || item.product.id) === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalSavings = cartItems.reduce((sum, item) => {
    const orig = item.product.originalPrice || item.product.price;
    const savePerItem = orig > item.product.price ? orig - item.product.price : 0;
    return sum + savePerItem * item.quantity;
  }, 0);

  const activeDeliveryOption =
    (THEME.deliveryModes || []).find((m) => m.id === deliveryMode) ||
    THEME.deliveryModes?.[0] || { price: 0 };

  const deliveryFee = subtotal > 0 ? (activeDeliveryOption?.price || 0) : 0;
  const total = subtotal + deliveryFee;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        deliveryMode,
        setDeliveryMode,
        subtotal,
        deliveryFee,
        totalSavings,
        total,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

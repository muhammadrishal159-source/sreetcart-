// Centralized Theme Tokens & Constants for StreetCart
// Refined Luxury Marketplace Aesthetics

export const THEME = {
  brand: {
    primary: '#E04F2E',       // Refined Terracotta/Coral Red
    primaryHover: '#C93F1F',
    secondary: '#0F172A',     // Deep Slate Obsidian
    accent: '#D97706',        // Amber Gold for Sponsored & Offers
    canvas: '#FAF9F6',        // Warm Editorial Off-White Canvas
    cardBg: '#FFFFFF',
    border: '#E8E5DF',        // Subtle warm border
    textMain: '#000000',
    textMuted: '#64748B',
  },
  city: {
    name: 'Kozhikode',
    popularHubs: [
      'SM Street (Sweet Street)',
      'Mavoor Road',
      'Palayam Junction',
      'Focus Mall Area',
      'HiLITE Mall Hub',
    ],
    districts: [
      { id: 'all', name: 'All Kozhikode' },
      { id: 'sm-street', name: 'SM Street (Sweet Street)' },
      { id: 'mavoor-rd', name: 'Mavoor Road' },
      { id: 'palayam', name: 'Palayam' },
      { id: 'focus-mall', name: 'Focus Mall' },
      { id: 'hilite', name: 'Hilite Mall Area' },
    ],
  },
  deliveryModes: [
    {
      id: 'pickup',
      title: 'Store Pickup',
      subtitle: 'Self pickup from store in Kozhikode',
      price: 0,
      eta: 'Ready in 2 hours',
      tag: 'FREE',
    },
    {
      id: 'instant',
      title: 'Local Instant Delivery',
      subtitle: 'Doorstep dispatch within Calicut city',
      price: 49,
      eta: 'Under 60 mins',
      tag: 'FASTEST',
    },
    {
      id: 'courier',
      title: 'Standard Courier Delivery',
      subtitle: 'StreetCart courier partner network',
      price: 80,
      eta: '24 - 48 Hours',
      tag: 'STATEWIDE',
    },
  ],
  categories: [
    {
      id: 'All',
      label: 'For You',
      icon: 'Sparkles',
      img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'Dress',
      label: 'Fashion',
      icon: 'Shirt',
      img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'Bags & Shoes',
      label: 'Footwear & Bags',
      icon: 'ShoppingBag',
      img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'Accessories',
      label: 'Watches & Jewelry',
      icon: 'Watch',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'Sports',
      label: 'Sports & Fitness',
      icon: 'Trophy',
      img: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'Electronics',
      label: 'Electronics',
      icon: 'Smartphone',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80',
    },
  ],
};

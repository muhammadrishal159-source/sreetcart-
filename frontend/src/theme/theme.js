// Centralized Theme Tokens & Constants for StreetCart
// Stitch Master Design System: Premium Yellow, White & Warm Cream

export const THEME = {
  brand: {
    primary: '#EAB308',       // Luminous Golden Yellow
    primaryBright: '#FACC15', // Vibrant Sun Yellow
    primaryHover: '#CA8A04',
    secondary: '#1B1C19',     // Deep Charcoal Ink
    accent: '#FEF08A',        // Soft Warm Yellow Highlight
    canvas: '#FFFDF7',        // Warm Editorial Off-White Canvas
    surfaceMuted: '#F6F3EA',  // Soft Cream Container
    cardBg: '#FFFFFF',
    border: '#EAE4D3',        // Subtle warm hairline border
    textMain: '#1B1C19',
    textMuted: '#5C5647',
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
      img: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'Electronics',
      label: 'Electronics',
      icon: 'Smartphone',
      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80',
    },
  ],
};

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CategoryIconStrip } from './components/home/CategoryIconStrip';
import { FlipkartBannerCarousel } from './components/home/FlipkartBannerCarousel';
import { CuratedDealsGrid } from './components/home/CuratedDealsGrid';
import { OfferComparisonView } from './components/home/OfferComparisonView';
import { ShopDirectory } from './components/home/ShopDirectory';
import { ShopPage } from './components/shop/ShopPage';
import { ShopsPage } from './components/shops/ShopsPage';
import { CategoriesPage } from './components/categories/CategoriesPage';
import { ShopOwnerDashboard } from './components/dashboard/ShopOwnerDashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { api } from './services/api';

function MainApp() {
  const { user, isShopOwner, logout } = useAuth();

  // Navigation State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shops' | 'categories' | 'shop' | 'dashboard' | 'admin'
  const [activeShopId, setActiveShopId] = useState(null);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArea, setSelectedArea] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState('customer');

  // Data State
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Marketplace Data
  useEffect(() => {
    fetchMarketplaceData();
  }, [selectedCategory, searchQuery]);

  const fetchMarketplaceData = async () => {
    setLoading(true);
    const [fetchedShops, fetchedProducts] = await Promise.all([
      api.getShops({ category: selectedCategory, search: searchQuery }),
      api.getProducts({ category: selectedCategory, search: searchQuery }),
    ]);

    setShops(fetchedShops || []);
    setProducts(fetchedProducts || []);
    setLoading(false);
  };

  const handleOpenShop = (shopId) => {
    setActiveShopId(shopId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (role = 'customer') => {
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Shop Update Handler (Toggle isFeatured / paid ad)
  const handleUpdateShop = async (updatedShop) => {
    const id = updatedShop._id || updatedShop.id;
    setShops((prev) =>
      prev.map((s) => ((s._id || s.id) === id ? updatedShop : s)),
    );
    await api.updateShop(id, updatedShop);
  };

  // Filter products by locality if selected
  const filteredProducts = products.filter((p) => {
    if (!selectedArea || selectedArea === 'all') return true;
    const shop = shops.find((s) => (s._id || s.id) === p.shopId);
    if (!shop) return true;
    const areaId = selectedArea.toLowerCase().replace(/[^a-z0-9]/g, '');
    const shopArea = (shop.area || shop.address || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return shopArea.includes(areaId) || areaId.includes(shopArea);
  });

  // Filter shops by locality
  const filteredShops = shops.filter((s) => {
    if (!selectedArea || selectedArea === 'all') return true;
    const areaId = selectedArea.toLowerCase().replace(/[^a-z0-9]/g, '');
    const shopArea = (s.area || s.address || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return shopArea.includes(areaId) || areaId.includes(shopArea);
  });

  const currentShop = shops.find(
    (s) =>
      s._id === activeShopId ||
      s.id === activeShopId ||
      s.slug === activeShopId,
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0F172A]">
      {/* Global Flipkart-Style Premium Navbar */}
      <Navbar
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        selectedArea={selectedArea}
        onSelectArea={setSelectedArea}
      />

      {/* Main Content Areas based on currentView */}
      <main className="flex-1">
        {/* VIEW 1: HOME (Flipkart Inspired Premium Layout) */}
        {currentView === 'home' && (
          <>
            {/* 1. Horizontal Category Icon Strip & Locality Hubs */}
            <CategoryIconStrip
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedArea={selectedArea}
              onSelectArea={setSelectedArea}
            />

            {/* 2. Hero Promotional Ad Banners (JBL / Samsung / Intel style 3-card carousel) */}
            <FlipkartBannerCarousel
              shops={shops}
              products={products}
              onOpenShop={handleOpenShop}
            />

            {/* 3. Curated Spotlight Deals Grid (Campus / Pond's / Parachute style cards) */}
            <CuratedDealsGrid
              products={filteredProducts}
              shops={shops}
              onOpenShop={handleOpenShop}
            />

            {/* 4. Side-by-Side Offer Comparison View with Add-to-Cart */}
            <OfferComparisonView
              products={filteredProducts}
              shops={shops}
              onOpenShop={handleOpenShop}
              selectedCategory={selectedCategory}
            />

            {/* 5. City Storefront Directory */}
            <ShopDirectory
              shops={filteredShops}
              onOpenShop={handleOpenShop}
              onSelectCategory={setSelectedCategory}
            />
          </>
        )}

        {/* VIEW 2: SHOPS (Registered Stores List) */}
        {currentView === 'shops' && (
          <ShopsPage
            shops={shops}
            products={products}
            onOpenShop={handleOpenShop}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {/* VIEW 3: CATEGORIES */}
        {currentView === 'categories' && (
          <CategoriesPage
            shops={shops}
            products={products}
            onSelectCategoryAndGo={(catId) => {
              setSelectedCategory(catId);
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenShop={handleOpenShop}
          />
        )}

        {/* VIEW 4: INDIVIDUAL SHOP PAGE */}
        {currentView === 'shop' && (
          <ShopPage
            shop={currentShop}
            products={products}
            onBack={() => {
              setCurrentView('shops');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: SHOP OWNER DASHBOARD */}
        {currentView === 'dashboard' && (
          <ShopOwnerDashboard
            user={user}
            allShops={shops}
            onOpenShop={(id) => handleOpenShop(id)}
            onRefreshShops={fetchMarketplaceData}
          />
        )}

        {/* VIEW 6: ADMIN PANEL */}
        {currentView === 'admin' && (
          <AdminPanel
            shops={shops}
            onUpdateShop={handleUpdateShop}
            onOpenShop={handleOpenShop}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenAuth={handleOpenAuth}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Cart Drawer with 3 Delivery Modes */}
      <CartDrawer />

      {/* Auth Modal for Customer Login & Shop Owner Login */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalRole}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}

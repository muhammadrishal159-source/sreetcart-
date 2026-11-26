import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CategoryIconStrip } from './components/home/CategoryIconStrip';
import { PremiumHomeHero } from './components/home/PremiumHomeHero';
import { FlipkartBannerCarousel } from './components/home/FlipkartBannerCarousel';
import { CuratedDealsGrid } from './components/home/CuratedDealsGrid';
import { OfferComparisonView } from './components/home/OfferComparisonView';
import { ShopDirectory } from './components/home/ShopDirectory';
import { ShopPage } from './components/shop/ShopPage';
import { ShopsPage } from './components/shops/ShopsPage';
import { CategoriesPage } from './components/categories/CategoriesPage';
import { CategoryDetailPage } from './components/categories/CategoryDetailPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { ShopOwnerDashboard } from './components/dashboard/ShopOwnerDashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartPage } from './components/cart/CartPage';
import { AuthModal } from './components/auth/AuthModal';
import { api } from './services/api';

const CATEGORY_TO_SLUG = {
  All: 'for-you',
  Dress: 'fashion',
  'Bags & Shoes': 'footwear-bags',
  Accessories: 'watches-jewelry',
  Sports: 'sports-fitness',
  Electronics: 'electronics',
};

function ShopRouteView({ shops, products, onBack }) {
  const { shopId } = useParams();
  const currentShop = shops.find(
    (s) => s._id === shopId || s.id === shopId || s.slug === shopId,
  );
  return <ShopPage shop={currentShop} products={products} onBack={onBack} />;
}

function CategoryDetailRouteView({
  shops,
  products,
  onBack,
  onOpenShop,
  onOpenProduct,
}) {
  const { slug } = useParams();
  return (
    <CategoryDetailPage
      slug={slug}
      shops={shops}
      products={products}
      onBack={onBack}
      onOpenShop={onOpenShop}
      onOpenProduct={onOpenProduct}
    />
  );
}

function ProductDetailRouteView({
  products,
  shops,
  onBack,
  onOpenShop,
  onOpenProduct,
}) {
  const { productId } = useParams();
  return (
    <ProductDetailPage
      productId={productId}
      products={products}
      shops={shops}
      onBack={onBack}
      onOpenShop={onOpenShop}
      onOpenProduct={onOpenProduct}
    />
  );
}

function MainApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    fetchMarketplaceData();
  }, [selectedCategory, searchQuery]);

  const fetchMarketplaceData = async () => {
    const [fetchedShops, fetchedProducts] = await Promise.all([
      api.getShops({ category: selectedCategory, search: searchQuery }),
      api.getProducts({ category: selectedCategory, search: searchQuery }),
    ]);

    setShops(fetchedShops || []);
    setProducts(fetchedProducts || []);
  };

  const getCurrentView = () => {
    if (location.pathname.startsWith('/shops')) return 'shops';
    if (
      location.pathname.startsWith('/categories') ||
      location.pathname.startsWith('/category')
    )
      return 'categories';
    if (location.pathname.startsWith('/shop/')) return 'shop';
    if (location.pathname.startsWith('/dashboard')) return 'dashboard';
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/cart')) return 'cart';
    return 'home';
  };

  const navigateToView = (view) => {
    const routeMap = {
      home: '/',
      shops: '/shops',
      categories: '/categories',
      dashboard: '/dashboard',
      admin: '/admin',
      cart: '/cart',
    };
    navigate(routeMap[view] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenShop = (shopId) => {
    navigate(`/shop/${encodeURIComponent(shopId)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (productId) => {
    navigate(`/product/${encodeURIComponent(productId)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCategorySlug = (slug) => {
    navigate(`/category/${encodeURIComponent(slug)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (role = 'customer') => {
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateShop = async (updatedShop) => {
    const id = updatedShop._id || updatedShop.id;
    setShops((prev) =>
      prev.map((s) => ((s._id || s.id) === id ? updatedShop : s)),
    );
    await api.updateShop(id, updatedShop);
  };

  const filteredProducts = products.filter((p) => {
    if (!selectedArea || selectedArea === 'all') return true;
    const shop = shops.find((s) => (s._id || s.id) === p.shopId);
    if (!shop) return true;
    const areaId = selectedArea.toLowerCase().replace(/[^a-z0-9]/g, '');
    const shopArea = (shop.area || shop.address || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    return shopArea.includes(areaId) || areaId.includes(shopArea);
  });

  const filteredShops = shops.filter((s) => {
    if (!selectedArea || selectedArea === 'all') return true;
    const areaId = selectedArea.toLowerCase().replace(/[^a-z0-9]/g, '');
    const shopArea = (s.area || s.address || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    return shopArea.includes(areaId) || areaId.includes(shopArea);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#1B1C19]">
      <Navbar
        onNavigate={navigateToView}
        currentView={getCurrentView()}
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          if (location.pathname !== '/' && val.trim()) {
            navigate('/');
          }
        }}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        selectedArea={selectedArea}
        onSelectArea={setSelectedArea}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoryIconStrip
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  onOpenCategoryPage={handleOpenCategorySlug}
                />

                <PremiumHomeHero
                  shopCount={shops.length}
                  onExploreCollection={() => {
                    const el = document.getElementById('collection-showcase');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onBrowseShops={() => navigateToView('shops')}
                />

                <div id="collection-showcase" className="scroll-mt-20">
                  <FlipkartBannerCarousel
                    shops={shops}
                    products={products}
                    onOpenShop={handleOpenShop}
                  />

                  <CuratedDealsGrid
                    products={filteredProducts}
                    shops={shops}
                    onOpenShop={handleOpenShop}
                    onOpenProduct={handleOpenProduct}
                  />

                  <OfferComparisonView
                    products={filteredProducts}
                    shops={shops}
                    onOpenShop={handleOpenShop}
                    onOpenProduct={handleOpenProduct}
                    selectedCategory={selectedCategory}
                  />
                </div>

                <ShopDirectory
                  shops={filteredShops}
                  onOpenShop={handleOpenShop}
                  onSelectCategory={setSelectedCategory}
                />
              </>
            }
          />

          <Route
            path="/shops"
            element={
              <ShopsPage
                shops={shops}
                products={products}
                onOpenShop={handleOpenShop}
                onOpenAuth={handleOpenAuth}
              />
            }
          />

          <Route
            path="/categories"
            element={
              <CategoriesPage
                shops={shops}
                products={products}
                onSelectCategoryAndGo={(catId) => {
                  setSelectedCategory(catId);
                  handleOpenCategorySlug(CATEGORY_TO_SLUG[catId] || 'for-you');
                }}
                onOpenShop={handleOpenShop}
              />
            }
          />

          <Route
            path="/category/:slug"
            element={
              <CategoryDetailRouteView
                shops={shops}
                products={products}
                onBack={() => navigateToView('home')}
                onOpenShop={handleOpenShop}
                onOpenProduct={handleOpenProduct}
              />
            }
          />

          <Route
            path="/product/:productId"
            element={
              <ProductDetailRouteView
                products={products}
                shops={shops}
                onBack={() => navigateToView('home')}
                onOpenShop={handleOpenShop}
                onOpenProduct={handleOpenProduct}
              />
            }
          />

          <Route
            path="/shop/:shopId"
            element={
              <ShopRouteView
                shops={shops}
                products={products}
                onBack={() => navigateToView('shops')}
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ShopOwnerDashboard
                user={user}
                allShops={shops}
                onOpenShop={handleOpenShop}
                onRefreshShops={fetchMarketplaceData}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <AdminPanel
                shops={shops}
                onUpdateShop={handleUpdateShop}
                onOpenShop={handleOpenShop}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                onContinueShopping={() => navigateToView('home')}
                onOpenShop={handleOpenShop}
              />
            }
          />

          <Route
            path="*"
            element={
              <>
                <CategoryIconStrip
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  onOpenCategoryPage={handleOpenCategorySlug}
                />
                <PremiumHomeHero
                  shopCount={shops.length}
                  onExploreCollection={() => {
                    const el = document.getElementById('collection-showcase');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onBrowseShops={() => navigateToView('shops')}
                />
              </>
            }
          />
        </Routes>
      </main>

      <Footer
        onOpenAuth={handleOpenAuth}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleOpenCategorySlug(CATEGORY_TO_SLUG[cat] || 'for-you');
        }}
      />

      <CartDrawer onOpenCartPage={() => navigateToView('cart')} />

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
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

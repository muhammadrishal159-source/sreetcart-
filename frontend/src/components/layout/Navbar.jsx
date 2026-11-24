import React, { useState } from 'react';
import {
  ShoppingBag,
  MapPin,
  Search,
  User,
  Store,
  LogOut,
  LayoutDashboard,
  Tag,
  X,
  ChevronDown,
  ShieldCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import { THEME } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar = ({
  onNavigate,
  currentView,
  searchQuery,
  onSearchChange,
  onOpenAuth,
  onLogout,
  selectedArea,
  onSelectArea,
}) => {
  const { user, isShopOwner } = useAuth();
  const { itemCount, openCart } = useCart();
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/90 shadow-2xs">
      {/* Main Flipkart-Style Header: Brand - Central Wide Search - Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Brand Logo */}
        <div
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900">
                Street<span className="text-orange-600">Cart</span>
              </span>
              <span className="text-[10px] bg-orange-100 text-orange-800 font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                Calicut
              </span>
            </div>
            <p className="text-[10px] text-stone-500 hidden sm:block -mt-0.5 font-medium">
              Explore City Stores &amp; Best Deals
            </p>
          </div>
        </div>

        {/* Center: Large Flipkart-Style Central Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for Products, City Stores, Kurtis, Shoes, Mavoor Rd deals..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#FAF9F6] hover:bg-stone-50 focus:bg-white border border-stone-200/90 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Navigation Links, Login Dropdown & Cart */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Stores Directory Link */}
          <button
            onClick={() => onNavigate('shops')}
            className={`hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentView === 'shops'
                ? 'text-orange-600 bg-orange-50 font-bold'
                : 'text-stone-700 hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            <Store className="w-4 h-4 text-orange-500" />
            <span>Shops</span>
          </button>

          {/* Categories Link */}
          <button
            onClick={() => onNavigate('categories')}
            className={`hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentView === 'categories'
                ? 'text-orange-600 bg-orange-50 font-bold'
                : 'text-stone-700 hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            <Layers className="w-4 h-4 text-stone-500" />
            <span>Categories</span>
          </button>

          {/* Admin Panel Quick Link */}
          <button
            onClick={() => onNavigate('admin')}
            className={`hidden xl:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'admin'
                ? 'bg-slate-900 text-amber-400'
                : 'text-stone-500 hover:text-slate-900 hover:bg-stone-50'
            }`}
            title="Admin Governance"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Admin</span>
          </button>

          {/* User Auth Dropdown (Flipkart style "Login ▾") */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setLoginMenuOpen((prev) => !prev)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-slate-900 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {loginMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-stone-500 capitalize">{user.role.replace('_', ' ')}</p>
                  </div>

                  {isShopOwner && (
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setLoginMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 mt-1 rounded-xl text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 flex items-center space-x-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-orange-600" />
                      <span>Shop Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onNavigate('shops');
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-stone-50 flex items-center space-x-2 cursor-pointer"
                  >
                    <Store className="w-4 h-4 text-stone-500" />
                    <span>Explore Stores</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 mt-1 border-t border-stone-100 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center space-x-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setLoginMenuOpen((prev) => !prev)}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold shadow-sm shadow-orange-600/20 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
                <ChevronDown className="w-3 h-3 text-orange-200" />
              </button>

              {loginMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-stone-100">
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Welcome to StreetCart
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onOpenAuth('customer');
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 mt-1 rounded-xl text-xs font-bold text-slate-800 hover:bg-orange-50 hover:text-orange-600 flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-orange-500" />
                    <span>Customer Login / Register</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('shop_owner');
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Store className="w-4 h-4 text-amber-500" />
                    <span>Shop Owner Login</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Flipkart-Style Cart Button with Dynamic Badge */}
          <button
            onClick={openCart}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl border border-stone-200/90 hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-slate-800 group-hover:text-orange-600 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors hidden sm:inline">
              Cart
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar below Header */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search stores, offers, kurtis, shoes..."
            className="w-full pl-9 pr-8 py-2 bg-[#FAF9F6] border border-stone-200 rounded-xl text-xs text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

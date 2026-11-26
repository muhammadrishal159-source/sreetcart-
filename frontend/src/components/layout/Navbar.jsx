import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  User,
  Store,
  LogOut,
  LayoutDashboard,
  X,
  ChevronDown,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { StreetCartLogo } from '../common/StreetCartLogo';

export const Navbar = ({
  onNavigate,
  currentView,
  searchQuery,
  onSearchChange,
  onOpenAuth,
  onLogout,
}) => {
  const { user, isShopOwner } = useAuth();
  const { itemCount, openCart } = useCart();
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/90 backdrop-blur-xl border-b border-[#EAE4D3] shadow-[0_2px_12px_rgba(27,28,25,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Brand Logo */}
        <div
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <StreetCartLogo className="w-10 h-10 rounded-xl shadow-[0_6px_18px_-4px_rgba(234,179,8,0.45)] group-hover:scale-105 transition-transform duration-200" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-[#1B1C19]">
                Street<span className="text-[#CA8A04]">Cart</span>
              </span>
              <span className="text-[10px] bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047]/70 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Nadapuram
              </span>
            </div>
            <p className="text-[11px] text-[#5C5647] hidden sm:block -mt-0.5 font-medium">
              Explore City Stores &amp; Best Deals
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#817660]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for Products, City Stores, Kurtis, Shoes, Mavoor Rd deals..."
              className="w-full pl-11 pr-10 py-2.5 bg-white hover:bg-[#FFFDF7] focus:bg-white border border-[#EAE4D3] rounded-full text-xs sm:text-sm text-[#1B1C19] placeholder-[#817660] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/35 focus:border-[#EAB308] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#817660] hover:text-[#1B1C19] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Navigation Links, Login Dropdown & Cart */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          {/* Stores Directory Link */}
          <button
            onClick={() => onNavigate('shops')}
            className={`hidden lg:flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentView === 'shops'
                ? 'bg-[#FEF9C3] text-[#1B1C19] border border-[#FACC15]'
                : 'text-[#4F4633] hover:text-[#1B1C19] hover:bg-[#F5F3EE]'
            }`}
          >
            <Store className="w-4 h-4 text-[#CA8A04]" />
            <span>Shops</span>
          </button>

          {/* Categories Link */}
          <button
            onClick={() => onNavigate('categories')}
            className={`hidden lg:flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              currentView === 'categories'
                ? 'bg-[#FEF9C3] text-[#1B1C19] border border-[#FACC15]'
                : 'text-[#4F4633] hover:text-[#1B1C19] hover:bg-[#F5F3EE]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#817660]" />
            <span>Categories</span>
          </button>

          {/* Admin Panel Quick Link */}
          <button
            onClick={() => onNavigate('admin')}
            className={`hidden xl:flex items-center space-x-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentView === 'admin'
                ? 'bg-[#1B1C19] text-[#FACC15]'
                : 'text-[#5C5647] hover:text-[#1B1C19] hover:bg-[#F5F3EE]'
            }`}
            title="Admin Governance"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Admin</span>
          </button>

          {/* User Auth Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setLoginMenuOpen((prev) => !prev)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-[#EAE4D3] hover:border-[#EAB308] text-[#1B1C19] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#FACC15] text-[#1B1C19] flex items-center justify-center text-xs font-extrabold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#817660]" />
              </button>

              {loginMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EAE4D3] p-2 z-50">
                  <div className="px-3 py-2 border-b border-[#F5F3EE]">
                    <p className="text-xs font-bold text-[#1B1C19]">{user.name}</p>
                    <p className="text-[11px] text-[#5C5647] capitalize">{user.role.replace('_', ' ')}</p>
                  </div>

                  {isShopOwner && (
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setLoginMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 mt-1 rounded-xl text-xs font-semibold text-[#1B1C19] hover:bg-[#FEF9C3] flex items-center space-x-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#CA8A04]" />
                      <span>Shop Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onNavigate('shops');
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#1B1C19] hover:bg-[#F5F3EE] flex items-center space-x-2 cursor-pointer"
                  >
                    <Store className="w-4 h-4 text-[#5C5647]" />
                    <span>Explore Stores</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogout();
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 mt-1 border-t border-[#F5F3EE] rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center space-x-2 cursor-pointer"
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
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#FACC15] hover:bg-[#FDE047] text-[#1B1C19] text-xs sm:text-sm font-bold shadow-[0_8px_20px_-6px_rgba(234,179,8,0.5)] transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
                <ChevronDown className="w-3 h-3 text-[#4F4633]" />
              </button>

              {loginMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EAE4D3] p-2 z-50">
                  <div className="p-2 border-b border-[#F5F3EE]">
                    <p className="text-[11px] font-bold text-[#817660] uppercase tracking-wider">
                      Welcome to StreetCart
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onOpenAuth('customer');
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 mt-1 rounded-xl text-xs font-bold text-[#1B1C19] hover:bg-[#FEF9C3] flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#CA8A04]" />
                    <span>Customer Login / Register</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('shop_owner');
                      setLoginMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-[#1B1C19] hover:bg-[#F5F3EE] flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <Store className="w-4 h-4 text-[#CA8A04]" />
                    <span>Shop Owner Login</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart Button with Dynamic Badge */}
          <button
            onClick={openCart}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-full border transition-all cursor-pointer shadow-2xs group ${
              itemCount > 0
                ? 'bg-[#FEF9C3]/70 border-[#FACC15] hover:bg-[#FACC15]'
                : 'bg-white border-[#EAE4D3] hover:border-[#EAB308] hover:bg-[#FEF9C3]/40'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#1B1C19] transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1B1C19] text-[#FACC15] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#1B1C19] hidden sm:inline">
              Cart
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar below Header */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#817660]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search stores, offers, kurtis, shoes..."
            className="w-full pl-10 pr-8 py-2 bg-white border border-[#EAE4D3] rounded-full text-xs text-[#1B1C19] placeholder-[#817660] focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30 focus:border-[#EAB308]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#817660]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

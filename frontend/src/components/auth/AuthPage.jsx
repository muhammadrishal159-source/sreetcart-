import React, { useState } from 'react';
import {
  ShoppingBag,
  Store,
  User,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { THEME } from '../../theme/theme';

export const AuthPage = ({ onContinueAsGuest, onLoginSuccess }) => {
  const { login, register } = useAuth();

  // Mode: 'login' | 'register'
  const [isRegister, setIsRegister] = useState(false);

  // Role for registration: 'customer' | 'shop_owner'
  const [regRole, setRegRole] = useState('customer');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('Dress');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Unified Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // Registering with selected role
        const res = await register({
          name: regRole === 'shop_owner' ? (shopName || name) : name,
          email,
          password,
          role: regRole,
          phone,
        });

        if (res.success) {
          onLoginSuccess && onLoginSuccess(res.user?.role || regRole);
        } else {
          setError(res.error || 'Registration failed');
        }
      } else {
        // Single unified login for both Customer and Shop Owner
        const res = await login({ email, password });
        if (res.success) {
          // Automatic redirection based on account role
          const role = res.user?.role || 'customer';
          onLoginSuccess && onLoginSuccess(role);
        } else {
          setError(res.error || 'Invalid email or password');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Quick Demo Login Shortcuts
  const handleDemo = async (type) => {
    setLoading(true);
    if (type === 'owner') {
      const res = await login({ email: 'owner@smstreet.in', password: 'streetcart123' });
      onLoginSuccess && onLoginSuccess('shop_owner');
    } else {
      const res = await login({ email: 'customer@streetcart.in', password: 'streetcart123' });
      onLoginSuccess && onLoginSuccess('customer');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl tracking-tight text-white">
                Street<span className="text-orange-500">Cart</span>
              </span>
              <span className="text-[10px] bg-orange-600/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-bold">
                Kozhikode
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Discover City Stores & Best Offers in One Place
            </p>
          </div>
        </div>

        <button
          onClick={onContinueAsGuest}
          className="text-xs sm:text-sm text-slate-300 hover:text-white font-semibold flex items-center space-x-1.5 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 transition-colors"
        >
          <span>Continue as Guest</span>
          <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
        </button>
      </header>

      {/* Main Single Centered Login / Register Card */}
      <div className="max-w-md mx-auto w-full my-8">
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discover City Stores & Best Offers in One Place</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isRegister ? 'Create Your Account' : 'Sign In to StreetCart'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isRegister
                ? 'Register as Customer or Shop Owner'
                : 'Sign in to access local stores, deals & merchant tools'}
            </p>
          </div>

          {/* Toggle: Sign In vs Create Account */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl mb-6 text-xs font-bold border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`py-2 rounded-lg transition-all ${
                !isRegister
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
              className={`py-2 rounded-lg transition-all ${
                isRegister
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="p-3 mb-4 rounded-xl bg-red-950/70 border border-red-700/60 text-red-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If Registering: Select Account Type */}
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  I want to register as: *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('customer')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      regRole === 'customer'
                        ? 'bg-orange-600/20 border-orange-500 text-orange-400 ring-1 ring-orange-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Customer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('shop_owner')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      regRole === 'shop_owner'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 ring-1 ring-amber-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Shop Owner</span>
                  </button>
                </div>
              </div>
            )}

            {/* Registration Extra Fields */}
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun / Rahim"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            )}

            {isRegister && regRole === 'shop_owner' && (
              <div className="space-y-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-amber-400 mb-1">
                    Shop / Store Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="e.g. SM Street Heritage Silks"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-400 mb-1">
                    Store Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    {THEME.categories
                      .filter((c) => c.id !== 'All')
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@streetcart.in"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone (for register) */}
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone / WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98470 12345"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <span>
                {loading
                  ? 'Processing...'
                  : isRegister
                  ? `Create ${regRole === 'shop_owner' ? 'Shop Owner' : 'Customer'} Account`
                  : 'Sign In to StreetCart'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Shortcut Box */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>One-Click Instant Demo Login</span>
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemo('customer')}
                className="py-2 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/20 transition-colors"
              >
                Demo Customer
              </button>

              <button
                type="button"
                onClick={() => handleDemo('owner')}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold border border-slate-700 transition-colors"
              >
                Demo Shop Owner
              </button>
            </div>
          </div>
        </div>

        {/* Continue as Guest Button */}
        <div className="mt-5 text-center">
          <button
            onClick={onContinueAsGuest}
            className="text-xs text-slate-400 hover:text-orange-400 font-medium underline underline-offset-4 transition-colors"
          >
            Browse as Guest →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3.5 h-3.5 text-orange-500" />
          <span>Kozhikode: SM Street • Mavoor Road • Palayam • Focus Mall</span>
        </div>
        <p>© {new Date().getFullYear()} StreetCart</p>
      </footer>
    </div>
  );
};

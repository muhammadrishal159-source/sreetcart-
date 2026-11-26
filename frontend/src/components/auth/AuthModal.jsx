import React, { useState, useEffect } from 'react';
import { X, Store, User, Lock, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, initialRole = 'customer' }) => {
  const { login, register } = useAuth();
  const [role, setRole] = useState(initialRole); // 'customer' | 'shop_owner'
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setRole(initialRole);
    setError('');
  }, [initialRole, isOpen]);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await register({
          name: role === 'shop_owner' ? (shopName || name) : name,
          email,
          password,
          role,
          phone,
        });
        if (res.success) {
          onClose();
        } else {
          setError(res.error || 'Registration failed');
        }
      } else {
        const res = await login({ email, password });
        if (res.success) {
          onClose();
        } else {
          setError(res.error || 'Invalid credentials');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole) => {
    setLoading(true);
    if (demoRole === 'shop_owner') {
      await login({ email: 'owner@smstreet.in', password: 'streetcart123' });
    } else {
      await login({ email: 'customer@streetcart.in', password: 'streetcart123' });
    }
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B1C19]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-[#EAE4D3] overflow-hidden">
        <img
          src="/images/bg-auth-editorial.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-44 w-full object-cover opacity-35"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/40 via-white/85 to-white"
        />
        <div className="relative z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Micro Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FACC15] text-[#1B1C19] font-bold mb-3 shadow-md shadow-orange-500/20">
            {role === 'shop_owner' ? <Store className="w-6 h-6" /> : <User className="w-6 h-6" />}
          </div>
          <h2 className="text-2xl font-black text-[#1B1C19] tracking-tight">
            {isRegister
              ? role === 'shop_owner'
                ? 'Register Your Shop'
                : 'Create Customer Account'
              : role === 'shop_owner'
              ? 'Shop Owner Sign In'
              : 'Customer Sign In'}
          </h2>
          <p className="text-xs text-[#5C5647] mt-1">
            {role === 'shop_owner'
              ? 'Manage your Kozhikode store profile & list live offers'
              : 'Discover city offers and compare deals across Kozhikode'}
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              role === 'customer'
                ? 'bg-white text-[#1B1C19] shadow-xs'
                : 'text-[#5C5647] hover:text-[#1B1C19]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('shop_owner')}
            className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              role === 'shop_owner'
                ? 'bg-[#1B1C19] text-white shadow-xs'
                : 'text-[#5C5647] hover:text-[#1B1C19]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Shop Owner</span>
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {role === 'shop_owner' ? 'Merchant Contact Name *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahim / Arjun"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FFFDF7] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30"
              />
            </div>
          )}

          {isRegister && role === 'shop_owner' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shop / Brand Name *
              </label>
              <input
                type="text"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="e.g. SM Street Heritage Silks"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FFFDF7] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@streetcart.in"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FFFDF7] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FFFDF7] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98470 12345"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FFFDF7] border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EAB308]/30"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center space-x-2 ${
              role === 'shop_owner'
                ? 'bg-[#1B1C19] hover:bg-slate-800'
                : 'bg-orange-600 hover:bg-[#FDE047] shadow-orange-600/20'
            }`}
          >
            <span>
              {loading
                ? 'Processing...'
                : isRegister
                ? 'Create Account'
                : 'Sign In to StreetCart'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs text-slate-600 hover:text-[#CA8A04] font-semibold"
          >
            {isRegister
              ? 'Already registered? Sign In'
              : "Don't have an account yet? Register here"}
          </button>
        </div>

        {/* 1-Click Demo Login Box */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3 flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>One-Click Instant Demo Logins</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin('customer')}
              className="px-3 py-2 rounded-lg bg-[#FEF9C3]/60 hover:bg-orange-100 text-orange-700 font-semibold border border-orange-200 transition-colors"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('shop_owner')}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1B1C19] font-semibold border border-[#EAE4D3] transition-colors"
            >
              Demo Shop Owner
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  ShieldCheck,
  Store,
  Sparkles,
  Tag,
  CheckCircle,
  XCircle,
  ExternalLink,
  Search,
  Filter,
  BarChart3,
  Flame,
} from 'lucide-react';

export const AdminPanel = ({ shops, onUpdateShop, onOpenShop }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('all');

  const filteredShops = shops.filter((s) => {
    const matchesSearch =
      !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesArea =
      filterArea === 'all' || s.area.toLowerCase().includes(filterArea.toLowerCase());

    return matchesSearch && matchesArea;
  });

  const featuredCount = shops.filter((s) => s.isFeatured).length;

  const handleToggleFeatured = (shop) => {
    const updated = {
      ...shop,
      isFeatured: !shop.isFeatured,
      adPriority: !shop.isFeatured ? 10 : 0,
    };
    onUpdateShop && onUpdateShop(updated);
  };

  const handleToggleOpen = (shop) => {
    const updated = {
      ...shop,
      isOpen: shop.isOpen !== false ? false : true,
    };
    onUpdateShop && onUpdateShop(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>StreetCart Platform Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Marketplace Admin Control Center
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Manage registered Kozhikode merchants, approve stores, and toggle paid featured ads.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 text-stone-200 border border-white/10">
            Admin Mode Active
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase">Total Stores</span>
            <Store className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{shops.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% Verified in Kozhikode</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase">Active Featured Ads</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">{featuredCount}</p>
          <span className="text-[11px] text-stone-500">Promoted on Homepage Carousel</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase">Target City</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">Kozhikode</p>
          <span className="text-[11px] text-stone-500">SM Street, Mavoor Rd, Palayam</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase">Commission Rate</span>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600">0%</p>
          <span className="text-[11px] text-stone-500">Free Promotion in Phase 1</span>
        </div>
      </div>

      {/* Merchant Management Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-5 border-b border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Registered Merchant Storefronts
            </h3>
            <p className="text-xs text-stone-500">
              Toggle homepage paid ads (`isFeatured`) and manage store status.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search store name or area..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-5">Store &amp; Location</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Rating</th>
                <th className="py-3 px-5 text-center">Paid Homepage Ad</th>
                <th className="py-3 px-5 text-center">Store Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredShops.map((shop) => (
                <tr key={shop._id || shop.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* Shop Details */}
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <img
                        src={shop.logoUrl}
                        alt={shop.name}
                        className="w-10 h-10 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs">
                          {shop.name}
                        </h4>
                        <span className="text-[11px] text-stone-500 flex items-center">
                          {shop.area}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-5">
                    <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-stone-100 text-stone-700">
                      {shop.category}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-5 font-bold text-slate-800">
                    ⭐ {shop.rating || 4.8}
                  </td>

                  {/* Toggle Paid Featured Ad */}
                  <td className="py-4 px-5 text-center">
                    <button
                      onClick={() => handleToggleFeatured(shop)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-bold text-[11px] transition-all cursor-pointer ${
                        shop.isFeatured
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs'
                          : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{shop.isFeatured ? 'Promoted (Paid Ad)' : 'Standard Listing'}</span>
                    </button>
                  </td>

                  {/* Store Status Toggle */}
                  <td className="py-4 px-5 text-center">
                    <button
                      onClick={() => handleToggleOpen(shop)}
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold cursor-pointer ${
                        shop.isOpen !== false
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      <span>{shop.isOpen !== false ? '● Open' : '○ Closed'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => onOpenShop(shop._id || shop.id || shop.slug)}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-slate-900 hover:text-white text-stone-600 transition-colors inline-flex items-center cursor-pointer"
                      title="View Live Store Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

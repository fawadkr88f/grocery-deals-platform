import React, { useState } from 'react';
import { X, Plus, Trash2, Sparkles, TrendingDown, Store, Check, Copy } from 'lucide-react';
import { LocationState, ShoppingListItem } from '../types';
import { optimizeShoppingList } from '../services/api';
import { POPULAR_DAILY_ESSENTIALS } from '../services/fallbackData';

interface BasketOptimizerModalProps {
  location: LocationState;
  items: ShoppingListItem[];
  onClose: () => void;
  onUpdateItems: (items: ShoppingListItem[]) => void;
}

export const BasketOptimizerModal: React.FC<BasketOptimizerModalProps> = ({
  location,
  items,
  onClose,
  onUpdateItems
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAddItem = (name: string) => {
    if (!name.trim()) return;
    if (items.some(i => i.name.toLowerCase() === name.trim().toLowerCase())) return;
    onUpdateItems([
      ...items,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        quantity: 1,
        checked: true
      }
    ]);
    setNewItemName('');
  };

  const handleToggleCheck = (id: string) => {
    onUpdateItems(items.map(it => (it.id === id ? { ...it, checked: !it.checked } : it)));
  };

  const handleDeleteItem = (id: string) => {
    onUpdateItems(items.filter(it => it.id !== id));
  };

  const handleOptimize = async () => {
    const active = items.filter(i => i.checked);
    if (active.length === 0) return;

    setOptimizing(true);
    const res = await optimizeShoppingList(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        radiusKm: location.radiusKm
      },
      active.map(i => ({ name: i.name, quantity: i.quantity }))
    );
    setResult(res);
    setOptimizing(false);
  };

  const handleCopySummary = () => {
    if (!result) return;
    const text = `🛒 My Optimized Grocery Basket (${location.address})
Single-Store Best: ${result.singleStoreBest?.retailerName} (Rs. ${result.singleStoreBest?.totalCost.toLocaleString()})
Multi-Store Optimal: Rs. ${result.multiStoreOptimal.totalCost.toLocaleString()} (Saves Rs. ${result.multiStoreOptimal.totalSavingsVsSingleStore.toLocaleString()})
Recommendation: ${result.tradeoffRecommendation}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>Smart Grocery Basket Planner</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {items.length} Items
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Calculate single-store total vs multi-store optimal savings near {location.address}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Add Item Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAddItem(newItemName);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Type grocery item (e.g. Cooking Oil 5L, Basmati Rice 5kg, Milk 1L)..."
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              className="flex-1 text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          {/* Quick-Add Essentials Bar */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              + 1-Tap Add Daily Essentials
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_DAILY_ESSENTIALS.map(ess => (
                <button
                  key={ess}
                  onClick={() => handleAddItem(ess)}
                  className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-semibold transition-colors"
                >
                  + {ess}
                </button>
              ))}
            </div>
          </div>

          {/* Current List Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 max-h-56 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Your basket is empty. Click any essential above or type custom items!
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50">
                  <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleCheck(item.id)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span
                      className={`text-xs font-bold truncate ${
                        item.checked ? 'text-slate-900' : 'text-slate-400 line-through'
                      }`}
                    >
                      {item.name}
                    </span>
                  </label>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Qty: {item.quantity}
                    </span>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Optimizer Trigger Button */}
          <button
            onClick={handleOptimize}
            disabled={optimizing || items.filter(i => i.checked).length === 0}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${optimizing ? 'animate-spin' : ''}`} />
            <span>{optimizing ? 'Comparing Supermarket Prices...' : '⚡ Optimize & Compare Supermarket Deals'}</span>
          </button>

          {/* Optimization Results */}
          {result && (
            <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-900">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                  <span>Basket Optimization Results</span>
                </div>

                <button
                  onClick={handleCopySummary}
                  className="text-xs font-bold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Recommendation Notice */}
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs text-slate-800">
                <span className="font-extrabold text-emerald-800 block mb-0.5">Recommendation:</span>
                {result.tradeoffRecommendation}
              </div>

              {/* Compare Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.singleStoreBest && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Single-Store Best</span>
                    <h4 className="font-black text-sm text-slate-900 mt-0.5">{result.singleStoreBest.retailerName}</h4>
                    <div className="text-lg font-black text-slate-900 mt-1">
                      Rs. {result.singleStoreBest.totalCost.toLocaleString()}
                    </div>
                    <span className="text-xs text-slate-500">📍 {result.singleStoreBest.distanceKm.toFixed(1)} km away</span>
                  </div>
                )}

                <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-xs">
                  <span className="text-[10px] font-bold text-emerald-200 uppercase">Multi-Store Combination</span>
                  <h4 className="font-black text-sm text-white mt-0.5">{result.multiStoreOptimal.storeCount} Stores Combined</h4>
                  <div className="text-lg font-black text-white mt-1">
                    Rs. {result.multiStoreOptimal.totalCost.toLocaleString()}
                  </div>
                  <span className="text-xs font-bold text-emerald-100">
                    Save Rs. {result.multiStoreOptimal.totalSavingsVsSingleStore.toLocaleString()} extra!
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

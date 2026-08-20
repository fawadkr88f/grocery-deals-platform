import React, { useState } from 'react';
import { X, Plus, Trash2, Sparkles, TrendingDown } from 'lucide-react';
import { LocationState, ShoppingListItem } from '../types';
import { optimizeShoppingList } from '../services/api';

interface ShoppingListDrawerProps {
  location: LocationState;
  items: ShoppingListItem[];
  onClose: () => void;
  onUpdateItems: (items: ShoppingListItem[]) => void;
}

export const ShoppingListDrawer: React.FC<ShoppingListDrawerProps> = ({
  location,
  items,
  onClose,
  onUpdateItems
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const updated = [
      ...items,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: newItemName.trim(),
        quantity: 1,
        checked: true
      }
    ];
    onUpdateItems(updated);
    setNewItemName('');
  };

  const handleToggleCheck = (id: string) => {
    const updated = items.map(it => (it.id === id ? { ...it, checked: !it.checked } : it));
    onUpdateItems(updated);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter(it => it.id !== id);
    onUpdateItems(updated);
  };

  const handleOptimize = async () => {
    const activeItems = items.filter(it => it.checked);
    if (activeItems.length === 0) return;

    setOptimizing(true);
    const res = await optimizeShoppingList(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        radiusKm: location.radiusKm
      },
      activeItems.map(it => ({ name: it.name, quantity: it.quantity }))
    );
    setResult(res);
    setOptimizing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end">
      <div className="bg-white rounded-t-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>My Grocery Shopping List</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                {items.length} items
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Batch optimize your basket across stores near {location.address}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Add item form */}
        <form onSubmit={handleAddItem} className="p-3 border-b border-slate-100 flex gap-2">
          <input
            type="text"
            placeholder="Add item (e.g. Cooking Oil 5L, Rice 5kg, Milk 1L)..."
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        {/* Quick Add Daily Essentials Chips */}
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            + Quick Add Daily Essentials
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              'Cooking Oil 5L',
              'Wheat Atta 10kg',
              'Basmati Rice 5kg',
              'Milk 1L',
              'Eggs 12',
              'Tapal Tea 950g',
              'Sugar 5kg',
              'Chicken 1kg',
              'Potatoes 5kg',
              'Surf Excel 5kg',
              'Dettol Soap'
            ].map(ess => (
              <button
                key={ess}
                type="button"
                onClick={() => {
                  if (!items.some(i => i.name.toLowerCase() === ess.toLowerCase())) {
                    onUpdateItems([
                      ...items,
                      {
                        id: Math.random().toString(36).substring(2, 9),
                        name: ess,
                        quantity: 1,
                        checked: true
                      }
                    ]);
                  }
                }}
                className="text-[10px] font-semibold bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-slate-700 border border-slate-200 px-2 py-1 rounded-md shrink-0 transition-colors"
              >
                + {ess}
              </button>
            ))}
          </div>
        </div>

        {/* List items */}
        <div className="p-3 max-h-48 overflow-y-auto divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              Your shopping list is empty. Add grocery items above!
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="py-2 flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleCheck(item.id)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span
                    className={`text-xs font-medium truncate ${
                      item.checked ? 'text-slate-800' : 'text-slate-400 line-through'
                    }`}
                  >
                    {item.name}
                  </span>
                </label>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                    x{item.quantity}
                  </span>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Button: Find Deals for My List */}
        <div className="p-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={handleOptimize}
            disabled={optimizing || items.filter(i => i.checked).length === 0}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${optimizing ? 'animate-spin' : ''}`} />
            <span>{optimizing ? 'Calculating Savings...' : '⚡ Find Deals for My List'}</span>
          </button>
        </div>

        {/* Optimization Results Panel */}
        {result && (
          <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 max-h-64 overflow-y-auto space-y-3">
            <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span>Basket Optimization Summary</span>
            </div>

            {/* Recommendation badge */}
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-[11px] text-slate-700">
              <p className="font-semibold text-emerald-800 mb-1">Recommendation:</p>
              <p>{result.tradeoffRecommendation}</p>
            </div>

            {/* Single store vs Multi store comparison */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {result.singleStoreBest && (
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Single-Store Best
                  </div>
                  <div className="font-bold text-slate-900 truncate mt-0.5">
                    {result.singleStoreBest.retailerName}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">
                    Rs. {result.singleStoreBest.totalCost.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    📍 {result.singleStoreBest.distanceKm.toFixed(1)} km away
                  </div>
                </div>
              )}

              <div className="bg-emerald-600 text-white p-2.5 rounded-xl">
                <div className="text-[10px] font-bold text-emerald-200 uppercase">
                  Multi-Store Optimal
                </div>
                <div className="font-bold text-white truncate mt-0.5">
                  {result.multiStoreOptimal.storeCount} Stores Combined
                </div>
                <div className="text-sm font-extrabold text-white mt-1">
                  Rs. {result.multiStoreOptimal.totalCost.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-100 font-semibold">
                  Save Rs. {result.multiStoreOptimal.totalSavingsVsSingleStore.toLocaleString()} extra!
                </div>
              </div>
            </div>

            {/* Store Breakdown */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Multi-Store Breakdown
              </div>
              {result.multiStoreOptimal.stores.map((st: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white p-2 rounded-lg border border-slate-200 text-[11px] flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800">{st.retailerName}</span>
                    <span className="text-slate-400 text-[10px] ml-1">
                      ({st.items.length} items • {st.distanceKm.toFixed(1)} km)
                    </span>
                  </div>
                  <span className="font-bold text-emerald-700">
                    Rs. {st.subtotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

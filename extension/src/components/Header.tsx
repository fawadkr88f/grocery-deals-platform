import React from 'react';
import { ShoppingBag, Sparkles, ListOrdered, RotateCw } from 'lucide-react';

interface HeaderProps {
  onOpenShoppingList: () => void;
  shoppingListCount: number;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenOptions: () => void;
  onRefreshNow: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenShoppingList,
  shoppingListCount,
  compareCount,
  onOpenCompare,
  onRefreshNow,
  isRefreshing
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-2.5 sticky top-0 z-30 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-200">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">
              Grocery Deals
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              Live Radar
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-semibold leading-none mt-1">
            Top discounts near your address
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Refresh Now Button */}
        <button
          onClick={onRefreshNow}
          disabled={isRefreshing}
          className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-bold shadow-xs active:scale-95"
          title="Refresh All Store Deals"
        >
          <RotateCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-[11px]">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>

        {compareCount > 0 && (
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-bold shadow-xs"
            title="Compare Products"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>({compareCount})</span>
          </button>
        )}

        <button
          onClick={onOpenShoppingList}
          className="relative p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          title="Shopping List"
        >
          <ListOrdered className="w-4 h-4" />
          {shoppingListCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {shoppingListCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

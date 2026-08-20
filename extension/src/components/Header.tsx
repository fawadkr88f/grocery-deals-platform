import React from 'react';
import { ShoppingBag, Sparkles, SlidersHorizontal, ListOrdered } from 'lucide-react';

interface HeaderProps {
  onOpenShoppingList: () => void;
  shoppingListCount: number;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenOptions: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenShoppingList,
  shoppingListCount,
  compareCount,
  onOpenCompare,
  onOpenOptions
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-200">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-slate-900 text-sm tracking-tight leading-none">
              Grocery Deals
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium leading-none mt-1">
            Local Supermarket Price Finder
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {compareCount > 0 && (
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs px-2.5 py-1.5 rounded-lg transition-colors font-medium shadow-xs"
            title="Compare Products"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Compare ({compareCount})</span>
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

        <button
          onClick={onOpenOptions}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Settings & Privacy"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

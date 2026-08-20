import React from 'react';
import { ExternalLink, Navigation, CheckCircle2, Plus, ArrowUpDown, Store, Clock } from 'lucide-react';
import { ProductDeal, FilterState } from '../types';

function formatTime(dateStr?: string): string {
  if (!dateStr) return 'Live Feed';
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return isToday ? `Today, ${time}` : `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${time}`;
  } catch {
    return 'Live Feed';
  }
}

interface DealsGridProps {
  deals: ProductDeal[];
  allDealsCount: number;
  filters: FilterState;
  onChangeFilters: (f: FilterState) => void;
  selectedCategory?: string;
  onSelectCategory: (cat?: string) => void;
  comparedIds: string[];
  onToggleCompare: (deal: ProductDeal) => void;
  onAddToList: (productName: string) => void;
}

const CATEGORIES = [
  { id: 'Cooking Oil', label: '🛢 Cooking Oil & Ghee' },
  { id: 'Rice & Grains', label: '🍚 Rice, Atta & Pulses' },
  { id: 'Dairy', label: '🥛 Milk, Dairy & Eggs' },
  { id: 'Beverages', label: '🧃 Tea & Beverages' },
  { id: 'Grocery', label: '🥫 Grocery & Spices' },
  { id: 'Meat', label: '🥩 Meat & Poultry' },
  { id: 'Fresh Produce', label: '🥦 Fresh Produce' },
  { id: 'Household', label: '🧴 Cleaners & Detergents' },
  { id: 'Personal Care', label: '🧼 Personal Care' }
];

const RETAILERS = [
  { id: 'carrefour-pk', name: 'Carrefour' },
  { id: 'metro-pk', name: 'Metro' },
  { id: 'al-fatah', name: 'Al-Fatah' },
  { id: 'imtiaz-pk', name: 'Imtiaz' },
  { id: 'jalal-sons', name: 'Jalal Sons' },
  { id: 'green-valley', name: 'Green Valley' }
];

export const DealsGrid: React.FC<DealsGridProps> = ({
  deals,
  filters,
  onChangeFilters,
  selectedCategory,
  onSelectCategory,
  comparedIds,
  onToggleCompare,
  onAddToList
}) => {
  return (
    <div className="space-y-4">
      {/* Supermarket Store Filter Tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1 shrink-0">
          <Store className="w-3.5 h-3.5 text-slate-500" />
          <span>Stores:</span>
        </span>

        <button
          onClick={() => onChangeFilters({ ...filters, selectedRetailers: [] })}
          className={`text-xs px-3 py-1.5 rounded-xl font-extrabold whitespace-nowrap transition-all shadow-2xs ${
            filters.selectedRetailers.length === 0
              ? 'bg-emerald-600 text-white shadow-emerald-700/30'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Supermarkets
        </button>

        {RETAILERS.map(ret => {
          const isSelected = filters.selectedRetailers.includes(ret.id);
          return (
            <button
              key={ret.id}
              onClick={() => {
                const updated = isSelected ? [] : [ret.id];
                onChangeFilters({ ...filters, selectedRetailers: updated });
              }}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shadow-2xs ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-emerald-700/30'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {ret.name}
            </button>
          );
        })}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => onSelectCategory(undefined)}
          className={`text-xs px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shadow-xs ${
            !selectedCategory
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Product Categories ({deals.length})
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(selectedCategory === cat.id ? undefined : cat.id)}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shadow-xs ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-900">
            {deals.length} Active Discounted Products
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
            🔥 Ranked by Top Discount %
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Discount Filter Pills */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Min:</span>
            {[0, 10, 15, 20].map(disc => (
              <button
                key={disc}
                onClick={() => onChangeFilters({ ...filters, minDiscount: disc })}
                className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  filters.minDiscount === disc
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {disc === 0 ? 'Any' : `${disc}%+`}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={e => onChangeFilters({ ...filters, sortBy: e.target.value as any })}
              className="text-xs font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="discount">🏷️ Top Discount %</option>
              <option value="deal_score">🔥 Best Deal Score</option>
              <option value="distance">📍 Closest Distance</option>
              <option value="price_low">💰 Lowest Price</option>
              <option value="price_high">💎 Highest Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {deals.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <div className="text-4xl">🛒</div>
          <h3 className="font-bold text-base text-slate-900">No active offers matching this filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting store filters or expanding search radius.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {deals.map(deal => {
            const { product, store, pricing, offer } = deal;
            const isCompared = comparedIds.includes(deal.id);

            return (
              <div
                key={deal.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Supermarket Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg truncate">
                      {store.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                      <Navigation className="w-3 h-3" />
                      <span>{store.distanceKm.toFixed(1)} km</span>
                    </div>
                  </div>

                  {/* Product Details & Image */}
                  <div className="flex gap-3.5 mb-3">
                    <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl">🛒</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          {product.brand}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {product.packageSize} {product.unit}
                        </span>
                      </div>

                      <h3 className="text-xs font-extrabold text-slate-900 leading-snug line-clamp-2 mt-0.5">
                        {product.name}
                      </h3>

                      {/* Pricing Row */}
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-base font-black text-slate-900">
                          {pricing.currency} {pricing.salePrice.toLocaleString()}
                        </span>
                        {pricing.regularPrice > pricing.salePrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {pricing.currency} {pricing.regularPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-[11px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                          {pricing.discountPercent}% OFF
                        </span>
                      </div>

                      {/* Unit Price & Savings */}
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">
                          {pricing.currency} {pricing.unitPrice.toFixed(1)} / {pricing.unit}
                        </span>
                        {pricing.savings > 0 && (
                          <span className="text-emerald-600 font-bold">
                            Save Rs. {pricing.savings.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar with Fetched Timestamp */}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-1 text-[10.5px]">
                    <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Fetched: <strong className="text-slate-900 font-bold">{formatTime(offer.lastVerified)}</strong></span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{offer.verificationStatus === 'verified_retailer' ? 'Verified Feed' : 'Catalog Offer'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-50">
                    {offer.validUntil ? (
                      <span className="text-[10px] text-slate-400 font-medium">
                        Valid until: {new Date(offer.validUntil).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 font-semibold">Active In-Store</span>
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleCompare(deal)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                          isCompared
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isCompared ? 'Compared' : '+ Compare'}
                      </button>

                      <button
                        onClick={() => onAddToList(product.name)}
                        className="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Basket</span>
                      </button>

                      {offer.sourceUrl && (
                        <a
                          href={offer.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View on Retailer Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

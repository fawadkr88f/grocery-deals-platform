import React, { useState } from 'react';
import { Filter, ArrowUpDown, List, Map as MapIcon, ChevronDown } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  totalOffers: number;
  totalStores: number;
  viewMode: 'list' | 'map';
  onToggleViewMode: (mode: 'list' | 'map') => void;
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
}

const RETAILERS = [
  { id: 'carrefour-pk', name: 'Carrefour' },
  { id: 'metro-pk', name: 'Metro' },
  { id: 'al-fatah', name: 'Al-Fatah' },
  { id: 'imtiaz-pk', name: 'Imtiaz' },
  { id: 'jalal-sons', name: 'Jalal Sons' },
  { id: 'green-valley', name: 'Green Valley' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  totalOffers,
  totalStores,
  viewMode,
  onToggleViewMode,
  filters,
  onChangeFilters
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleRetailer = (id: string) => {
    const isSelected = filters.selectedRetailers.includes(id);
    const updated = isSelected
      ? filters.selectedRetailers.filter(r => r !== id)
      : [...filters.selectedRetailers, id];
    onChangeFilters({ ...filters, selectedRetailers: updated });
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 text-xs">
      {/* Top row: Summary counts & View switcher */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="font-bold text-slate-900">{totalOffers} offers</span>
          <span className="text-slate-500 text-[11px] ml-1">
            across {totalStores} stores
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
          <button
            onClick={() => onToggleViewMode('list')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <List className="w-3 h-3" />
            <span>List</span>
          </button>
          <button
            onClick={() => onToggleViewMode('map')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              viewMode === 'map'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapIcon className="w-3 h-3" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Filter Options Row */}
      <div className="mt-2 flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
        {/* Sort selector */}
        <div className="flex items-center gap-1">
          <ArrowUpDown className="w-3 h-3 text-slate-400" />
          <select
            value={filters.sortBy}
            onChange={e => onChangeFilters({ ...filters, sortBy: e.target.value as any })}
            className="bg-transparent font-medium text-slate-700 text-[11px] focus:outline-none cursor-pointer"
          >
            <option value="discount">🏷️ Top Discount %</option>
            <option value="deal_score">🔥 Best Deal Score</option>
            <option value="distance">📍 Closest Distance</option>
            <option value="price_low">💰 Lowest Price</option>
            <option value="price_high">💎 Highest Price</option>
          </select>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors ${
            filters.selectedRetailers.length > 0 || filters.minDiscount > 0
              ? 'bg-emerald-100 text-emerald-800'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Filter className="w-3 h-3" />
          <span>Filters</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Expanded Filter Panel */}
      {showDropdown && (
        <div className="mt-2 pt-2 border-t border-slate-100 space-y-2">
          {/* Discount threshold */}
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Minimum Discount
            </span>
            <div className="flex items-center gap-1">
              {[0, 10, 20, 30, 50].map(disc => (
                <button
                  key={disc}
                  onClick={() => onChangeFilters({ ...filters, minDiscount: disc })}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                    filters.minDiscount === disc
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {disc === 0 ? 'Any' : `${disc}%+`}
                </button>
              ))}
            </div>
          </div>

          {/* Retailer Multi-select */}
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Supermarket Chains
            </span>
            <div className="flex flex-wrap gap-1">
              {RETAILERS.map(r => {
                const isSelected = filters.selectedRetailers.includes(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => handleToggleRetailer(r.id)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-medium border transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? '✓ ' : ''}
                    {r.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

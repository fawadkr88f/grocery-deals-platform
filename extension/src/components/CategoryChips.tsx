import React from 'react';

interface CategoryChipsProps {
  selectedCategory?: string;
  onSelectCategory: (cat?: string) => void;
}

const CATEGORIES = [
  { id: 'Cooking Oil', label: '🛢 Cooking Oil' },
  { id: 'Dairy', label: '🥛 Dairy' },
  { id: 'Rice & Grains', label: '🍚 Rice & Grains' },
  { id: 'Beverages', label: '🧃 Tea & Beverages' },
  { id: 'Household', label: '🧴 Household' },
  { id: 'Fresh Produce', label: '🥦 Fresh Produce' },
  { id: 'Meat', label: '🥩 Meat & Poultry' },
  { id: 'Grocery', label: '🥫 Grocery & Sugar' }
];

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-2 px-4 no-scrollbar bg-white border-b border-slate-100">
      <button
        onClick={() => onSelectCategory(undefined)}
        className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
          !selectedCategory
            ? 'bg-slate-900 text-white shadow-xs'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        All Deals
      </button>

      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(selectedCategory === cat.id ? undefined : cat.id)}
          className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
            selectedCategory === cat.id
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

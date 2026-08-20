import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { LocationState, ProductDeal, FilterState, ShoppingListItem } from '../types';
import { getSavedLocation, saveLocation, getShoppingList, saveShoppingList } from '../services/storage';
import { fetchOffers, fetchBestDeals } from '../services/api';
import { Header } from '../components/Header';
import { LocationPicker } from '../components/LocationPicker';
import { CategoryChips } from '../components/CategoryChips';
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';
import { MapView } from '../components/MapView';
import { CompareModal } from '../components/CompareModal';
import { ShoppingListDrawer } from '../components/ShoppingListDrawer';
import { BestDealsBanner } from '../components/BestDealsBanner';

export const Popup: React.FC = () => {
  const [location, setLocation] = useState<LocationState>({
    address: 'DHA Phase 6, Lahore',
    latitude: 31.4697,
    longitude: 74.4107,
    radiusKm: 10
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [deals, setDeals] = useState<ProductDeal[]>([]);
  const [totalStores, setTotalStores] = useState(0);
  const [totalOffers, setTotalOffers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [isBestDealsActive, setIsBestDealsActive] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    selectedRetailers: [],
    minDiscount: 0,
    sortBy: 'discount'
  });

  // Compare state
  const [comparedDeals, setComparedDeals] = useState<ProductDeal[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Shopping list state
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load initial storage
  useEffect(() => {
    getSavedLocation().then(loc => setLocation(loc));
    getShoppingList().then(list => setShoppingList(list));
  }, []);

  // Fetch deals whenever location, debouncedQuery, category, or filters change
  const loadDeals = async () => {
    setLoading(true);
    setLoadingStep('Searching nearby supermarkets...');

    try {
      if (isBestDealsActive && !debouncedQuery && !selectedCategory) {
        const results = await fetchBestDeals(location.latitude, location.longitude, location.radiusKm);
        setDeals(results);
        setTotalOffers(results.length);
        setTotalStores(new Set(results.map(r => r.store.id)).size);
      } else {
        setLoadingStep('Aggregating & ranking deals...');
        const res = await fetchOffers({
          lat: location.latitude,
          lng: location.longitude,
          radius: location.radiusKm,
          query: debouncedQuery,
          category: selectedCategory,
          minDiscount: filters.minDiscount,
          sortBy: filters.sortBy,
          retailers: filters.selectedRetailers
        });

        setDeals(res.deals);
        setTotalStores(res.totalStores);
        setTotalOffers(res.totalOffers);
      }
    } catch (err) {
      console.error('Error loading deals:', err);
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  useEffect(() => {
    loadDeals();
    saveLocation(location);
  }, [
    location.latitude,
    location.longitude,
    location.radiusKm,
    debouncedQuery,
    selectedCategory,
    filters.minDiscount,
    filters.sortBy,
    filters.selectedRetailers.join(','),
    isBestDealsActive
  ]);

  const handleToggleCompare = (deal: ProductDeal) => {
    const exists = comparedDeals.some(d => d.id === deal.id);
    if (exists) {
      setComparedDeals(comparedDeals.filter(d => d.id !== deal.id));
    } else {
      if (comparedDeals.length >= 4) {
        alert('You can compare up to 4 products at a time.');
        return;
      }
      setComparedDeals([...comparedDeals, deal]);
      setIsCompareOpen(true);
    }
  };

  const handleAddToList = (productName: string) => {
    const updated: ShoppingListItem[] = [
      ...shoppingList,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: productName,
        quantity: 1,
        checked: true
      }
    ];
    setShoppingList(updated);
    saveShoppingList(updated);
    setIsShoppingListOpen(true);
  };

  const handleUpdateShoppingList = (items: ShoppingListItem[]) => {
    setShoppingList(items);
    saveShoppingList(items);
  };

  const handleTriggerBestDeals = () => {
    setIsBestDealsActive(!isBestDealsActive);
    setSearchQuery('');
    setSelectedCategory(undefined);
  };

  const handleOpenOptions = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open('options.html', '_blank');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenShoppingList={() => setIsShoppingListOpen(true)}
        shoppingListCount={shoppingList.filter(i => i.checked).length}
        compareCount={comparedDeals.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenOptions={handleOpenOptions}
      />

      {/* Location Bar with Autocomplete, Popular Picks & Radius */}
      <LocationPicker location={location} onChange={setLocation} />

      {/* Best Deals Promo Banner */}
      <BestDealsBanner
        onTriggerBestDeals={handleTriggerBestDeals}
        active={isBestDealsActive}
      />

      {/* Search Input Bar */}
      <div className="p-3 bg-white border-b border-slate-100 sticky top-[57px] z-20 shadow-2xs">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products, brands (e.g. Cooking Oil, Dalda, Rice)..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              if (isBestDealsActive) setIsBestDealsActive(false);
            }}
            className="w-full text-xs pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Popular Category Pills */}
      <CategoryChips
        selectedCategory={selectedCategory}
        onSelectCategory={cat => {
          setSelectedCategory(cat);
          if (isBestDealsActive) setIsBestDealsActive(false);
        }}
      />

      {/* Filter and View Bar */}
      <FilterBar
        totalOffers={totalOffers}
        totalStores={totalStores}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        filters={filters}
        onChangeFilters={setFilters}
      />

      {/* Results Container */}
      <main className="flex-1 p-3">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <div className="text-xs font-semibold text-slate-700">{loadingStep || 'Loading deals...'}</div>
            <div className="text-[10px] text-slate-400">Comparing prices across nearby supermarkets</div>
          </div>
        ) : viewMode === 'map' ? (
          <MapView
            location={location}
            deals={deals}
            onSelectStoreDeals={retId => {
              setFilters({ ...filters, selectedRetailers: [retId] });
              setViewMode('list');
            }}
          />
        ) : deals.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
            <div className="text-2xl">🛒</div>
            <h3 className="font-bold text-xs text-slate-800">No active offers found</h3>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              Try increasing your search radius, selecting &quot;All Deals&quot;, or searching for common essentials like &quot;Cooking Oil&quot; or &quot;Milk&quot;.
            </p>
            <button
              onClick={() => {
                setLocation({ ...location, radiusKm: 15 });
                setSearchQuery('');
                setSelectedCategory(undefined);
              }}
              className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Expand Radius to 15 km
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {deals.map(deal => (
              <ProductCard
                key={deal.id}
                deal={deal}
                isCompared={comparedDeals.some(d => d.id === deal.id)}
                onToggleCompare={handleToggleCompare}
                onAddToList={handleAddToList}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals and Drawers */}
      {isCompareOpen && (
        <CompareModal
          comparedDeals={comparedDeals}
          onClose={() => setIsCompareOpen(false)}
          onRemoveDeal={id => setComparedDeals(comparedDeals.filter(d => d.id !== id))}
        />
      )}

      {isShoppingListOpen && (
        <ShoppingListDrawer
          location={location}
          items={shoppingList}
          onClose={() => setIsShoppingListOpen(false)}
          onUpdateItems={handleUpdateShoppingList}
        />
      )}
    </div>
  );
};

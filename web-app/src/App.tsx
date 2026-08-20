import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DealsGrid } from './components/DealsGrid';
import { InteractiveMap } from './components/InteractiveMap';
import { BasketOptimizerModal } from './components/BasketOptimizerModal';
import { CompareDrawer } from './components/CompareDrawer';
import { LocationState, ProductDeal, FilterState, ShoppingListItem } from './types';
import { fetchOffers, fetchBestDeals } from './services/api';
import { Flame, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
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
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState('Just now');

  const [filters, setFilters] = useState<FilterState>({
    selectedRetailers: [],
    minDiscount: 0,
    sortBy: 'discount'
  });

  const [comparedDeals, setComparedDeals] = useState<ProductDeal[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([
    { id: '1', name: 'Cooking Oil 5L', quantity: 1, checked: true },
    { id: '2', name: 'Wheat Atta 10kg', quantity: 1, checked: true },
    { id: '3', name: 'Basmati Rice 5kg', quantity: 1, checked: true },
    { id: '4', name: 'Full Cream Milk 1L', quantity: 6, checked: true }
  ]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadDeals = async (showRefreshSpin = false) => {
    if (showRefreshSpin) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
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
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastRefreshedTime(timeStr);
    } catch (err) {
      console.error('Error fetching deals:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, [
    location.latitude,
    location.longitude,
    location.radiusKm,
    debouncedQuery,
    selectedCategory,
    filters.minDiscount,
    filters.sortBy,
    filters.selectedRetailers.join(',')
  ]);

  const handleRefreshNow = () => {
    loadDeals(true);
  };

  const handleToggleCompare = (deal: ProductDeal) => {
    const exists = comparedDeals.some(d => d.id === deal.id);
    if (exists) {
      setComparedDeals(comparedDeals.filter(d => d.id !== deal.id));
    } else {
      if (comparedDeals.length >= 4) {
        alert('You can compare up to 4 items simultaneously.');
        return;
      }
      setComparedDeals([...comparedDeals, deal]);
      setIsCompareOpen(true);
    }
  };

  const handleAddToList = (productName: string) => {
    if (!shoppingList.some(i => i.name.toLowerCase() === productName.toLowerCase())) {
      setShoppingList([
        ...shoppingList,
        {
          id: Math.random().toString(36).substring(2, 9),
          name: productName,
          quantity: 1,
          checked: true
        }
      ]);
    }
    setIsBasketOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* App Navbar */}
      <Navbar
        location={location}
        onChangeLocation={setLocation}
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
        shoppingListCount={shoppingList.filter(i => i.checked).length}
        compareCount={comparedDeals.length}
        onOpenBasket={() => setIsBasketOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onRefreshNow={handleRefreshNow}
        isRefreshing={isRefreshing}
        lastRefreshedTime={lastRefreshedTime}
      />

      {/* Hero Callout Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white px-4 lg:px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-1">
              📍 Real-Time Discount Radar • Showing all discounted items within {location.radiusKm} km of {location.address}
            </span>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              All Discounted Supermarket Products Near You
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              Browsing all discounted products from Carrefour, Metro, Al-Fatah, Imtiaz, and Jalal Sons. Ranked automatically from highest discount % to lowest.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRefreshNow}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-transform hover:scale-105"
            >
              <Flame className="w-4 h-4 text-orange-600 animate-bounce" />
              <span>🔥 Refresh Live Supermarket Deals</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Split View Layout */}
      <main className="max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Main Column: Deals Grid */}
          <div className="lg:col-span-2 space-y-6">
            <DealsGrid
              deals={deals}
              allDealsCount={deals.length}
              filters={filters}
              onChangeFilters={setFilters}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              comparedIds={comparedDeals.map(d => d.id)}
              onToggleCompare={handleToggleCompare}
              onAddToList={handleAddToList}
            />
          </div>

          {/* Right Column: Live Supermarket Radar Map */}
          <div className="lg:col-span-1">
            <InteractiveMap
              location={location}
              deals={deals}
              onSelectStore={retId => {
                setFilters({ ...filters, selectedRetailers: [retId] });
              }}
            />
          </div>
        </div>
      </main>

      {/* Modals & Overlays */}
      {isBasketOpen && (
        <BasketOptimizerModal
          location={location}
          items={shoppingList}
          onClose={() => setIsBasketOpen(false)}
          onUpdateItems={setShoppingList}
        />
      )}

      {isCompareOpen && (
        <CompareDrawer
          comparedDeals={comparedDeals}
          onClose={() => setIsCompareOpen(false)}
          onRemoveDeal={id => setComparedDeals(comparedDeals.filter(d => d.id !== id))}
        />
      )}
    </div>
  );
};

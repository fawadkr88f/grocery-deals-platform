import React, { useState } from 'react';
import { Navigation, ShoppingBag } from 'lucide-react';
import { LocationState, ProductDeal } from '../types';

interface MapViewProps {
  location: LocationState;
  deals: ProductDeal[];
  onSelectStoreDeals?: (retailerId: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  location,
  deals,
  onSelectStoreDeals
}) => {
  // Aggregate unique stores from deals
  const uniqueStoresMap = new Map<string, {
    id: string;
    retailerId: string;
    name: string;
    branch?: string;
    distanceKm: number;
    latitude: number;
    longitude: number;
    dealsCount: number;
    topDeal: ProductDeal;
  }>();

  for (const deal of deals) {
    const s = deal.store;
    if (!uniqueStoresMap.has(s.id)) {
      uniqueStoresMap.set(s.id, {
        id: s.id,
        retailerId: s.retailerId,
        name: s.name,
        branch: s.branch,
        distanceKm: s.distanceKm,
        latitude: s.latitude,
        longitude: s.longitude,
        dealsCount: 1,
        topDeal: deal
      });
    } else {
      const entry = uniqueStoresMap.get(s.id)!;
      entry.dealsCount += 1;
    }
  }

  const stores = Array.from(uniqueStoresMap.values());
  const [selectedStore, setSelectedStore] = useState<typeof stores[0] | null>(stores[0] || null);

  // Compute relative SVG coordinates based on lat/lng offsets from user
  const mapCenter = { lat: location.latitude, lng: location.longitude };
  const scale = 300 / (location.radiusKm * 0.02 || 0.2); // scaling factor

  return (
    <div className="p-4 bg-slate-100 flex flex-col gap-3">
      {/* Visual Canvas Map */}
      <div className="relative w-full h-56 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        {/* Map grid lines / radar effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        
        {/* Radius Circle */}
        <div className="absolute w-44 h-44 rounded-full border border-emerald-500/30 bg-emerald-500/5 animate-pulse" />
        <div className="absolute w-24 h-24 rounded-full border border-emerald-500/40" />

        {/* User Marker (Center) */}
        <div className="absolute flex flex-col items-center z-20">
          <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center animate-ping opacity-75" />
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-lg absolute" />
          <span className="text-[9px] font-bold text-emerald-400 bg-slate-950/80 px-1.5 py-0.2 rounded mt-4 border border-emerald-500/30">
            You ({location.address.split(',')[0]})
          </span>
        </div>

        {/* Store Markers plotted by spatial offset */}
        {stores.map((st) => {
          const dLat = st.latitude - mapCenter.lat;
          const dLng = st.longitude - mapCenter.lng;
          
          // Clamp offsets to keep inside the map container
          const offsetX = Math.max(-120, Math.min(120, dLng * scale));
          const offsetY = Math.max(-90, Math.min(90, -dLat * scale));

          const isSelected = selectedStore?.id === st.id;

          return (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStore(st);
                if (onSelectStoreDeals) {
                  onSelectStoreDeals(st.retailerId);
                }
              }}
              style={{
                transform: `translate(${offsetX}px, ${offsetY}px)`
              }}
              className={`absolute z-10 flex flex-col items-center transition-transform hover:scale-110 ${
                isSelected ? 'z-30 scale-110' : ''
              }`}
            >
              <div
                className={`px-1.5 py-0.5 rounded-md font-bold text-[10px] shadow-md flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 ring-2 ring-white'
                    : 'bg-white text-slate-900 border border-slate-300'
                }`}
              >
                <ShoppingBag className="w-2.5 h-2.5 text-emerald-600" />
                <span className="truncate max-w-[65px]">{st.name.split(' ')[0]}</span>
              </div>
              <span className="text-[8px] font-semibold text-slate-300 bg-slate-900/90 px-1 rounded mt-0.5">
                {st.distanceKm.toFixed(1)} km
              </span>
            </button>
          );
        })}

        {/* Map Legend */}
        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs px-2 py-1 rounded text-[10px] text-slate-400 border border-slate-800">
          📍 {location.radiusKm} km radius • {stores.length} supermarkets
        </div>
      </div>

      {/* Selected Store Card */}
      {selectedStore && (
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm animate-in fade-in duration-150">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-xs text-slate-900">{selectedStore.name}</h4>
              <p className="text-[11px] text-slate-500">{selectedStore.branch}</p>
              <p className="text-[10px] font-semibold text-emerald-700 mt-0.5">
                📍 {selectedStore.distanceKm.toFixed(1)} km from your location • {selectedStore.dealsCount} active offers
              </p>
            </div>

            <button
              onClick={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedStore.latitude},${selectedStore.longitude}`;
                window.open(url, '_blank');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors"
            >
              <Navigation className="w-3 h-3" />
              <span>Directions</span>
            </button>
          </div>

          {/* Top Deal Preview */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-600 text-[11px] truncate mr-2">
              Top: <strong className="text-slate-900">{selectedStore.topDeal.product.name}</strong>
            </span>
            <span className="font-extrabold text-emerald-700 shrink-0">
              {selectedStore.topDeal.pricing.currency} {selectedStore.topDeal.pricing.salePrice.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

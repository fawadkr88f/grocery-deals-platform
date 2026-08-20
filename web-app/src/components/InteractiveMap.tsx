import React, { useState } from 'react';
import { ShoppingBag, Navigation } from 'lucide-react';
import { LocationState, ProductDeal } from '../types';

interface InteractiveMapProps {
  location: LocationState;
  deals: ProductDeal[];
  onSelectStore: (retId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  location,
  deals,
  onSelectStore
}) => {
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
      uniqueStoresMap.get(s.id)!.dealsCount += 1;
    }
  }

  const stores = Array.from(uniqueStoresMap.values());
  const [selectedStore, setSelectedStore] = useState<typeof stores[0] | null>(stores[0] || null);

  const mapCenter = { lat: location.latitude, lng: location.longitude };
  const scale = 360 / (location.radiusKm * 0.02 || 0.2);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 text-white shadow-xl space-y-4 sticky top-24">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Live Store Radar</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </h3>
          <p className="text-[11px] text-slate-400">
            {stores.length} Supermarkets found in {location.radiusKm} km radius
          </p>
        </div>
      </div>

      {/* Radar Map Canvas */}
      <div className="relative w-full h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />

        {/* Dynamic Radius Rings */}
        <div className="absolute w-56 h-56 rounded-full border border-emerald-500/30 bg-emerald-500/5 animate-pulse" />
        <div className="absolute w-36 h-36 rounded-full border border-emerald-500/40" />

        {/* User Location Center Pin */}
        <div className="absolute flex flex-col items-center z-20">
          <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center animate-ping opacity-75" />
          <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg absolute" />
          <span className="text-[9px] font-bold text-emerald-300 bg-slate-950/90 px-2 py-0.5 rounded-md mt-5 border border-emerald-500/30">
            You ({location.address.split(',')[0]})
          </span>
        </div>

        {/* Supermarket Markers */}
        {stores.map(st => {
          const dLat = st.latitude - mapCenter.lat;
          const dLng = st.longitude - mapCenter.lng;
          const offsetX = Math.max(-140, Math.min(140, dLng * scale));
          const offsetY = Math.max(-110, Math.min(110, -dLat * scale));
          const isSelected = selectedStore?.id === st.id;

          return (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStore(st);
                onSelectStore(st.retailerId);
              }}
              style={{
                transform: `translate(${offsetX}px, ${offsetY}px)`
              }}
              className={`absolute z-10 flex flex-col items-center transition-transform hover:scale-110 ${
                isSelected ? 'z-30 scale-110' : ''
              }`}
            >
              <div
                className={`px-2 py-1 rounded-lg font-extrabold text-[10px] shadow-lg flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-white'
                    : 'bg-white text-slate-900'
                }`}
              >
                <ShoppingBag className="w-3 h-3 text-emerald-600" />
                <span className="truncate max-w-[80px]">{st.name.split(' ')[0]}</span>
              </div>
              <span className="text-[9px] font-bold text-slate-300 bg-slate-900/90 px-1.5 rounded mt-0.5 border border-slate-800">
                {st.distanceKm.toFixed(1)} km
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Store Information Card */}
      {selectedStore && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-extrabold text-sm text-white">{selectedStore.name}</h4>
              <p className="text-xs text-slate-400">{selectedStore.branch}</p>
              <p className="text-xs font-semibold text-emerald-400 mt-1">
                📍 {selectedStore.distanceKm.toFixed(1)} km away • {selectedStore.dealsCount} active deals
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.latitude},${selectedStore.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Route</span>
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 truncate mr-2">
              Top: <strong className="text-white">{selectedStore.topDeal.product.name}</strong>
            </span>
            <span className="font-black text-emerald-400 shrink-0">
              Rs. {selectedStore.topDeal.pricing.salePrice.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, MapPin, Navigation, Search, Sparkles, ListOrdered, ChevronDown, RotateCw } from 'lucide-react';
import { LocationState } from '../types';
import { searchLocations } from '../services/api';
import { FALLBACK_LOCATIONS } from '../services/fallbackData';

interface NavbarProps {
  location: LocationState;
  onChangeLocation: (loc: LocationState) => void;
  searchQuery: string;
  onChangeSearch: (q: string) => void;
  shoppingListCount: number;
  compareCount: number;
  onOpenBasket: () => void;
  onOpenCompare: () => void;
  onRefreshNow: () => void;
  isRefreshing: boolean;
  lastRefreshedTime: string;
}

const RADIUS_OPTIONS = [1, 2, 5, 10, 15, 25];

export const Navbar: React.FC<NavbarProps> = ({
  location,
  onChangeLocation,
  searchQuery,
  onChangeSearch,
  shoppingListCount,
  compareCount,
  onOpenBasket,
  onOpenCompare,
  onRefreshNow,
  isRefreshing,
  lastRefreshedTime
}) => {
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);
  const [locInput, setLocInput] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>(FALLBACK_LOCATIONS.slice(0, 6));
  const [gpsLoading, setGpsLoading] = useState(false);
  const locRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(e.target as Node)) {
        setIsLocDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleSearchLoc = async (val: string) => {
    setLocInput(val);
    if (!val.trim()) {
      setSuggestions(FALLBACK_LOCATIONS.slice(0, 6));
      return;
    }
    const res = await searchLocations(val);
    setSuggestions(res);
  };

  const handleSelectLoc = (item: any) => {
    onChangeLocation({
      ...location,
      address: item.address,
      latitude: item.latitude,
      longitude: item.longitude
    });
    setIsLocDropdownOpen(false);
    setLocInput('');
  };

  const handleUseGPS = () => {
    if ('geolocation' in navigator) {
      setGpsLoading(true);
      navigator.geolocation.getCurrentPosition(
        pos => {
          setGpsLoading(false);
          onChangeLocation({
            ...location,
            address: 'My GPS Location',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setIsLocDropdownOpen(false);
        },
        () => {
          setGpsLoading(false);
          onChangeLocation({
            ...location,
            address: 'DHA Phase 6, Lahore',
            latitude: 31.4697,
            longitude: 74.4107
          });
          setIsLocDropdownOpen(false);
        }
      );
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Location Picker */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight leading-none text-white">
                  Grocery Deals
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live Radar
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-none mt-1">
                Updated {lastRefreshedTime}
              </p>
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="relative" ref={locRef}>
            <button
              onClick={() => setIsLocDropdownOpen(!isLocDropdownOpen)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-xs transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-bold truncate max-w-[140px]">{location.address}</span>
              <span className="text-[11px] text-emerald-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded">
                {location.radiusKm} km
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isLocDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">Change Location</span>
                  <button
                    onClick={handleUseGPS}
                    disabled={gpsLoading}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <Navigation className={`w-3 h-3 ${gpsLoading ? 'animate-spin' : ''}`} />
                    <span>{gpsLoading ? 'Locating...' : 'Use GPS'}</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search address (DHA, Gulberg, Frankfurt)..."
                  value={locInput}
                  onChange={e => handleSearchLoc(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 font-medium"
                />

                <div className="max-h-48 overflow-y-auto space-y-1">
                  {suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectLoc(sug)}
                      className="w-full text-left p-2 hover:bg-emerald-50 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-800 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <div>{sug.address}</div>
                        <div className="text-[10px] text-slate-500">{sug.city}, {sug.country}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Radius Buttons */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Radius:</span>
                  <div className="flex items-center gap-1">
                    {RADIUS_OPTIONS.map(r => (
                      <button
                        key={r}
                        onClick={() => onChangeLocation({ ...location, radiusKm: r })}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          location.radiusKm === r
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {r}k
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Optional Search Bar */}
        <div className="flex-1 max-w-lg w-full">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter current discount catalog (or leave blank for all discounts)..."
              value={searchQuery}
              onChange={e => onChangeSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-slate-800 text-white placeholder-slate-400 font-medium transition-all"
            />
          </div>
        </div>

        {/* Action Buttons: Refresh Now + Compare + Smart Basket */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Refresh Now Button */}
          <button
            onClick={onRefreshNow}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs px-3.5 py-2 rounded-xl transition-all font-bold shadow-xs active:scale-95"
            title="Force refresh store prices right now"
          >
            <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Now'}</span>
          </button>

          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 text-xs px-3 py-2 rounded-xl transition-colors font-bold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Compare ({compareCount})</span>
            </button>
          )}

          <button
            onClick={onOpenBasket}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-950/40 transition-all"
          >
            <ListOrdered className="w-4 h-4" />
            <span>Smart Basket</span>
            {shoppingListCount > 0 && (
              <span className="w-5 h-5 bg-white text-emerald-800 rounded-full text-[11px] font-black flex items-center justify-center ml-1">
                {shoppingListCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

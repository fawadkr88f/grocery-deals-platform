import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ChevronDown, Search, Check } from 'lucide-react';
import { LocationState } from '../types';
import { searchLocations } from '../services/api';
import { FALLBACK_LOCATIONS } from '../services/fallbackData';

interface LocationPickerProps {
  location: LocationState;
  onChange: (loc: LocationState) => void;
}

const RADIUS_OPTIONS = [1, 2, 5, 10, 15, 25];

export const LocationPicker: React.FC<LocationPickerProps> = ({ location, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>(FALLBACK_LOCATIONS.slice(0, 6));
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setSuggestions(FALLBACK_LOCATIONS.slice(0, 6));
      return;
    }
    setLoading(true);
    const results = await searchLocations(val);
    setSuggestions(results);
    setLoading(false);
  };

  const handleSelectLocation = (item: any) => {
    onChange({
      ...location,
      address: item.address,
      latitude: item.latitude,
      longitude: item.longitude
    });
    setIsOpen(false);
    setQuery('');
  };

  const handleSubmitCustomAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if we have a top match
    if (suggestions.length > 0) {
      handleSelectLocation(suggestions[0]);
    } else {
      onChange({
        ...location,
        address: query.trim(),
        latitude: 31.4697,
        longitude: 74.4107
      });
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setGpsLoading(true);
      navigator.geolocation.getCurrentPosition(
        pos => {
          setGpsLoading(false);
          onChange({
            ...location,
            address: 'Current GPS Location',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setIsOpen(false);
        },
        err => {
          setGpsLoading(false);
          console.warn('Geolocation fallback:', err);
          onChange({
            ...location,
            address: 'DHA Phase 6, Lahore',
            latitude: 31.4697,
            longitude: 74.4107
          });
          setIsOpen(false);
        },
        { timeout: 4000 }
      );
    }
  };

  return (
    <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800" ref={dropdownRef}>
      {/* Current Address Display Row */}
      <div className="flex items-center justify-between gap-2 relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setSuggestions(FALLBACK_LOCATIONS.slice(0, 6));
            }
          }}
          className="flex items-center gap-2 text-left flex-1 hover:opacity-90 transition-opacity truncate group"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Search Location (Click to change)
            </div>
            <div className="text-xs font-semibold text-white truncate flex items-center gap-1">
              <span className="truncate">{location.address}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>
        </button>

        <button
          onClick={handleUseCurrentLocation}
          disabled={gpsLoading}
          className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-2.5 py-1 rounded-lg transition-colors shrink-0"
          title="Use GPS Location"
        >
          <Navigation className={`w-3 h-3 ${gpsLoading ? 'animate-spin' : ''}`} />
          <span>{gpsLoading ? 'Locating...' : 'GPS'}</span>
        </button>
      </div>

      {/* Autocomplete & Popular Locations Dropdown */}
      {isOpen && (
        <div className="absolute left-4 right-4 top-14 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden p-3 animate-in fade-in zoom-in-95 duration-150">
          <form onSubmit={handleSubmitCustomAddress} className="relative mb-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Type any address or city and press Enter..."
              value={query}
              onChange={e => handleSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              autoFocus
            />
            {query && (
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2 py-1 rounded-lg transition-colors"
              >
                Apply
              </button>
            )}
          </form>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1">
            {query ? 'Matching Locations' : 'Popular / Quick Locations'}
          </div>

          <div className="max-h-52 overflow-y-auto space-y-1">
            {loading && <div className="text-xs text-slate-400 p-2">Searching locations...</div>}
            {!loading && suggestions.length === 0 && query.length >= 2 && (
              <button
                onClick={() => {
                  onChange({
                    ...location,
                    address: query.trim(),
                    latitude: 31.4697,
                    longitude: 74.4107
                  });
                  setIsOpen(false);
                  setQuery('');
                }}
                className="w-full text-left p-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-semibold"
              >
                <span>Use &quot;{query}&quot;</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            )}
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectLocation(item)}
                className="w-full text-left p-2 hover:bg-slate-100 rounded-xl flex items-start gap-2.5 transition-colors group"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MapPin className="w-3 h-3" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-800 truncate">{item.address}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {item.city}, {item.country}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Radius Selector Pills */}
      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap mr-1">
          Radius:
        </span>
        <div className="flex items-center gap-1">
          {RADIUS_OPTIONS.map(r => (
            <button
              key={r}
              onClick={() => onChange({ ...location, radiusKm: r })}
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                location.radiusKm === r
                  ? 'bg-emerald-500 text-white font-semibold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Shield, Trash2, CheckCircle2, Bell, MapPin } from 'lucide-react';
import { LocationState } from '../types';
import { getSavedLocation, saveLocation } from '../services/storage';

export const Options: React.FC = () => {
  const [location, setLocation] = useState<LocationState>({
    address: 'DHA Phase 6, Lahore',
    latitude: 31.4697,
    longitude: 74.4107,
    radiusKm: 10
  });
  const [currency, setCurrency] = useState('PKR');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getSavedLocation().then(loc => setLocation(loc));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveLocation(location);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearData = async () => {
    if (confirm('Are you sure you want to clear all stored locations and shopping list history?')) {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        await chrome.storage.local.clear();
      } else {
        localStorage.clear();
      }
      alert('All local cache and storage cleared successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
          🛒
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Grocery Deals Settings</h1>
          <p className="text-xs text-slate-500">
            Configure default locations, international currencies, and privacy preferences
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-6 space-y-6">
        {/* Default Location Section */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Default Search Location</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Home / Primary Address
            </label>
            <input
              type="text"
              value={location.address}
              onChange={e => setLocation({ ...location, address: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. DHA Phase 6, Lahore or Frankfurt am Main"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Default Radius (km)
              </label>
              <select
                value={location.radiusKm}
                onChange={e => setLocation({ ...location, radiusKm: parseInt(e.target.value, 10) })}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {[1, 2, 5, 10, 15, 25].map(r => (
                  <option key={r} value={r}>
                    {r} km
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Market / Currency
              </label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="PKR">Pakistan (PKR - Rs.)</option>
                <option value="EUR">Germany / EU (EUR - €)</option>
                <option value="GBP">United Kingdom (GBP - £)</option>
                <option value="USD">United States (USD - $)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications & Preferences */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Bell className="w-4 h-4 text-emerald-600" />
            <span>Deal Alerts & Notifications</span>
          </div>

          <label className="flex items-center justify-between cursor-pointer py-1">
            <div>
              <div className="text-xs font-semibold text-slate-800">Price Drop Notifications</div>
              <div className="text-[11px] text-slate-500">
                Notify me when key essentials (Cooking Oil, Milk, Rice) get discounted by over 20%
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={e => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
          </label>
        </div>

        {/* Privacy & Data Management */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Privacy & Storage Controls</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Grocery Deals does not track your browsing history or sell location data. All shopping lists and saved addresses remain stored inside your browser extension.
          </p>

          <button
            type="button"
            onClick={handleClearData}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg font-bold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Stored Data & Location History</span>
          </button>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            Save Preferences
          </button>

          {savedSuccess && (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Settings saved successfully!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

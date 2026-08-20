import React from 'react';
import { Store } from '../types';
import { Navigation } from 'lucide-react';

interface StoresPageProps {
  stores: Store[];
}

export const StoresPage: React.FC<StoresPageProps> = ({ stores }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Physical Store Locations & Geocoding</h2>
          <p className="text-xs text-slate-400">
            Registered physical branches with latitude/longitude spatial coordinates
          </p>
        </div>
        <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
          {stores.length} Registered Stores
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Supermarket & Branch</th>
                <th className="py-3 px-4">Physical Address</th>
                <th className="py-3 px-4">City / Country</th>
                <th className="py-3 px-4">Coordinates (Lat, Lng)</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Map</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {stores.map(store => (
                <tr key={store.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{store.retailerName}</div>
                    <div className="text-[11px] text-slate-400">{store.branchName}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-slate-300 max-w-xs truncate">
                    {store.address}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-medium">
                      {store.city}, {store.country}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-emerald-400">
                    {store.latitude.toFixed(4)}, {store.longitude.toFixed(4)}
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-slate-400">
                    {store.phone || 'N/A'}
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 p-1 rounded-md inline-flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

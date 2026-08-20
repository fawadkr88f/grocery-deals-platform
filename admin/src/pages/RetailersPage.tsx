import React from 'react';
import { Retailer } from '../types';
import { ExternalLink, CheckCircle2, RefreshCw } from 'lucide-react';

interface RetailersPageProps {
  retailers: Retailer[];
  onSync: (id: string) => void;
}

export const RetailersPage: React.FC<RetailersPageProps> = ({ retailers, onSync }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Configured Retailer Providers</h2>
          <p className="text-xs text-slate-400">
            Active supermarket chains connected to the ingestion engine
          </p>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
          {retailers.length} Providers Operational
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {retailers.map(ret => (
          <div
            key={ret.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  {ret.country} • {ret.currency}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{ret.name}</h3>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>{ret.status}</span>
              </span>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div>
                Provider ID: <code className="text-slate-300 font-mono text-[11px]">{ret.id}</code>
              </div>
              <div>
                Last Ingested: <span className="text-slate-300">{new Date(ret.lastSync).toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <a
                href={ret.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => onSync(ret.id)}
                className="bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

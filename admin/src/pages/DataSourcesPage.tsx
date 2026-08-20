import React from 'react';
import { DataSource } from '../types';
import { Database, CheckCircle2, RefreshCw } from 'lucide-react';

interface DataSourcesPageProps {
  sources: DataSource[];
  onSync: (id: string) => void;
}

export const DataSourcesPage: React.FC<DataSourcesPageProps> = ({ sources, onSync }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Data Ingestion Feeds & Health</h2>
          <p className="text-xs text-slate-400">
            Monitoring data feeds, weekly catalog flyers, and synchronization status
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map(src => (
          <div
            key={src.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{src.retailerName}</h3>
                  <p className="text-[11px] text-slate-400">{src.feedType}</p>
                </div>
              </div>

              <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>{src.status}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-500 block">Last Sync</span>
                <span className="font-semibold text-slate-300">
                  {new Date(src.lastSync).toLocaleTimeString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Errors / 24h</span>
                <span className="font-semibold text-emerald-400">0 Failures</span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => onSync(src.providerId)}
                className="bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync Feed</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

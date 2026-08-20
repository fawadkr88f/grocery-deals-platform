import React from 'react';
import { Store, Database, Radio, RefreshCw } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onSyncAll: () => void;
  syncing: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onSyncAll,
  syncing
}) => {
  const navItems = [
    { id: 'retailers', label: 'Supermarkets & Retailers', icon: Store },
    { id: 'stores', label: 'Physical Store Branches', icon: Radio },
    { id: 'sources', label: 'Feeds & Ingestion Sync', icon: Database }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 min-h-screen">
      <div className="space-y-6">
        {/* App Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/50">
            🛒
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-tight leading-none">
              Price Intelligence
            </h1>
            <span className="text-[10px] font-semibold text-emerald-400">
              Admin & Ingestion Console
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sync trigger */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <button
          onClick={onSyncAll}
          disabled={syncing}
          className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 hover:text-emerald-300 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing Feeds...' : 'Sync All Providers'}</span>
        </button>

        <div className="text-[11px] text-slate-500 text-center">
          v1.0.0 • Manifest V3 Platform
        </div>
      </div>
    </aside>
  );
};

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { RetailersPage } from './pages/RetailersPage';
import { StoresPage } from './pages/StoresPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { fetchAdminRetailers, fetchAdminStores, fetchAdminSources, triggerProviderSync } from './services/api';
import { Retailer, Store, DataSource } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('retailers');
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [sources, setSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [rets, sts, srcs] = await Promise.all([
      fetchAdminRetailers(),
      fetchAdminStores(),
      fetchAdminSources()
    ]);
    setRetailers(rets);
    setStores(sts);
    setSources(srcs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSync = async (providerId?: string) => {
    setSyncing(true);
    await triggerProviderSync(providerId);
    await loadData();
    setSyncing(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSyncAll={() => handleSync()}
        syncing={syncing}
      />

      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading admin console data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'retailers' && (
              <RetailersPage retailers={retailers} onSync={id => handleSync(id)} />
            )}
            {activeTab === 'stores' && <StoresPage stores={stores} />}
            {activeTab === 'sources' && (
              <DataSourcesPage sources={sources} onSync={id => handleSync(id)} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

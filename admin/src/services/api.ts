const API_BASE = 'http://localhost:4000/api';

export async function fetchAdminRetailers() {
  try {
    const res = await fetch(`${API_BASE}/admin/retailers`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching retailers:', err);
    return [];
  }
}

export async function fetchAdminStores() {
  try {
    const res = await fetch(`${API_BASE}/admin/stores`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching stores:', err);
    return [];
  }
}

export async function fetchAdminSources() {
  try {
    const res = await fetch(`${API_BASE}/admin/sources`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching data sources:', err);
    return [];
  }
}

export async function triggerProviderSync(providerId?: string) {
  try {
    const res = await fetch(`${API_BASE}/admin/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId })
    });
    return await res.json();
  } catch (err) {
    console.error('Error triggering sync:', err);
    return { success: false };
  }
}

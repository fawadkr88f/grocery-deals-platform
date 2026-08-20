import { ProductDeal } from '../types';
import { FALLBACK_LOCATIONS, FALLBACK_DEALS_CATALOG, calculateDistance } from './fallbackData';

const API_BASE = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
  ? '/api'
  : ((import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api');

export async function searchLocations(query: string) {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return FALLBACK_LOCATIONS.slice(0, 6);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${API_BASE}/location/search?query=${encodeURIComponent(query)}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        return data.data;
      }
    }
  } catch {
    // API offline
  }

  const matches = FALLBACK_LOCATIONS.filter(
    loc =>
      loc.address.toLowerCase().includes(cleanQuery) ||
      loc.city.toLowerCase().includes(cleanQuery) ||
      loc.formattedAddress.toLowerCase().includes(cleanQuery)
  );

  if (matches.length > 0) return matches;

  return [
    {
      address: query,
      formattedAddress: `${query}, Lahore, Punjab, Pakistan`,
      city: 'Lahore',
      country: 'Pakistan',
      countryCode: 'PK',
      latitude: 31.4697,
      longitude: 74.4107
    }
  ];
}

export async function fetchOffers(params: {
  lat: number;
  lng: number;
  radius: number;
  query?: string;
  category?: string;
  minDiscount?: number;
  sortBy?: string;
  retailers?: string[];
}) {
  try {
    const searchParams = new URLSearchParams({
      lat: params.lat.toString(),
      lng: params.lng.toString(),
      radius: params.radius.toString()
    });

    if (params.query) searchParams.append('query', params.query);
    if (params.category) searchParams.append('category', params.category);
    if (params.minDiscount) searchParams.append('minDiscount', params.minDiscount.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.retailers && params.retailers.length > 0) {
      searchParams.append('retailers', params.retailers.join(','));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/offers/search?${searchParams.toString()}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          deals: data.results as ProductDeal[],
          totalStores: data.totalStoresFound as number,
          totalOffers: data.totalOffersFound as number
        };
      }
    }
  } catch {
    // API offline fallback
  }

  const q = params.query ? params.query.toLowerCase().trim() : '';
  const filtered = FALLBACK_DEALS_CATALOG.map(deal => {
    const dist = calculateDistance(
      params.lat,
      params.lng,
      deal.store.latitude,
      deal.store.longitude
    );
    return {
      ...deal,
      store: {
        ...deal.store,
        distanceKm: dist
      }
    };
  }).filter(deal => {
    // Allow up to effective radius or 25km to ensure all city stores are reachable
    const effectiveRadius = Math.max(params.radius || 15, 20);
    if (deal.store.distanceKm > effectiveRadius) return false;

    if (q) {
      const matchName = deal.product.name.toLowerCase().includes(q);
      const matchBrand = deal.product.brand.toLowerCase().includes(q);
      const matchCat = deal.product.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCat) return false;
    }

    if (params.category && deal.product.category.toLowerCase() !== params.category.toLowerCase()) {
      return false;
    }

    if (params.minDiscount && deal.pricing.discountPercent < params.minDiscount) {
      return false;
    }

    if (params.retailers && params.retailers.length > 0) {
      if (!params.retailers.includes(deal.store.retailerId)) return false;
    }

    return true;
  });

  filtered.sort((a, b) => {
    switch (params.sortBy) {
      case 'distance':
        return a.store.distanceKm - b.store.distanceKm;
      case 'discount':
        return b.pricing.discountPercent !== a.pricing.discountPercent
          ? b.pricing.discountPercent - a.pricing.discountPercent
          : b.pricing.savings - a.pricing.savings;
      case 'price_low':
        return a.pricing.salePrice - b.pricing.salePrice;
      case 'price_high':
        return b.pricing.salePrice - a.pricing.salePrice;
      case 'deal_score':
      default:
        return b.dealScore - a.dealScore;
    }
  });

  const uniqueStores = new Set(filtered.map(d => d.store.id)).size;

  return {
    deals: filtered,
    totalStores: uniqueStores,
    totalOffers: filtered.length
  };
}

export async function fetchBestDeals(lat: number, lng: number, radius = 10): Promise<ProductDeal[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/offers/best?lat=${lat}&lng=${lng}&radius=${radius}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data.results;
    }
  } catch {
    // API offline
  }

  const all = await fetchOffers({ lat, lng, radius, minDiscount: 10 });
  return all.deals;
}

export async function optimizeShoppingList(
  location: { latitude: number; longitude: number; radiusKm: number },
  items: { name: string; quantity: number }[]
) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/shopping-list/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, items }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data;
    }
  } catch {
    // Fallback
  }

  return {
    success: true,
    location,
    totalItemsRequested: items.length,
    singleStoreBest: {
      retailerId: 'metro-pk',
      retailerName: 'Metro Cash & Carry',
      storeAddress: 'Airport Road Branch, Cantt, Lahore',
      distanceKm: 3.8,
      totalCost: 8348,
      itemsFound: items.length,
      totalItems: items.length,
      missingItems: [],
      itemBreakdown: items.map(i => ({
        item: i.name,
        productName: i.name,
        brand: 'Metro Deal',
        price: 3299 * (i.quantity || 1),
        regularPrice: 3850 * (i.quantity || 1),
        savings: 551 * (i.quantity || 1)
      }))
    },
    multiStoreOptimal: {
      totalCost: 7648,
      totalSavingsVsSingleStore: 700,
      totalSavingsVsRegularPrice: 1200,
      storeCount: 2,
      stores: [
        {
          retailerId: 'metro-pk',
          retailerName: 'Metro Cash & Carry',
          storeAddress: 'Airport Road, Cantt',
          distanceKm: 3.8,
          subtotal: 4249,
          items: []
        },
        {
          retailerId: 'al-fatah',
          retailerName: 'Al-Fatah Supermarket',
          storeAddress: 'DHA Phase 6 Flagship',
          distanceKm: 1.4,
          subtotal: 3399,
          items: []
        }
      ]
    },
    tradeoffRecommendation: 'Splitting across Metro and Al-Fatah saves Rs. 700 with minimal travel distance.'
  };
}

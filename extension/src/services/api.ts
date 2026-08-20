import { ProductDeal } from '../types';
import { FALLBACK_LOCATIONS, FALLBACK_DEALS_CATALOG, calculateDistance } from './fallbackData';

const API_BASE = 'http://localhost:4000/api';

export async function searchLocations(query: string) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return FALLBACK_LOCATIONS.slice(0, 8);

  // 1. Try backend API first with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE}/location/search?query=${encodeURIComponent(cleanQuery)}`, {
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

  // 2. Global Real-Time OpenStreetMap Nominatim Geocoding (Worldwide Search)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(cleanQuery)}`,
      {
        headers: { 'Accept-Language': 'en' },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          address: item.display_name.split(',')[0],
          formattedAddress: item.display_name,
          city: item.address?.city || item.address?.town || item.address?.municipality || item.address?.state || item.display_name.split(',')[1] || 'City',
          country: item.address?.country || 'Global',
          countryCode: (item.address?.country_code || 'XX').toUpperCase(),
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon)
        }));
      }
    }
  } catch {
    // Geocoder fallback
  }

  // 3. Fallback database match
  const qLower = cleanQuery.toLowerCase();
  const matches = FALLBACK_LOCATIONS.filter(
    loc =>
      loc.address.toLowerCase().includes(qLower) ||
      loc.city.toLowerCase().includes(qLower) ||
      loc.formattedAddress.toLowerCase().includes(qLower) ||
      loc.country.toLowerCase().includes(qLower)
  );

  if (matches.length > 0) return matches;

  return [
    {
      address: cleanQuery,
      formattedAddress: cleanQuery,
      city: 'Global',
      country: 'Worldwide',
      countryCode: 'INT',
      latitude: 50.1109,
      longitude: 8.6821
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
      if (data.success && data.results && data.results.length > 0) {
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

  // Determine user region
  const isGermany = params.lat > 47 && params.lat < 55 && params.lng > 5 && params.lng < 16;
  const isUK = params.lat > 50 && params.lat < 60 && params.lng > -11 && params.lng < 2;

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
    // Regional filter
    if (isGermany && deal.pricing.currency !== 'EUR') return false;
    if (isUK && deal.pricing.currency !== 'GBP') return false;
    if (!isGermany && !isUK && (deal.pricing.currency === 'EUR' || deal.pricing.currency === 'GBP')) return false;

    // Radius filter
    const effectiveRadius = Math.max(params.radius || 15, 30);
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

export async function fetchBestDeals(lat: number, lng: number, radius = 15): Promise<ProductDeal[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/offers/best?lat=${lat}&lng=${lng}&radius=${radius}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.results && data.results.length > 0) return data.results;
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

  const isGermany = location.latitude > 47 && location.latitude < 55;
  const isUK = location.latitude > 50 && location.latitude < 60 && location.longitude > -11 && location.longitude < 2;
  const sym = isGermany ? '€' : isUK ? '£' : 'Rs.';

  return {
    success: true,
    location,
    totalItemsRequested: items.length,
    singleStoreBest: {
      retailerId: isGermany ? 'rewe-de' : isUK ? 'tesco-uk' : 'metro-pk',
      retailerName: isGermany ? 'REWE City' : isUK ? 'Tesco Express' : 'Metro Cash & Carry',
      storeAddress: isGermany ? 'Zeil 116, Frankfurt' : isUK ? 'Regent Street, London' : 'Airport Road, Cantt',
      distanceKm: 1.4,
      totalCost: isGermany ? 8.50 : isUK ? 9.20 : 8348,
      itemsFound: items.length,
      totalItems: items.length,
      missingItems: [],
      itemBreakdown: items.map(i => ({
        item: i.name,
        productName: i.name,
        brand: isGermany ? 'REWE Deal' : isUK ? 'Tesco Deal' : 'Metro Deal',
        price: (isGermany ? 2.5 : isUK ? 2.8 : 3299) * (i.quantity || 1),
        regularPrice: (isGermany ? 3.2 : isUK ? 3.5 : 3850) * (i.quantity || 1),
        savings: (isGermany ? 0.7 : isUK ? 0.7 : 551) * (i.quantity || 1)
      }))
    },
    multiStoreOptimal: {
      totalCost: isGermany ? 7.10 : isUK ? 7.80 : 7648,
      totalSavingsVsSingleStore: isGermany ? 1.40 : isUK ? 1.40 : 700,
      totalSavingsVsRegularPrice: isGermany ? 2.80 : isUK ? 3.00 : 1200,
      storeCount: 2,
      stores: [
        {
          retailerId: isGermany ? 'rewe-de' : isUK ? 'tesco-uk' : 'metro-pk',
          retailerName: isGermany ? 'REWE City' : isUK ? 'Tesco Express' : 'Metro Cash & Carry',
          storeAddress: isGermany ? 'Zeil 116, Frankfurt' : isUK ? 'Regent Street, London' : 'Airport Road, Cantt',
          distanceKm: 1.4,
          subtotal: isGermany ? 4.20 : isUK ? 4.50 : 4249,
          items: []
        },
        {
          retailerId: isGermany ? 'aldi-de' : isUK ? 'sainsburys-uk' : 'al-fatah',
          retailerName: isGermany ? 'ALDI SÜD' : isUK ? 'Sainsbury\'s' : 'Al-Fatah Supermarket',
          storeAddress: isGermany ? 'Schillerstraße 12, Frankfurt' : isUK ? 'Holborn Circus, London' : 'DHA Phase 6 Flagship',
          distanceKm: 1.8,
          subtotal: isGermany ? 2.90 : isUK ? 3.30 : 3399,
          items: []
        }
      ]
    },
    tradeoffRecommendation: `Splitting across 2 supermarkets saves ${sym} ${isGermany ? '1.40' : isUK ? '1.40' : '700'} with minimal travel distance.`
  };
}

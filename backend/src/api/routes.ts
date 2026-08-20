import { Router, Request, Response } from 'express';
import { locationService } from '../geolocation/geocoder';
import { storeDiscoveryService } from '../services/storeDiscoveryService';
import { offerAggregationService } from '../services/offerAggregationService';
import { shoppingOptimizerService } from '../services/shoppingOptimizerService';
import { providerRegistry } from '../providers';

export const apiRouter = Router();

// ==========================================
// 1. Geocoding & Address Search
// ==========================================
apiRouter.get('/location/search', async (req: Request, res: Response) => {
  try {
    const query = (req.query.query as string) || '';
    if (!query.trim()) {
      return res.status(400).json({ success: false, error: 'Query parameter is required' });
    }

    const locations = await locationService.search(query);
    return res.json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 2. Store Discovery
// ==========================================
apiRouter.get('/stores/nearby', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const radius = parseFloat((req.query.radius as string) || '10');
    const retailerId = req.query.retailerId as string;

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, error: 'Valid lat and lng query params are required' });
    }

    const retailerIds = retailerId ? [retailerId] : undefined;
    const stores = await storeDiscoveryService.findNearbyStores(
      { latitude: lat, longitude: lng },
      radius,
      retailerIds
    );

    return res.json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 3. Offer & Deal Discovery
// ==========================================
apiRouter.get('/offers/search', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const radius = parseFloat((req.query.radius as string) || '10');
    const query = req.query.query as string;
    const category = req.query.category as string;
    const minDiscount = req.query.minDiscount ? parseFloat(req.query.minDiscount as string) : undefined;
    const retailers = req.query.retailers ? (req.query.retailers as string).split(',') : undefined;
    const sortBy = req.query.sortBy as any;

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, error: 'Valid lat and lng query params are required' });
    }

    const result = await offerAggregationService.searchOffers({
      location: { latitude: lat, longitude: lng },
      radiusKm: radius,
      query,
      category,
      minDiscount,
      retailerIds: retailers,
      sortBy
    });

    return res.json({
      success: true,
      location: {
        latitude: lat,
        longitude: lng,
        radiusKm: radius
      },
      totalStoresFound: result.storesCount,
      totalOffersFound: result.offersCount,
      results: result.deals
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// "🔥 Best Deals Near Me"
apiRouter.get('/offers/best', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const radius = parseFloat((req.query.radius as string) || '10');

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, error: 'Valid lat and lng query params are required' });
    }

    const deals = await offerAggregationService.getBestDeals(
      { latitude: lat, longitude: lng },
      radius
    );

    return res.json({
      success: true,
      count: deals.length,
      results: deals
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Price History Tracker
apiRouter.get('/price-history/:productId', (req: Request, res: Response) => {
  const { productId } = req.params;
  
  // Historical sample data points
  const history = [
    { date: '2026-05-15', price: 3750, retailer: 'Carrefour' },
    { date: '2026-06-15', price: 3850, retailer: 'Metro' },
    { date: '2026-07-20', price: 3999, retailer: 'Al-Fatah' },
    { date: '2026-08-19', price: 3449, retailer: 'Metro', isCurrentOffer: true }
  ];

  return res.json({
    success: true,
    productId,
    insights: 'Current promotional price is 13.8% below the 90-day recorded average of Rs. 3,866.',
    history
  });
});

// ==========================================
// 4. Shopping Basket Optimizer
// ==========================================
apiRouter.post('/shopping-list/optimize', async (req: Request, res: Response) => {
  try {
    const { location, items } = req.body;
    if (!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
      return res.status(400).json({ success: false, error: 'Valid location object is required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Non-empty items array is required' });
    }

    const result = await shoppingOptimizerService.optimizeBasket(
      { latitude: location.latitude, longitude: location.longitude },
      location.radiusKm || 10,
      items
    );

    return res.json({
      success: true,
      ...result
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 5. Admin & Data Source Endpoints
// ==========================================
apiRouter.get('/admin/retailers', (_req: Request, res: Response) => {
  const providers = providerRegistry.getAll();
  const retailers = providers.map(p => ({
    id: p.id,
    name: p.name,
    country: p.country,
    currency: p.currency,
    website: p.website,
    logoUrl: p.logoUrl,
    status: 'ACTIVE',
    lastSync: new Date().toISOString()
  }));

  return res.json({
    success: true,
    count: retailers.length,
    data: retailers
  });
});

apiRouter.get('/admin/stores', async (_req: Request, res: Response) => {
  const providers = providerRegistry.getAll();
  const allStores = [];
  for (const p of providers) {
    const stores = await p.getStores();
    allStores.push(...stores);
  }

  return res.json({
    success: true,
    count: allStores.length,
    data: allStores
  });
});

apiRouter.get('/admin/sources', (_req: Request, res: Response) => {
  const providers = providerRegistry.getAll();
  const sources = providers.map(p => ({
    id: `src-${p.id}`,
    providerId: p.id,
    retailerName: p.name,
    feedType: p.id.includes('carrefour') || p.id.includes('metro') ? 'Official Digital Flyer / Feed' : 'Public Web Catalog',
    status: 'OPERATIONAL',
    lastSync: new Date().toISOString(),
    errorCount: 0
  }));

  return res.json({
    success: true,
    data: sources
  });
});

apiRouter.post('/admin/sync', async (req: Request, res: Response) => {
  const { providerId } = req.body;
  const providers = providerId 
    ? [providerRegistry.get(providerId)].filter(Boolean)
    : providerRegistry.getAll();

  const results = [];
  for (const p of providers) {
    if (p && p.sync) {
      const syncRes = await p.sync();
      results.push(syncRes);
    }
  }

  return res.json({
    success: true,
    message: 'Sync completed successfully',
    results
  });
});

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/server';

describe('REST API Endpoints', () => {
  it('GET /health returns HEALTHY status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('HEALTHY');
  });

  it('GET /api/location/search returns geocoded results for Lahore', async () => {
    const res = await request(app)
      .get('/api/location/search')
      .query({ query: 'DHA Phase 6' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].city).toBe('Lahore');
  });

  it('GET /api/stores/nearby returns stores within 10 km of DHA Phase 6', async () => {
    const res = await request(app)
      .get('/api/stores/nearby')
      .query({ lat: 31.4697, lng: 74.4107, radius: 10 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /api/offers/search returns Cooking Oil deals', async () => {
    const res = await request(app)
      .get('/api/offers/search')
      .query({
        lat: 31.4697,
        lng: 74.4107,
        radius: 10,
        query: 'Cooking Oil'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
    expect(res.body.results[0].product.brand).toBeDefined();
    expect(res.body.results[0].pricing.salePrice).toBeGreaterThan(0);
  });

  it('POST /api/shopping-list/optimize computes basket savings', async () => {
    const res = await request(app)
      .post('/api/shopping-list/optimize')
      .send({
        location: {
          latitude: 31.4697,
          longitude: 74.4107,
          radiusKm: 10
        },
        items: [
          { name: 'Cooking Oil 5L', quantity: 1 },
          { name: 'Basmati Rice 5kg', quantity: 1 }
        ]
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.multiStoreOptimal.totalCost).toBeGreaterThan(0);
  });
});

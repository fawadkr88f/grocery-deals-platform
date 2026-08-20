import { describe, it, expect, beforeAll } from 'vitest';
import { initializeProviders } from '../src/providers';
import { shoppingOptimizerService } from '../src/services/shoppingOptimizerService';

describe('Shopping Basket Optimizer', () => {
  beforeAll(() => {
    initializeProviders();
  });

  it('optimizes grocery shopping list across stores', async () => {
    const dhaLocation = {
      latitude: 31.4697,
      longitude: 74.4107
    };

    const items = [
      { name: 'Cooking Oil 5L', quantity: 1 },
      { name: 'Basmati Rice 5kg', quantity: 1 },
      { name: 'Milk', quantity: 1 }
    ];

    const result = await shoppingOptimizerService.optimizeBasket(dhaLocation, 10, items);

    expect(result).toBeDefined();
    expect(result.totalItemsRequested).toBe(3);
    expect(result.multiStoreOptimal.stores.length).toBeGreaterThan(0);
    expect(result.multiStoreOptimal.totalCost).toBeGreaterThan(0);
    expect(result.tradeoffRecommendation).toBeDefined();
  });
});

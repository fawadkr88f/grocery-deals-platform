import { Coordinates, ShoppingListItem, ShoppingOptimizationResult } from '../types';
import { offerAggregationService } from './offerAggregationService';

export class ShoppingOptimizerService {
  /**
   * Optimizes a shopping list to find the cheapest single-store basket vs. multi-store optimal combination.
   */
  public async optimizeBasket(
    location: Coordinates,
    radiusKm: number,
    items: ShoppingListItem[]
  ): Promise<ShoppingOptimizationResult> {
    if (!items || items.length === 0) {
      return {
        location: { ...location, radiusKm },
        totalItemsRequested: 0,
        multiStoreOptimal: {
          totalCost: 0,
          totalSavingsVsSingleStore: 0,
          totalSavingsVsRegularPrice: 0,
          storeCount: 0,
          stores: []
        },
        tradeoffRecommendation: 'Please add items to your shopping list.'
      };
    }

    // Step 1: Query deals for each item
    const itemOffersMap = new Map<string, any[]>();
    for (const item of items) {
      const searchRes = await offerAggregationService.searchOffers({
        location,
        radiusKm,
        query: item.name
      });
      itemOffersMap.set(item.name, searchRes.deals);
    }

    // Step 2: Calculate Single-Store baskets
    const storeBaskets = new Map<string, {
      retailerId: string;
      retailerName: string;
      storeAddress: string;
      distanceKm: number;
      itemsFound: number;
      totalCost: number;
      totalRegularCost: number;
      items: any[];
      missing: string[];
    }>();

    for (const item of items) {
      const deals = itemOffersMap.get(item.name) || [];
      const qty = item.quantity || 1;

      // Group best deal per retailer for this item
      const retailerBestDeal = new Map<string, any>();
      for (const deal of deals) {
        const retId = deal.store.retailerId;
        const existing = retailerBestDeal.get(retId);
        if (!existing || deal.pricing.salePrice < existing.pricing.salePrice) {
          retailerBestDeal.set(retId, deal);
        }
      }

      // Add to store baskets
      for (const [retId, deal] of retailerBestDeal.entries()) {
        if (!storeBaskets.has(retId)) {
          storeBaskets.set(retId, {
            retailerId: retId,
            retailerName: deal.store.name,
            storeAddress: deal.store.address,
            distanceKm: deal.store.distanceKm,
            itemsFound: 0,
            totalCost: 0,
            totalRegularCost: 0,
            items: [],
            missing: []
          });
        }

        const basket = storeBaskets.get(retId)!;
        basket.itemsFound += 1;
        const itemCost = deal.pricing.salePrice * qty;
        const regCost = deal.pricing.regularPrice * qty;
        basket.totalCost += itemCost;
        basket.totalRegularCost += regCost;
        basket.items.push({
          item: item.name,
          productName: deal.product.name,
          brand: deal.product.brand,
          price: itemCost,
          regularPrice: regCost,
          savings: regCost - itemCost
        });
      }
    }

    // Mark missing items for each store
    for (const basket of storeBaskets.values()) {
      const foundItemNames = new Set(basket.items.map(i => i.item));
      basket.missing = items.map(i => i.name).filter(name => !foundItemNames.has(name));
    }

    // Find best single store (most items found, then lowest total cost)
    let bestSingleStore: any = null;
    for (const basket of storeBaskets.values()) {
      if (!bestSingleStore) {
        bestSingleStore = basket;
      } else if (basket.itemsFound > bestSingleStore.itemsFound) {
        bestSingleStore = basket;
      } else if (
        basket.itemsFound === bestSingleStore.itemsFound &&
        basket.totalCost < bestSingleStore.totalCost
      ) {
        bestSingleStore = basket;
      }
    }

    // Step 3: Calculate Multi-Store Optimal (cheapest price for each item across all stores)
    const multiStoreItemsByStore = new Map<string, {
      retailerId: string;
      retailerName: string;
      storeAddress: string;
      distanceKm: number;
      subtotal: number;
      items: any[];
    }>();

    let multiStoreTotal = 0;
    let multiStoreRegularTotal = 0;

    for (const item of items) {
      const deals = itemOffersMap.get(item.name) || [];
      const qty = item.quantity || 1;
      if (deals.length === 0) continue;

      // Find absolute cheapest deal for this item
      let cheapestDeal = deals[0];
      for (const deal of deals) {
        if (deal.pricing.salePrice < cheapestDeal.pricing.salePrice) {
          cheapestDeal = deal;
        }
      }

      const retId = cheapestDeal.store.retailerId;
      const itemCost = cheapestDeal.pricing.salePrice * qty;
      const regCost = cheapestDeal.pricing.regularPrice * qty;
      multiStoreTotal += itemCost;
      multiStoreRegularTotal += regCost;

      if (!multiStoreItemsByStore.has(retId)) {
        multiStoreItemsByStore.set(retId, {
          retailerId: retId,
          retailerName: cheapestDeal.store.name,
          storeAddress: cheapestDeal.store.address,
          distanceKm: cheapestDeal.store.distanceKm,
          subtotal: 0,
          items: []
        });
      }

      const storeGroup = multiStoreItemsByStore.get(retId)!;
      storeGroup.subtotal += itemCost;
      storeGroup.items.push({
        item: item.name,
        productName: cheapestDeal.product.name,
        brand: cheapestDeal.product.brand,
        price: itemCost,
        regularPrice: regCost,
        savings: regCost - itemCost
      });
    }

    const multiStoresList = Array.from(multiStoreItemsByStore.values());
    const singleStoreCost = bestSingleStore ? bestSingleStore.totalCost : multiStoreTotal;
    const savingsVsSingle = Math.max(0, singleStoreCost - multiStoreTotal);

    // Tradeoff recommendation
    let tradeoffRecommendation = '';
    if (multiStoresList.length <= 1) {
      tradeoffRecommendation = `Best single store purchase available at ${bestSingleStore?.retailerName || 'nearby store'}. No multi-stop required.`;
    } else if (savingsVsSingle > 300) {
      tradeoffRecommendation = `Splitting your basket across ${multiStoresList.length} stores saves Rs. ${savingsVsSingle.toLocaleString()} compared to buying everything in one place!`;
    } else {
      tradeoffRecommendation = `Multi-store savings (Rs. ${savingsVsSingle}) may not offset extra travel time. Buying all items at ${bestSingleStore?.retailerName} is recommended.`;
    }

    return {
      location: { ...location, radiusKm },
      totalItemsRequested: items.length,
      singleStoreBest: bestSingleStore ? {
        retailerId: bestSingleStore.retailerId,
        retailerName: bestSingleStore.retailerName,
        storeAddress: bestSingleStore.storeAddress,
        distanceKm: bestSingleStore.distanceKm,
        totalCost: bestSingleStore.totalCost,
        itemsFound: bestSingleStore.itemsFound,
        totalItems: items.length,
        missingItems: bestSingleStore.missing,
        itemBreakdown: bestSingleStore.items
      } : undefined,
      multiStoreOptimal: {
        totalCost: multiStoreTotal,
        totalSavingsVsSingleStore: savingsVsSingle,
        totalSavingsVsRegularPrice: multiStoreRegularTotal - multiStoreTotal,
        storeCount: multiStoresList.length,
        stores: multiStoresList
      },
      tradeoffRecommendation
    };
  }
}

export const shoppingOptimizerService = new ShoppingOptimizerService();

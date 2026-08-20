import { Coordinates, ProductDeal } from '../types';
import { providerRegistry } from '../providers';
import { normalizer } from '../normalization/normalizer';
import { dealScorer } from '../ranking/dealScorer';
import { calculateDistanceKm } from '../geolocation/distance';

export interface OfferSearchOptions {
  location: Coordinates;
  radiusKm: number;
  query?: string;
  category?: string;
  minDiscount?: number;
  retailerIds?: string[];
  sortBy?: 'deal_score' | 'distance' | 'discount' | 'price_low' | 'price_high';
}

export class OfferAggregationService {
  /**
   * Aggregates, normalizes, scores, and ranks grocery offers from all nearby stores.
   */
  public async searchOffers(options: OfferSearchOptions): Promise<{
    storesCount: number;
    offersCount: number;
    deals: ProductDeal[];
  }> {
    const { location, radiusKm, query, category, minDiscount, retailerIds, sortBy = 'deal_score' } = options;

    const allProviders = providerRegistry.getAll();
    const activeProviders = retailerIds && retailerIds.length > 0
      ? allProviders.filter(p => retailerIds.includes(p.id))
      : allProviders;

    const deals: ProductDeal[] = [];
    const matchedStoresSet = new Set<string>();

    for (const provider of activeProviders) {
      try {
        // 1. Get stores for this provider within radius
        const providerStores = await provider.getStores(location, radiusKm);
        if (providerStores.length === 0) {
          continue; // No stores from this chain within radius
        }

        // Find closest store branch of this retailer to user
        let closestStore = providerStores[0];
        let minDistance = calculateDistanceKm(
          location.latitude,
          location.longitude,
          closestStore.latitude,
          closestStore.longitude
        );

        for (const store of providerStores) {
          const dist = calculateDistanceKm(
            location.latitude,
            location.longitude,
            store.latitude,
            store.longitude
          );
          if (dist < minDistance) {
            minDistance = dist;
            closestStore = store;
          }
        }

        if (minDistance > radiusKm) {
          continue;
        }

        providerStores.forEach(s => matchedStoresSet.add(s.id));

        // 2. Fetch raw product offers
        const rawOffers = query 
          ? await provider.searchProducts(query, category)
          : await provider.getOffers();

        // 3. Filter and normalize each offer
        for (const raw of rawOffers) {
          if (category && raw.category.toLowerCase() !== category.toLowerCase()) {
            continue;
          }

          const sizeInfo = normalizer.extractSize(raw.rawTitle);
          const pricing = normalizer.calculatePricing(
            raw.regularPrice,
            raw.salePrice,
            sizeInfo,
            provider.currency
          );

          if (minDiscount && pricing.discountPercent < minDiscount) {
            continue;
          }

          const normalizedProduct = normalizer.normalize(
            raw.id || `prod-${Math.random().toString(36).substring(2, 9)}`,
            raw.rawTitle,
            raw.category,
            raw.brand,
            raw.imageUrl
          );

          const dealScore = dealScorer.calculateScore({
            query,
            category,
            productName: normalizedProduct.name,
            brand: normalizedProduct.brand,
            pricing,
            distanceKm: minDistance,
            maxRadiusKm: radiusKm,
            verificationStatus: raw.verificationStatus,
            validUntil: raw.validUntil
          });

          deals.push({
            id: `deal-${raw.id || Math.random().toString(36).substring(2, 9)}`,
            product: normalizedProduct,
            store: {
              id: closestStore.id,
              retailerId: provider.id,
              name: provider.name,
              branch: closestStore.branchName,
              distanceKm: minDistance,
              address: closestStore.address,
              latitude: closestStore.latitude,
              longitude: closestStore.longitude,
              logoUrl: provider.logoUrl
            },
            pricing,
            offer: {
              validUntil: raw.validUntil || null,
              verificationStatus: raw.verificationStatus,
              sourceType: raw.sourceType,
              sourceUrl: raw.sourceUrl,
              lastVerified: new Date().toISOString()
            },
            dealScore
          });
        }
      } catch (err) {
        console.error(`Error aggregating offers from ${provider.id}:`, err);
      }
    }

    // 4. Sort results
    deals.sort((a, b) => {
      switch (sortBy) {
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

    return {
      storesCount: matchedStoresSet.size,
      offersCount: deals.length,
      deals
    };
  }

  /**
   * "🔥 Best Deals Near Me" - Finds top essential grocery items with highest discounts
   */
  public async getBestDeals(location: Coordinates, radiusKm = 10): Promise<ProductDeal[]> {
    const result = await this.searchOffers({
      location,
      radiusKm,
      minDiscount: 10,
      sortBy: 'deal_score'
    });

    return result.deals.slice(0, 15);
  }
}

export const offerAggregationService = new OfferAggregationService();

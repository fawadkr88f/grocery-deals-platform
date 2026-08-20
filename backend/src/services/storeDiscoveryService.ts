import { Coordinates, StoreLocation } from '../types';
import { providerRegistry } from '../providers';
import { calculateDistanceKm } from '../geolocation/distance';

export class StoreDiscoveryService {
  /**
   * Discovers all physical stores within radiusKm of the target coordinates.
   */
  public async findNearbyStores(
    location: Coordinates,
    radiusKm: number,
    retailerIds?: string[]
  ): Promise<StoreLocation[]> {
    const allProviders = providerRegistry.getAll();
    const targetProviders = retailerIds && retailerIds.length > 0
      ? allProviders.filter(p => retailerIds.includes(p.id))
      : allProviders;

    const nearbyStores: StoreLocation[] = [];

    for (const provider of targetProviders) {
      try {
        const stores = await provider.getStores(location, radiusKm);
        for (const store of stores) {
          const distance = calculateDistanceKm(
            location.latitude,
            location.longitude,
            store.latitude,
            store.longitude
          );

          if (distance <= radiusKm) {
            nearbyStores.push({
              ...store,
              distanceKm: distance
            });
          }
        }
      } catch (err) {
        console.error(`Error fetching stores from provider ${provider.id}:`, err);
      }
    }

    // Sort stores by distance (closest first)
    return nearbyStores.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }
}

export const storeDiscoveryService = new StoreDiscoveryService();

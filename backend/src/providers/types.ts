import { Coordinates, RawProductOffer, StoreLocation } from '../types';

export interface SyncResult {
  success: boolean;
  providerId: string;
  itemsFetched: number;
  storesFetched: number;
  syncedAt: string;
  errorMessage?: string;
}

export interface RetailerProvider {
  id: string;
  name: string;
  country: string;
  currency: string;
  website: string;
  logoUrl?: string;

  /**
   * Search active product offers matching user query or category.
   */
  searchProducts(query: string, category?: string): Promise<RawProductOffer[]>;

  /**
   * Fetch all current discounted grocery flyer deals and promotions.
   */
  getOffers(): Promise<RawProductOffer[]>;

  /**
   * Fetch store branch locations within geographic range.
   */
  getStores(location?: Coordinates, radiusKm?: number): Promise<StoreLocation[]>;

  /**
   * Perform on-demand data sync if applicable.
   */
  sync?(): Promise<SyncResult>;

  /**
   * Get provider health and status.
   */
  getStatus?(): {
    isActive: boolean;
    lastSync: string;
    itemsCount: number;
    errorCount: number;
  };
}

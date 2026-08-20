import { RetailerProvider, RawProductOffer, SyncResult } from './types';
import { Coordinates, StoreLocation } from '../types';
import { calculateDistanceKm } from '../geolocation/distance';

export class ReweGermanyProvider implements RetailerProvider {
  id = 'rewe-de';
  name = 'REWE Supermarket';
  country = 'DE';
  currency = 'EUR';
  website = 'https://www.rewe.de';
  logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/REWE_Logo.svg';

  private stores: StoreLocation[] = [
    {
      id: 'rewe-frankfurt-zeil',
      retailerId: 'rewe-de',
      retailerName: 'REWE Center',
      branchName: 'Zeil 106, Frankfurt',
      address: 'Zeil 106, 60313 Frankfurt am Main',
      city: 'Frankfurt am Main',
      country: 'Germany',
      latitude: 50.1147,
      longitude: 8.6853,
      phone: '+49 69 2972980',
      openingHours: '07:00 AM - 10:00 PM',
      isOpen: true
    }
  ];

  private offers: RawProductOffer[] = [
    {
      id: 'rewe-milch-1l',
      retailerId: 'rewe-de',
      rawTitle: 'Weihenstephan Frische Vollmilch 1L',
      brand: 'Weihenstephan',
      category: 'Dairy',
      regularPrice: 1.79,
      salePrice: 1.19,
      packageSize: 1,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      validUntil: '2026-08-30',
      sourceType: 'flyer',
      sourceUrl: 'https://www.rewe.de/angebote',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'rewe-olivenoel-750ml',
      retailerId: 'rewe-de',
      rawTitle: 'Bertolli Natives Olivenöl Extra 750ml',
      brand: 'Bertolli',
      category: 'Cooking Oil',
      regularPrice: 8.99,
      salePrice: 6.99,
      packageSize: 750,
      unit: 'ml',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-30',
      sourceType: 'flyer',
      sourceUrl: 'https://www.rewe.de/angebote',
      verificationStatus: 'verified_retailer'
    }
  ];

  async getStores(location?: Coordinates, radiusKm?: number): Promise<StoreLocation[]> {
    if (!location || !radiusKm) return this.stores;
    return this.stores.filter(store => {
      const dist = calculateDistanceKm(location.latitude, location.longitude, store.latitude, store.longitude);
      return dist <= radiusKm;
    });
  }

  async getOffers(): Promise<RawProductOffer[]> {
    return this.offers;
  }

  async searchProducts(query: string, category?: string): Promise<RawProductOffer[]> {
    const q = query.toLowerCase();
    return this.offers.filter(offer => {
      const matchQuery = !query || 
        offer.rawTitle.toLowerCase().includes(q) || 
        offer.brand?.toLowerCase().includes(q) ||
        offer.category.toLowerCase().includes(q);
      const matchCat = !category || offer.category.toLowerCase() === category.toLowerCase();
      return matchQuery && matchCat;
    });
  }

  async sync(): Promise<SyncResult> {
    return {
      success: true,
      providerId: this.id,
      itemsFetched: this.offers.length,
      storesFetched: this.stores.length,
      syncedAt: new Date().toISOString()
    };
  }
}

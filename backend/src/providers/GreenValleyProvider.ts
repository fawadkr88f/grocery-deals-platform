import { RetailerProvider, RawProductOffer, SyncResult } from './types';
import { Coordinates, StoreLocation } from '../types';
import { calculateDistanceKm } from '../geolocation/distance';

export class GreenValleyProvider implements RetailerProvider {
  id = 'green-valley';
  name = 'Green Valley Hypermarket';
  country = 'PK';
  currency = 'PKR';
  website = 'https://greenvalley.pk';
  logoUrl = 'https://greenvalley.pk/wp-content/uploads/2021/04/gv-logo.png';

  private stores: StoreLocation[] = [
    {
      id: 'gv-mall-of-lahore',
      retailerId: 'green-valley',
      retailerName: 'Green Valley Hypermarket',
      branchName: 'Mall of Lahore, Cantt',
      address: 'Mall of Lahore, 13 Tufail Road, Lahore Cantt, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.5424,
      longitude: 74.3758,
      phone: '+92 42 111 484 766',
      openingHours: '10:00 AM - 11:30 PM',
      isOpen: true
    },
    {
      id: 'gv-bahria-town',
      retailerId: 'green-valley',
      retailerName: 'Green Valley Hypermarket',
      branchName: 'Bahria Town Flagship',
      address: 'Mall of Bahria, Sector C, Bahria Town, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.3658,
      longitude: 74.1812,
      phone: '+92 42 111 484 766',
      openingHours: '10:00 AM - 11:30 PM',
      isOpen: true
    }
  ];

  private offers: RawProductOffer[] = [
    {
      id: 'gv-dalda-5l',
      retailerId: 'green-valley',
      rawTitle: 'Dalda Pure Cooking Oil 5L Tin',
      brand: 'Dalda',
      category: 'Cooking Oil',
      regularPrice: 3999,
      salePrice: 3590,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-25',
      sourceType: 'web_catalog',
      sourceUrl: 'https://greenvalley.pk/offers/dalda-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'gv-sufi-sunflower-5l',
      retailerId: 'green-valley',
      rawTitle: 'Sufi Pure Sunflower Oil 5L Bottle',
      brand: 'Sufi',
      category: 'Cooking Oil',
      regularPrice: 3890,
      salePrice: 3380,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-28',
      sourceType: 'web_catalog',
      sourceUrl: 'https://greenvalley.pk/offers/sufi-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'gv-olpers-procal-1l',
      retailerId: 'green-valley',
      rawTitle: 'Olper\'s ProCal High Calcium Milk 1L Pack (Pack of 6)',
      brand: 'Olper\'s',
      category: 'Dairy',
      regularPrice: 2100,
      salePrice: 1850,
      packageSize: 6,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      validUntil: '2026-08-26',
      sourceType: 'web_catalog',
      sourceUrl: 'https://greenvalley.pk/offers/olpers',
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

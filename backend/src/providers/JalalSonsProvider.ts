import { RetailerProvider, RawProductOffer, SyncResult } from './types';
import { Coordinates, StoreLocation } from '../types';
import { calculateDistanceKm } from '../geolocation/distance';

export class JalalSonsProvider implements RetailerProvider {
  id = 'jalal-sons';
  name = 'Jalal Sons';
  country = 'PK';
  currency = 'PKR';
  website = 'https://jalalsons.com.pk';
  logoUrl = 'https://jalalsons.com.pk/wp-content/uploads/2021/04/jalalsons-logo.png';

  private stores: StoreLocation[] = [
    {
      id: 'jalalsons-dha5',
      retailerId: 'jalal-sons',
      retailerName: 'Jalal Sons',
      branchName: 'DHA Phase 5 Branch',
      address: 'Commercial Area, Phase 5, DHA, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4679,
      longitude: 74.3965,
      phone: '+92 42 111 525 257',
      openingHours: '08:30 AM - 12:30 AM',
      isOpen: true
    },
    {
      id: 'jalalsons-gulberg',
      retailerId: 'jalal-sons',
      retailerName: 'Jalal Sons',
      branchName: 'Main Market Gulberg',
      address: 'Main Market, Gulberg II, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.5245,
      longitude: 74.3498,
      phone: '+92 42 111 525 257',
      openingHours: '08:30 AM - 12:30 AM',
      isOpen: true
    },
    {
      id: 'jalalsons-dha6',
      retailerId: 'jalal-sons',
      retailerName: 'Jalal Sons',
      branchName: 'DHA Phase 6 Raya Club',
      address: 'Fairways Commercial, Defence Raya, DHA Phase 6, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4642,
      longitude: 74.4328,
      phone: '+92 42 111 525 257',
      openingHours: '08:30 AM - 12:30 AM',
      isOpen: true
    }
  ];

  private offers: RawProductOffer[] = [
    {
      id: 'js-dalda-canola-5l',
      retailerId: 'jalal-sons',
      rawTitle: 'Dalda Canola Oil 5 Liter Can Premium',
      brand: 'Dalda',
      category: 'Cooking Oil',
      regularPrice: 4050,
      salePrice: 3580,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-25',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk/products/dalda-canola-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'js-anhar-milk-1l',
      retailerId: 'jalal-sons',
      rawTitle: 'Anhar Pasteurized Pure Fresh Milk 1L Bottle',
      brand: 'Anhar',
      category: 'Dairy',
      regularPrice: 320,
      salePrice: 285,
      packageSize: 1,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      validUntil: '2026-08-23',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk/products/anhar-milk',
      verificationStatus: 'verified_today'
    },
    {
      id: 'js-kashmir-ghee-5kg',
      retailerId: 'jalal-sons',
      rawTitle: 'Kashmir Premium Banaspati Ghee 5kg Tin',
      brand: 'Kashmir',
      category: 'Cooking Oil',
      regularPrice: 3650,
      salePrice: 3290,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-28',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk/products/kashmir-ghee',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'js-guard-super-basmati-5kg',
      retailerId: 'jalal-sons',
      rawTitle: 'Guard Super Basmati Extra Long Grain Rice 5kg',
      brand: 'Guard',
      category: 'Rice & Grains',
      regularPrice: 2890,
      salePrice: 2550,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      validUntil: '2026-08-30',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk/products/guard-rice',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'js-fresh-chicken-1kg',
      retailerId: 'jalal-sons',
      rawTitle: 'Fresh Whole Chicken Dressed Cut 1kg',
      brand: 'Generic',
      category: 'Meat',
      regularPrice: 680,
      salePrice: 590,
      packageSize: 1,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
      validUntil: '2026-08-21',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk/products/fresh-chicken',
      verificationStatus: 'verified_today'
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

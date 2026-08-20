import { RetailerProvider, RawProductOffer, SyncResult } from './types';
import { Coordinates, StoreLocation } from '../types';
import { calculateDistanceKm } from '../geolocation/distance';

export class AlFatahProvider implements RetailerProvider {
  id = 'al-fatah';
  name = 'Al-Fatah Supermarket';
  country = 'PK';
  currency = 'PKR';
  website = 'https://alfatah.pk';
  logoUrl = 'https://alfatah.pk/wp-content/uploads/2021/08/al-fatah-logo.png';

  private stores: StoreLocation[] = [
    {
      id: 'alfatah-dha6',
      retailerId: 'al-fatah',
      retailerName: 'Al-Fatah Supermarket',
      branchName: 'DHA Phase 6 Flagship',
      address: 'Main Boulevard, Phase 6, DHA, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4721,
      longitude: 74.4215,
      phone: '+92 42 111 253 282',
      openingHours: '09:00 AM - 12:00 AM',
      isOpen: true
    },
    {
      id: 'alfatah-dha5',
      retailerId: 'al-fatah',
      retailerName: 'Al-Fatah Supermarket',
      branchName: 'DHA Phase 5 Mall',
      address: 'Sector C, Commercial Area, Phase 5, DHA, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4688,
      longitude: 74.3945,
      phone: '+92 42 111 253 282',
      openingHours: '09:00 AM - 12:00 AM',
      isOpen: true
    },
    {
      id: 'alfatah-gulberg',
      retailerId: 'al-fatah',
      retailerName: 'Al-Fatah Supermarket',
      branchName: 'Gulberg III Main Branch',
      address: 'Main Market, Gulberg III, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.5221,
      longitude: 74.3541,
      phone: '+92 42 111 253 282',
      openingHours: '09:00 AM - 12:00 AM',
      isOpen: true
    },
    {
      id: 'alfatah-johartown',
      retailerId: 'al-fatah',
      retailerName: 'Al-Fatah Supermarket',
      branchName: 'Johar Town Branch',
      address: 'G-1 Market, Johar Town, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4681,
      longitude: 74.2798,
      phone: '+92 42 111 253 282',
      openingHours: '09:00 AM - 12:00 AM',
      isOpen: true
    }
  ];

  private offers: RawProductOffer[] = [
    {
      id: 'alf-meezan-oil-5l',
      retailerId: 'al-fatah',
      rawTitle: 'Meezan Cooking Oil 5L Bottle',
      brand: 'Meezan',
      category: 'Cooking Oil',
      regularPrice: 3799,
      salePrice: 3399,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-27',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk/products/meezan-oil-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'alf-canolive-oil-5l',
      retailerId: 'al-fatah',
      rawTitle: 'Canolive Premium Cooking Oil 5L Can',
      brand: 'Canolive',
      category: 'Cooking Oil',
      regularPrice: 4100,
      salePrice: 3599,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-28',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk/products/canolive-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'alf-anhar-eggs-12',
      retailerId: 'al-fatah',
      rawTitle: 'Anhar Farm Fresh Organic Brown Eggs Pack of 12',
      brand: 'Anhar',
      category: 'Fresh Produce',
      regularPrice: 480,
      salePrice: 410,
      packageSize: 12,
      unit: 'pack',
      imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
      validUntil: '2026-08-24',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk/products/anhar-eggs',
      verificationStatus: 'verified_today'
    },
    {
      id: 'alf-potatoes-5kg',
      retailerId: 'al-fatah',
      rawTitle: 'Farm Fresh Potatoes (Aloo) 5kg Net Bag',
      brand: 'Generic',
      category: 'Fresh Produce',
      regularPrice: 450,
      salePrice: 375,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      validUntil: '2026-08-23',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk/products/potatoes',
      verificationStatus: 'verified_today'
    },
    {
      id: 'alf-national-salt',
      retailerId: 'al-fatah',
      rawTitle: 'National Iodized Table Salt 800g Polybag',
      brand: 'National',
      category: 'Grocery',
      regularPrice: 70,
      salePrice: 58,
      packageSize: 800,
      unit: 'g',
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
      validUntil: '2026-08-28',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk/products/salt',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'alf-dettol-soap',
      retailerId: 'al-fatah',
      rawTitle: 'Dettol Original Antibacterial Soap (Buy 3 Get 1 Free)',
      brand: 'Dettol',
      category: 'Personal Care',
      packageSize: 4,
      unit: 'pack',
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
      validUntil: '2026-08-30',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk/products/dettol-soap',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'alf-harpic-1l',
      retailerId: 'al-fatah',
      rawTitle: 'Harpic Power Plus Toilet Cleaner 1000ml Bottle',
      brand: 'Generic',
      category: 'Household',
      regularPrice: 620,
      salePrice: 519,
      packageSize: 1,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400',
      validUntil: '2026-08-28',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk/products/harpic',
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

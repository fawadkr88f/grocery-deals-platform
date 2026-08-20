import { RetailerProvider, RawProductOffer, SyncResult } from './types';
import { Coordinates, StoreLocation } from '../types';
import { calculateDistanceKm } from '../geolocation/distance';

export class MetroPakistanProvider implements RetailerProvider {
  id = 'metro-pk';
  name = 'Metro Cash & Carry';
  country = 'PK';
  currency = 'PKR';
  website = 'https://www.metro.pk';
  logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Metro-logo.svg';

  private stores: StoreLocation[] = [
    {
      id: 'metro-airport',
      retailerId: 'metro-pk',
      retailerName: 'Metro Cash & Carry',
      branchName: 'Airport Road Branch',
      address: 'Airport Road, Near Bhatta Chowk, Cantt, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.5034,
      longitude: 74.4082,
      phone: '+92 42 111 638 760',
      openingHours: '09:00 AM - 11:00 PM',
      isOpen: true
    },
    {
      id: 'metro-thokar',
      retailerId: 'metro-pk',
      retailerName: 'Metro Cash & Carry',
      branchName: 'Thokar Niaz Baig Branch',
      address: 'Multan Road, Thokar Niaz Baig, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4705,
      longitude: 74.2415,
      phone: '+92 42 111 638 760',
      openingHours: '09:00 AM - 11:00 PM',
      isOpen: true
    },
    {
      id: 'metro-model-town',
      retailerId: 'metro-pk',
      retailerName: 'Metro Cash & Carry',
      branchName: 'Model Town Link Road',
      address: 'Model Town Link Rd, Model Town, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4878,
      longitude: 74.3164,
      phone: '+92 42 111 638 760',
      openingHours: '09:00 AM - 11:00 PM',
      isOpen: true
    }
  ];

  private offers: RawProductOffer[] = [
    {
      id: 'mtr-dalda-5l',
      retailerId: 'metro-pk',
      rawTitle: 'Dalda Cooking Oil 5L Can',
      brand: 'Dalda',
      category: 'Cooking Oil',
      regularPrice: 3999,
      salePrice: 3449,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-26',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/dalda-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'mtr-sufi-oil-5l',
      retailerId: 'metro-pk',
      rawTitle: 'Sufi Cooking Oil 5L Bottle',
      brand: 'Sufi',
      category: 'Cooking Oil',
      regularPrice: 3850,
      salePrice: 3299,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-25',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/sufi-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'mtr-guard-rice-5kg',
      retailerId: 'metro-pk',
      rawTitle: 'Guard Basmati Rice Ultimate 5kg',
      brand: 'Guard',
      category: 'Rice & Grains',
      regularPrice: 2799,
      salePrice: 2399,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      validUntil: '2026-08-30',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/rice',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'mtr-daal-chana-1kg',
      retailerId: 'metro-pk',
      rawTitle: 'Premium Washed Daal Chana Pulse 1kg',
      brand: 'National',
      category: 'Rice & Grains',
      regularPrice: 340,
      salePrice: 289,
      packageSize: 1,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      validUntil: '2026-08-28',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/pulses',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'mtr-milkpak-1l',
      retailerId: 'metro-pk',
      rawTitle: 'Nestle MilkPak UHT Milk 1L (Carton of 12)',
      brand: 'Nestle',
      category: 'Dairy',
      regularPrice: 3840,
      salePrice: 3360,
      packageSize: 12,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      validUntil: '2026-08-28',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/milkpak',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'mtr-tapal-tea-950g',
      retailerId: 'metro-pk',
      rawTitle: 'Tapal Danedar Tea 950g Mega Pack',
      brand: 'Tapal',
      category: 'Beverages',
      regularPrice: 1950,
      salePrice: 1649,
      packageSize: 950,
      unit: 'g',
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
      validUntil: '2026-08-25',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/tapal',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'mtr-sugar-5kg',
      retailerId: 'metro-pk',
      rawTitle: 'Refined White Sugar Fine Grain 5kg Pack',
      brand: 'Generic',
      category: 'Grocery',
      regularPrice: 850,
      salePrice: 720,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400',
      validUntil: '2026-08-25',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/sugar',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'mtr-ariel-detergent-6kg',
      retailerId: 'metro-pk',
      rawTitle: 'Ariel Original Washing Powder 6kg Bag',
      brand: 'Ariel',
      category: 'Household',
      regularPrice: 3300,
      salePrice: 2799,
      packageSize: 6,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
      validUntil: '2026-08-31',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk/promotions/ariel-6kg',
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

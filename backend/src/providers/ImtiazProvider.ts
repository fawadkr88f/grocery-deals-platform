import { RetailerProvider, RawProductOffer, SyncResult } from './types';
import { Coordinates, StoreLocation } from '../types';
import { calculateDistanceKm } from '../geolocation/distance';

export class ImtiazProvider implements RetailerProvider {
  id = 'imtiaz-pk';
  name = 'Imtiaz Super Market';
  country = 'PK';
  currency = 'PKR';
  website = 'https://www.imtiaz.com.pk';
  logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Imtiaz_Super_Market_Logo.png';

  private stores: StoreLocation[] = [
    {
      id: 'imtiaz-gulberg',
      retailerId: 'imtiaz-pk',
      retailerName: 'Imtiaz Super Market',
      branchName: 'Gulberg Branch',
      address: 'Near Liberty Roundabout, Gulberg III, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.5178,
      longitude: 74.3489,
      phone: '+92 42 111 468 429',
      openingHours: '09:30 AM - 11:30 PM',
      isOpen: true
    },
    {
      id: 'imtiaz-y-block',
      retailerId: 'imtiaz-pk',
      retailerName: 'Imtiaz Super Market',
      branchName: 'DHA Phase 3 Y Block',
      address: 'Commercial Area, Phase 3, DHA, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4789,
      longitude: 74.3762,
      phone: '+92 42 111 468 429',
      openingHours: '09:30 AM - 11:30 PM',
      isOpen: true
    },
    {
      id: 'imtiaz-bahria',
      retailerId: 'imtiaz-pk',
      retailerName: 'Imtiaz Super Market',
      branchName: 'Bahria Town Branch',
      address: 'Main Commercial Zone, Bahria Town, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.3689,
      longitude: 74.1842,
      phone: '+92 42 111 468 429',
      openingHours: '09:30 AM - 11:30 PM',
      isOpen: true
    }
  ];

  private offers: RawProductOffer[] = [
    {
      id: 'imz-dalda-5l',
      retailerId: 'imtiaz-pk',
      rawTitle: 'Dalda Cooking Oil 5L Bottle Special Deal',
      brand: 'Dalda',
      category: 'Cooking Oil',
      regularPrice: 3999,
      salePrice: 3399,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-25',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk/weekly-flyer',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'imz-sufi-sunflower-5l',
      retailerId: 'imtiaz-pk',
      rawTitle: 'Sufi Sunflower Cooking Oil 5L Can',
      brand: 'Sufi',
      category: 'Cooking Oil',
      regularPrice: 3890,
      salePrice: 3250,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-26',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk/weekly-flyer',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'imz-falak-rice-5kg',
      retailerId: 'imtiaz-pk',
      rawTitle: 'Falak Extreme Basmati Rice 5kg Polybag',
      brand: 'Falak',
      category: 'Rice & Grains',
      regularPrice: 2950,
      salePrice: 2450,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      validUntil: '2026-08-29',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk/weekly-flyer',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'imz-nurpur-milk-1l',
      retailerId: 'imtiaz-pk',
      rawTitle: 'Nurpur Pure Milk 1L Pack (Box of 12)',
      brand: 'Nurpur',
      category: 'Dairy',
      regularPrice: 3600,
      salePrice: 3099,
      packageSize: 12,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      validUntil: '2026-08-28',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk/weekly-flyer',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'imz-tapal-tea-950g',
      retailerId: 'imtiaz-pk',
      rawTitle: 'Tapal Danedar Tea Jar 950g + Free Mug',
      brand: 'Tapal',
      category: 'Beverages',
      regularPrice: 2050,
      salePrice: 1680,
      packageSize: 950,
      unit: 'g',
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
      validUntil: '2026-08-31',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk/weekly-flyer',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'imz-brite-detergent-5kg',
      retailerId: 'imtiaz-pk',
      rawTitle: 'Brite Maximum Power Detergent Powder 5kg Pack',
      brand: 'Brite',
      category: 'Household',
      regularPrice: 2450,
      salePrice: 1999,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
      validUntil: '2026-08-26',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk/weekly-flyer',
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

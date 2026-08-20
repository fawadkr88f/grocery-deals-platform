import { RetailerProvider, RawProductOffer, SyncResult } from './types';
import { Coordinates, StoreLocation } from '../types';
import { calculateDistanceKm } from '../geolocation/distance';

export class CarrefourPakistanProvider implements RetailerProvider {
  id = 'carrefour-pk';
  name = 'Carrefour Pakistan';
  country = 'PK';
  currency = 'PKR';
  website = 'https://www.carrefour.pk';
  logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrefour_logo.svg';

  private stores: StoreLocation[] = [
    {
      id: 'carrefour-packages',
      retailerId: 'carrefour-pk',
      retailerName: 'Carrefour Pakistan',
      branchName: 'Packages Mall, Walton Road',
      address: 'Packages Mall, Walton Road, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4746,
      longitude: 74.3582,
      phone: '+92 42 111 752 927',
      openingHours: '10:00 AM - 11:00 PM',
      isOpen: true
    },
    {
      id: 'carrefour-fortress',
      retailerId: 'carrefour-pk',
      retailerName: 'Carrefour Pakistan',
      branchName: 'Fortress Stadium, Cantt',
      address: 'Fortress Stadium, Cantt, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.5342,
      longitude: 74.3644,
      phone: '+92 42 111 752 927',
      openingHours: '10:00 AM - 11:30 PM',
      isOpen: true
    },
    {
      id: 'carrefour-emporium',
      retailerId: 'carrefour-pk',
      retailerName: 'Carrefour Pakistan',
      branchName: 'Emporium Mall, Johar Town',
      address: 'Emporium Mall, Abdul Haque Rd, Johar Town, Lahore',
      city: 'Lahore',
      country: 'Pakistan',
      latitude: 31.4674,
      longitude: 74.2662,
      phone: '+92 42 111 752 927',
      openingHours: '10:00 AM - 11:00 PM',
      isOpen: true
    }
  ];

  private offers: RawProductOffer[] = [
    {
      id: 'crf-dalda-5l',
      retailerId: 'carrefour-pk',
      rawTitle: 'Dalda Cooking Oil 5 Liter Can',
      brand: 'Dalda',
      category: 'Cooking Oil',
      regularPrice: 3999,
      salePrice: 3499,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-25',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/dalda-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-sufi-canola-5l',
      retailerId: 'carrefour-pk',
      rawTitle: 'Sufi Canola Cooking Oil 5L Bottle',
      brand: 'Sufi',
      category: 'Cooking Oil',
      regularPrice: 3850,
      salePrice: 3349,
      packageSize: 5,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      validUntil: '2026-08-28',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/sufi-5l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-guard-rice-5kg',
      retailerId: 'carrefour-pk',
      rawTitle: 'Guard Super Kernel Supreme Basmati Rice 5kg',
      brand: 'Guard',
      category: 'Rice & Grains',
      regularPrice: 2850,
      salePrice: 2499,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      validUntil: '2026-08-30',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/guard-rice',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-sunridge-flour-10kg',
      retailerId: 'carrefour-pk',
      rawTitle: 'Sunridge Whole Wheat Atta Flour 10kg Bag',
      brand: 'Sunridge',
      category: 'Rice & Grains',
      regularPrice: 1750,
      salePrice: 1499,
      packageSize: 10,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      validUntil: '2026-08-27',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/sunridge-10kg',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-olpers-milk-1l',
      retailerId: 'carrefour-pk',
      rawTitle: 'Olper\'s Full Cream Milk 1L Pack (Pack of 12)',
      brand: 'Olper\'s',
      category: 'Dairy',
      regularPrice: 3720,
      salePrice: 3240,
      packageSize: 12,
      unit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      validUntil: '2026-08-25',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/olpers-12x1l',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-tapal-danedar-950g',
      retailerId: 'carrefour-pk',
      rawTitle: 'Tapal Danedar Black Tea Economy Pouch 950g',
      brand: 'Tapal',
      category: 'Beverages',
      regularPrice: 1950,
      salePrice: 1699,
      packageSize: 950,
      unit: 'g',
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
      validUntil: '2026-08-31',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/tapal-950g',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-rooh-afza-800ml',
      retailerId: 'carrefour-pk',
      rawTitle: 'Hamdard Rooh Afza Sharbat 800ml Bottle',
      brand: 'Rooh Afza',
      category: 'Beverages',
      regularPrice: 460,
      salePrice: 389,
      packageSize: 800,
      unit: 'ml',
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400',
      validUntil: '2026-08-28',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/rooh-afza',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-mitchells-ketchup',
      retailerId: 'carrefour-pk',
      rawTitle: 'Mitchell\'s Tomato Ketchup Pouch 800g',
      brand: 'Mitchell\'s',
      category: 'Grocery',
      regularPrice: 380,
      salePrice: 319,
      packageSize: 800,
      unit: 'g',
      imageUrl: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=400',
      validUntil: '2026-08-27',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/ketchup',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-chicken-boneless',
      retailerId: 'carrefour-pk',
      rawTitle: 'Fresh Boneless Chicken Breast Fillet 1kg',
      brand: 'Generic',
      category: 'Meat',
      regularPrice: 1150,
      salePrice: 990,
      packageSize: 1,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
      validUntil: '2026-08-25',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/chicken-boneless',
      verificationStatus: 'verified_today'
    },
    {
      id: 'crf-surf-excel-5kg',
      retailerId: 'carrefour-pk',
      rawTitle: 'Surf Excel Washing Powder Quick Wash 5kg Bucket',
      brand: 'Surf Excel',
      category: 'Household',
      regularPrice: 2800,
      salePrice: 2350,
      packageSize: 5,
      unit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
      validUntil: '2026-08-29',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/surf-excel-5kg',
      verificationStatus: 'verified_retailer'
    },
    {
      id: 'crf-colgate-140g',
      retailerId: 'carrefour-pk',
      rawTitle: 'Colgate Total 12 Clean Mint Toothpaste 140g',
      brand: 'Generic',
      category: 'Personal Care',
      regularPrice: 450,
      salePrice: 369,
      packageSize: 140,
      unit: 'g',
      imageUrl: 'https://images.unsplash.com/photo-1559671088-791e921d3f9a?w=400',
      validUntil: '2026-08-28',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk/offers/colgate',
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

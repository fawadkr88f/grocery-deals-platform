import { ProductDeal } from '../types';

export const FALLBACK_LOCATIONS = [
  // Pakistan Cities
  {
    address: 'DHA Phase 6, Lahore',
    formattedAddress: 'Defence Housing Authority Phase 6, Lahore, Punjab, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 31.4697,
    longitude: 74.4107
  },
  {
    address: 'Gulberg III, Lahore',
    formattedAddress: 'Gulberg III, Main Boulevard, Lahore, Punjab, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 31.5204,
    longitude: 74.3587
  },
  {
    address: 'Clifton, Karachi',
    formattedAddress: 'Clifton Block 4, Karachi, Sindh, Pakistan',
    city: 'Karachi',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 24.8138,
    longitude: 67.0299
  },
  {
    address: 'F-7 Markaz, Islamabad',
    formattedAddress: 'F-7 Markaz, Jinnah Super, Islamabad, Pakistan',
    city: 'Islamabad',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 33.7200,
    longitude: 73.0551
  },
  // Germany / Europe
  {
    address: 'Frankfurt am Main, Germany',
    formattedAddress: 'Frankfurt am Main, Hesse, Germany',
    city: 'Frankfurt am Main',
    country: 'Germany',
    countryCode: 'DE',
    latitude: 50.1109,
    longitude: 8.6821
  },
  {
    address: 'Berlin Mitte, Germany',
    formattedAddress: 'Mitte, Berlin, Germany',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    latitude: 52.5200,
    longitude: 13.4050
  },
  {
    address: 'Munich, Germany',
    formattedAddress: 'Marienplatz, Munich, Bavaria, Germany',
    city: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    latitude: 48.1351,
    longitude: 11.5820
  },
  // United Kingdom
  {
    address: 'London, UK',
    formattedAddress: 'Oxford Street, London, Greater London, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    latitude: 51.5074,
    longitude: -0.1278
  },
  {
    address: 'Manchester, UK',
    formattedAddress: 'Manchester, Greater Manchester, England, United Kingdom',
    city: 'Manchester',
    country: 'United Kingdom',
    countryCode: 'GB',
    latitude: 53.4808,
    longitude: -2.2426
  },
  // UAE / Middle East
  {
    address: 'Dubai Marina, UAE',
    formattedAddress: 'Dubai Marina, Dubai, United Arab Emirates',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    latitude: 25.0805,
    longitude: 55.1403
  },
  // USA
  {
    address: 'New York, NY, USA',
    formattedAddress: 'Broadway, New York, NY 10007, USA',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    latitude: 40.7128,
    longitude: -74.0060
  }
];

export const POPULAR_DAILY_ESSENTIALS: string[] = [
  'Cooking Oil 5L',
  'Wheat Atta 10kg',
  'Basmati Rice 5kg',
  'Full Cream Milk 1L',
  'Farm Fresh Eggs 12',
  'Tapal Danedar Tea 950g',
  'White Refined Sugar 5kg',
  'Fresh Chicken 1kg',
  'Potatoes (Aloo) 5kg',
  'Onions (Piyaz) 5kg',
  'Tomatoes 2kg',
  'Surf Excel Detergent 5kg',
  'Dettol Soap Pack',
  'Shan Biryani Masala',
  'National Iodized Salt 800g',
  'Lurpak Butter 200g',
  'Colgate Toothpaste 140g',
  'Harpic Toilet Cleaner 1L'
];

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

export const FALLBACK_DEALS_CATALOG: ProductDeal[] = [
  // 1. GERMANY & EUROPE DEALS (EUR €)
  {
    id: 'rewe-deal-bio-milch-1l',
    product: {
      id: 'p-rewe-bio-milch-1l',
      name: 'REWE Bio Frische Vollmilch 3.8% Fett 1L',
      brand: 'REWE Bio',
      category: 'Dairy',
      packageSize: 1,
      unit: 'L',
      normalizedQuantity: 1,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'
    },
    store: {
      id: 'rewe-frankfurt-zeil',
      retailerId: 'rewe-de',
      name: 'REWE City Frankfurt',
      branch: 'Zeil 116-126, Frankfurt am Main',
      distanceKm: 0.8,
      address: 'Zeil 116, 60313 Frankfurt am Main, Germany',
      latitude: 50.1145,
      longitude: 8.6860
    },
    pricing: {
      regularPrice: 1.69,
      salePrice: 1.19,
      savings: 0.50,
      discountPercent: 29.6,
      currency: 'EUR',
      unitPrice: 1.19,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.rewe.de',
      lastVerified: new Date().toISOString()
    },
    dealScore: 98.2
  },
  {
    id: 'aldi-deal-kerrygold-butter',
    product: {
      id: 'p-kerrygold-butter-250g',
      name: 'Kerrygold Original Irische Butter 250g',
      brand: 'Kerrygold',
      category: 'Dairy',
      packageSize: 250,
      unit: 'g',
      normalizedQuantity: 0.25,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400'
    },
    store: {
      id: 'aldi-frankfurt-center',
      retailerId: 'aldi-de',
      name: 'ALDI SÜD',
      branch: 'Schillerstraße 12, Frankfurt am Main',
      distanceKm: 0.9,
      address: 'Schillerstraße 12, 60313 Frankfurt am Main, Germany',
      latitude: 50.1139,
      longitude: 8.6789
    },
    pricing: {
      regularPrice: 3.29,
      salePrice: 2.22,
      savings: 1.07,
      discountPercent: 32.5,
      currency: 'EUR',
      unitPrice: 8.88,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-29',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.aldi-sued.de',
      lastVerified: new Date().toISOString()
    },
    dealScore: 99.4
  },
  {
    id: 'lidl-deal-olivenoel-750ml',
    product: {
      id: 'p-lidl-olivenoel-750ml',
      name: 'Primadonna Natives Olivenöl Extra 750ml',
      brand: 'Primadonna',
      category: 'Cooking Oil',
      packageSize: 750,
      unit: 'ml',
      normalizedQuantity: 0.75,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
    },
    store: {
      id: 'lidl-frankfurt-kaiser',
      retailerId: 'lidl-de',
      name: 'Lidl Frankfurt',
      branch: 'Kaiserstraße 54, Frankfurt am Main',
      distanceKm: 1.2,
      address: 'Kaiserstraße 54, 60329 Frankfurt am Main, Germany',
      latitude: 50.1082,
      longitude: 8.6675
    },
    pricing: {
      regularPrice: 8.99,
      salePrice: 6.99,
      savings: 2.00,
      discountPercent: 22.2,
      currency: 'EUR',
      unitPrice: 9.32,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-30',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.lidl.de',
      lastVerified: new Date().toISOString()
    },
    dealScore: 96.0
  },
  {
    id: 'edeka-deal-lavazza-kaffee',
    product: {
      id: 'p-lavazza-crema-1kg',
      name: 'Lavazza Caffè Crema Ganze Kaffeebohnen 1kg',
      brand: 'Lavazza',
      category: 'Beverages',
      packageSize: 1,
      unit: 'kg',
      normalizedQuantity: 1,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400'
    },
    store: {
      id: 'edeka-frankfurt-mainzer',
      retailerId: 'edeka-de',
      name: 'EDEKA Center',
      branch: 'Mainzer Landstraße 330, Frankfurt am Main',
      distanceKm: 2.1,
      address: 'Mainzer Landstraße 330, 60326 Frankfurt am Main, Germany',
      latitude: 50.1065,
      longitude: 8.6480
    },
    pricing: {
      regularPrice: 15.99,
      salePrice: 10.99,
      savings: 5.00,
      discountPercent: 31.3,
      currency: 'EUR',
      unitPrice: 10.99,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-31',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://www.edeka.de',
      lastVerified: new Date().toISOString()
    },
    dealScore: 98.7
  },

  // 2. UNITED KINGDOM DEALS (GBP £)
  {
    id: 'tesco-deal-milk-4pints',
    product: {
      id: 'p-tesco-whole-milk-227l',
      name: 'Tesco British Whole Milk 4 Pints (2.27L)',
      brand: 'Tesco',
      category: 'Dairy',
      packageSize: 2.27,
      unit: 'L',
      normalizedQuantity: 2.27,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'
    },
    store: {
      id: 'tesco-london-piccadilly',
      retailerId: 'tesco-uk',
      name: 'Tesco Express London',
      branch: 'Regent Street, London',
      distanceKm: 0.6,
      address: '17-25 Regent St, London SW1Y 4LR, United Kingdom',
      latitude: 51.5090,
      longitude: -0.1340
    },
    pricing: {
      regularPrice: 1.85,
      salePrice: 1.45,
      savings: 0.40,
      discountPercent: 21.6,
      currency: 'GBP',
      unitPrice: 0.64,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.tesco.com',
      lastVerified: new Date().toISOString()
    },
    dealScore: 97.0
  },
  {
    id: 'sainsburys-deal-lurpak',
    product: {
      id: 'p-lurpak-spreadable-500g-uk',
      name: 'Lurpak Slightly Salted Spreadable Butter 500g',
      brand: 'Lurpak',
      category: 'Dairy',
      packageSize: 500,
      unit: 'g',
      normalizedQuantity: 0.5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400'
    },
    store: {
      id: 'sainsburys-london-holborn',
      retailerId: 'sainsburys-uk',
      name: 'Sainsbury\'s Central',
      branch: 'Holborn Circus, London',
      distanceKm: 1.4,
      address: '129-133 Kingsway, London WC2B 6NH, United Kingdom',
      latitude: 51.5165,
      longitude: -0.1195
    },
    pricing: {
      regularPrice: 4.50,
      salePrice: 3.25,
      savings: 1.25,
      discountPercent: 27.8,
      currency: 'GBP',
      unitPrice: 6.50,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-29',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://www.sainsburys.co.uk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 98.4
  },

  // 3. PAKISTAN DEALS (PKR Rs.)
  {
    id: 'crf-deal-dalda-5l',
    product: {
      id: 'p-dalda-5l',
      name: 'Dalda Cooking Oil 5L Can',
      brand: 'Dalda',
      category: 'Cooking Oil',
      packageSize: 5,
      unit: 'L',
      normalizedQuantity: 5,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
    },
    store: {
      id: 'crf-packages',
      retailerId: 'carrefour-pk',
      name: 'Carrefour Pakistan',
      branch: 'Packages Mall, Walton Road',
      distanceKm: 5.4,
      address: 'Packages Mall, Walton Road, Lahore',
      latitude: 31.4746,
      longitude: 74.3582
    },
    pricing: {
      regularPrice: 3999,
      salePrice: 3499,
      savings: 500,
      discountPercent: 12.5,
      currency: 'PKR',
      unitPrice: 699.8,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-25',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 92.5
  },
  {
    id: 'mtr-deal-sufi-5l',
    product: {
      id: 'p-sufi-5l',
      name: 'Sufi Cooking Oil 5L Bottle',
      brand: 'Sufi',
      category: 'Cooking Oil',
      packageSize: 5,
      unit: 'L',
      normalizedQuantity: 5,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
    },
    store: {
      id: 'metro-airport',
      retailerId: 'metro-pk',
      name: 'Metro Cash & Carry',
      branch: 'Airport Road Branch',
      distanceKm: 3.8,
      address: 'Airport Road, Near Bhatta Chowk, Cantt, Lahore',
      latitude: 31.5034,
      longitude: 74.4082
    },
    pricing: {
      regularPrice: 3850,
      salePrice: 3299,
      savings: 551,
      discountPercent: 14.3,
      currency: 'PKR',
      unitPrice: 659.8,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-26',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 95.0
  },
  {
    id: 'imz-deal-falak-rice-5kg',
    product: {
      id: 'p-falak-5kg',
      name: 'Falak Extreme Basmati Rice 5kg Bag',
      brand: 'Falak',
      category: 'Rice & Grains',
      packageSize: 5,
      unit: 'kg',
      normalizedQuantity: 5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
    },
    store: {
      id: 'imtiaz-y-block',
      retailerId: 'imtiaz-pk',
      name: 'Imtiaz Super Market',
      branch: 'DHA Phase 3 Y Block',
      distanceKm: 3.5,
      address: 'Commercial Area, Phase 3, DHA, Lahore',
      latitude: 31.4789,
      longitude: 74.3762
    },
    pricing: {
      regularPrice: 2950,
      salePrice: 2450,
      savings: 500,
      discountPercent: 16.9,
      currency: 'PKR',
      unitPrice: 490.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-29',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 97.4
  },
  {
    id: 'alf-deal-meezan-5l',
    product: {
      id: 'p-meezan-5l',
      name: 'Meezan Cooking Oil 5L Bottle',
      brand: 'Meezan',
      category: 'Cooking Oil',
      packageSize: 5,
      unit: 'L',
      normalizedQuantity: 5,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
    },
    store: {
      id: 'alfatah-dha6',
      retailerId: 'al-fatah',
      name: 'Al-Fatah Supermarket',
      branch: 'DHA Phase 6 Flagship',
      distanceKm: 1.4,
      address: 'Main Boulevard, Phase 6, DHA, Lahore',
      latitude: 31.4721,
      longitude: 74.4215
    },
    pricing: {
      regularPrice: 3799,
      salePrice: 3399,
      savings: 400,
      discountPercent: 10.5,
      currency: 'PKR',
      unitPrice: 679.8,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-27',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 94.2
  }
];

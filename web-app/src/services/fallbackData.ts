import { ProductDeal } from '../types';

export const FALLBACK_LOCATIONS = [
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
    address: 'DHA Phase 5, Lahore',
    formattedAddress: 'Defence Housing Authority Phase 5, Lahore, Punjab, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 31.4682,
    longitude: 74.3912
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
    address: 'Johar Town, Lahore',
    formattedAddress: 'Johar Town Phase 2, Lahore, Punjab, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 31.4697,
    longitude: 74.2728
  },
  {
    address: 'Model Town, Lahore',
    formattedAddress: 'Model Town Block C, Lahore, Punjab, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 31.4886,
    longitude: 74.3218
  },
  {
    address: 'Bahria Town, Lahore',
    formattedAddress: 'Bahria Town Sector C, Lahore, Punjab, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 31.3653,
    longitude: 74.1802
  },
  {
    address: 'Mall of Lahore, Cantt',
    formattedAddress: 'Tufail Road, Lahore Cantonment, Lahore, Pakistan',
    city: 'Lahore',
    country: 'Pakistan',
    countryCode: 'PK',
    latitude: 31.5422,
    longitude: 74.3756
  },
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
    address: 'London, UK',
    formattedAddress: 'London, Greater London, England, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    latitude: 51.5074,
    longitude: -0.1278
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
  // 1. COOKING OILS & GHEE
  {
    id: 'deal-dalda-5l-crf',
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
    id: 'deal-sufi-5l-mtr',
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
    id: 'deal-meezan-5l-alf',
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
  },
  {
    id: 'deal-canolive-5l-alf',
    product: {
      id: 'p-canolive-5l',
      name: 'Canolive Premium Cooking Oil 5L',
      brand: 'Canolive',
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
      regularPrice: 4100,
      salePrice: 3599,
      savings: 501,
      discountPercent: 12.2,
      currency: 'PKR',
      unitPrice: 719.8,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 93.0
  },
  // 2. RICE & FLOUR (ATTA)
  {
    id: 'deal-sunridge-flour-10kg-crf',
    product: {
      id: 'p-sunridge-10kg',
      name: 'Sunridge Whole Wheat Chakki Atta Flour 10kg',
      brand: 'Sunridge',
      category: 'Rice & Grains',
      packageSize: 10,
      unit: 'kg',
      normalizedQuantity: 10,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
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
      regularPrice: 1750,
      salePrice: 1499,
      savings: 251,
      discountPercent: 14.3,
      currency: 'PKR',
      unitPrice: 149.9,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-27',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 95.2
  },
  {
    id: 'deal-falak-rice-5kg-imz',
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
  // 3. DAIRY & EGGS
  {
    id: 'deal-olpers-milk-12x1l',
    product: {
      id: 'p-olpers-12x1l',
      name: 'Olper\'s Pure Full Cream Milk 1L (Carton of 12)',
      brand: 'Olper\'s',
      category: 'Dairy',
      packageSize: 12,
      unit: 'L',
      normalizedQuantity: 12,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'
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
      regularPrice: 3720,
      salePrice: 3240,
      savings: 480,
      discountPercent: 12.9,
      currency: 'PKR',
      unitPrice: 270.0,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-25',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 91.5
  },
  {
    id: 'deal-anhar-eggs-12-alf',
    product: {
      id: 'p-anhar-eggs-12',
      name: 'Anhar Farm Fresh Organic Brown Eggs (Pack of 12)',
      brand: 'Anhar',
      category: 'Fresh Produce',
      packageSize: 12,
      unit: 'pack',
      normalizedQuantity: 12,
      normalizedUnit: 'unit',
      imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400'
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
      regularPrice: 480,
      salePrice: 410,
      savings: 70,
      discountPercent: 14.6,
      currency: 'PKR',
      unitPrice: 34.1,
      unit: 'unit'
    },
    offer: {
      validUntil: '2026-08-24',
      verificationStatus: 'verified_today',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 96.0
  },
  // 4. TEA, BEVERAGES & SUGAR
  {
    id: 'deal-tapal-tea-950g-mtr',
    product: {
      id: 'p-tapal-950g',
      name: 'Tapal Danedar Black Tea Economy Pouch 950g',
      brand: 'Tapal',
      category: 'Beverages',
      packageSize: 950,
      unit: 'g',
      normalizedQuantity: 0.95,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400'
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
      regularPrice: 1950,
      salePrice: 1649,
      savings: 301,
      discountPercent: 15.4,
      currency: 'PKR',
      unitPrice: 1735.8,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-25',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 95.8
  },
  {
    id: 'deal-sugar-5kg-mtr',
    product: {
      id: 'p-sugar-5kg',
      name: 'Refined White Sugar Fine Crystal 5kg Bag',
      brand: 'Generic',
      category: 'Grocery',
      packageSize: 5,
      unit: 'kg',
      normalizedQuantity: 5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400'
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
      regularPrice: 850,
      salePrice: 720,
      savings: 130,
      discountPercent: 15.3,
      currency: 'PKR',
      unitPrice: 144.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-25',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 94.6
  },
  // 5. HOUSEHOLD & PERSONAL CARE
  {
    id: 'deal-surf-excel-5kg-crf',
    product: {
      id: 'p-surf-5kg',
      name: 'Surf Excel Washing Powder Quick Wash 5kg Bucket',
      brand: 'Surf Excel',
      category: 'Household',
      packageSize: 5,
      unit: 'kg',
      normalizedQuantity: 5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400'
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
      regularPrice: 2800,
      salePrice: 2350,
      savings: 450,
      discountPercent: 16.1,
      currency: 'PKR',
      unitPrice: 470.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-29',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 94.0
  },
  {
    id: 'deal-dettol-soap-alf',
    product: {
      id: 'p-dettol-soap',
      name: 'Dettol Original Antibacterial Soap (Buy 3 Get 1 Free)',
      brand: 'Dettol',
      category: 'Personal Care',
      packageSize: 4,
      unit: 'pack',
      normalizedQuantity: 4,
      normalizedUnit: 'unit',
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'
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
      regularPrice: 520,
      salePrice: 420,
      savings: 100,
      discountPercent: 19.2,
      currency: 'PKR',
      unitPrice: 105.0,
      unit: 'unit'
    },
    offer: {
      validUntil: '2026-08-30',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 99.1
  }
];

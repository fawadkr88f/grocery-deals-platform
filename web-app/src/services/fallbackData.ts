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
  // =========================================================================
  // 1. CARREFOUR PAKISTAN OFFERS
  // =========================================================================
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
    id: 'crf-deal-sunridge-flour-10kg',
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
    id: 'crf-deal-guard-rice-5kg',
    product: {
      id: 'p-guard-5kg',
      name: 'Guard Super Kernel Supreme Basmati Rice 5kg',
      brand: 'Guard',
      category: 'Rice & Grains',
      packageSize: 5,
      unit: 'kg',
      normalizedQuantity: 5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
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
      regularPrice: 2850,
      salePrice: 2499,
      savings: 351,
      discountPercent: 12.3,
      currency: 'PKR',
      unitPrice: 499.8,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-30',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 91.0
  },
  {
    id: 'crf-deal-olpers-milk-12x1l',
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
    id: 'crf-deal-chicken-boneless',
    product: {
      id: 'p-chicken-boneless-1kg',
      name: 'Fresh Boneless Chicken Breast Fillet 1kg',
      brand: 'Generic',
      category: 'Meat',
      packageSize: 1,
      unit: 'kg',
      normalizedQuantity: 1,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'
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
      regularPrice: 1150,
      salePrice: 990,
      savings: 160,
      discountPercent: 13.9,
      currency: 'PKR',
      unitPrice: 990.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-25',
      verificationStatus: 'verified_today',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 92.8
  },
  {
    id: 'crf-deal-surf-excel-5kg',
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
    id: 'crf-deal-colgate-140g',
    product: {
      id: 'p-colgate-140g',
      name: 'Colgate Total 12 Clean Mint Toothpaste 140g',
      brand: 'Generic',
      category: 'Personal Care',
      packageSize: 140,
      unit: 'g',
      normalizedQuantity: 0.14,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1559671088-791e921d3f9a?w=400'
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
      regularPrice: 450,
      salePrice: 369,
      savings: 81,
      discountPercent: 18.0,
      currency: 'PKR',
      unitPrice: 2635.7,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'api',
      sourceUrl: 'https://www.carrefour.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 96.0
  },

  // =========================================================================
  // 2. METRO CASH & CARRY OFFERS
  // =========================================================================
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
    id: 'mtr-deal-tapal-tea-950g',
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
    id: 'mtr-deal-sugar-5kg',
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
  {
    id: 'mtr-deal-ariel-6kg',
    product: {
      id: 'p-ariel-6kg',
      name: 'Ariel Original Washing Powder 6kg Mega Bag',
      brand: 'Ariel',
      category: 'Household',
      packageSize: 6,
      unit: 'kg',
      normalizedQuantity: 6,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400'
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
      regularPrice: 3300,
      salePrice: 2799,
      savings: 501,
      discountPercent: 15.2,
      currency: 'PKR',
      unitPrice: 466.5,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-31',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 94.8
  },
  {
    id: 'mtr-deal-daal-chana-1kg',
    product: {
      id: 'p-daal-chana-1kg',
      name: 'Premium Washed Daal Chana Pulse 1kg',
      brand: 'National',
      category: 'Rice & Grains',
      packageSize: 1,
      unit: 'kg',
      normalizedQuantity: 1,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
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
      regularPrice: 340,
      salePrice: 289,
      savings: 51,
      discountPercent: 15.0,
      currency: 'PKR',
      unitPrice: 289.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.metro.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 92.0
  },

  // =========================================================================
  // 3. AL-FATAH SUPERMARKET OFFERS
  // =========================================================================
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
  },
  {
    id: 'alf-deal-canolive-5l',
    product: {
      id: 'p-canolive-5l',
      name: 'Canolive Premium Cooking Oil 5L Can',
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
  {
    id: 'alf-deal-anhar-eggs-12',
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
  {
    id: 'alf-deal-potatoes-5kg',
    product: {
      id: 'p-potatoes-5kg',
      name: 'Farm Fresh Potatoes (Aloo) 5kg Net Bag',
      brand: 'Generic',
      category: 'Fresh Produce',
      packageSize: 5,
      unit: 'kg',
      normalizedQuantity: 5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'
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
      regularPrice: 450,
      salePrice: 375,
      savings: 75,
      discountPercent: 16.7,
      currency: 'PKR',
      unitPrice: 75.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-23',
      verificationStatus: 'verified_today',
      sourceType: 'web_catalog',
      sourceUrl: 'https://alfatah.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 98.0
  },
  {
    id: 'alf-deal-dettol-soap',
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
  },

  // =========================================================================
  // 4. IMTIAZ SUPER MARKET OFFERS
  // =========================================================================
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
    id: 'imz-deal-shan-biryani-masala',
    product: {
      id: 'p-shan-biryani',
      name: 'Shan Special Bombay Biryani Masala (Pack of 2)',
      brand: 'Shan',
      category: 'Grocery',
      packageSize: 120,
      unit: 'g',
      normalizedQuantity: 0.12,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400'
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
      regularPrice: 260,
      salePrice: 215,
      savings: 45,
      discountPercent: 17.3,
      currency: 'PKR',
      unitPrice: 1791.7,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-29',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 97.8
  },
  {
    id: 'imz-deal-onions-5kg',
    product: {
      id: 'p-onions-5kg',
      name: 'Fresh Red Onions (Piyaz) 5kg Bag',
      brand: 'Generic',
      category: 'Fresh Produce',
      packageSize: 5,
      unit: 'kg',
      normalizedQuantity: 5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400'
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
      regularPrice: 550,
      salePrice: 460,
      savings: 90,
      discountPercent: 16.4,
      currency: 'PKR',
      unitPrice: 92.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-24',
      verificationStatus: 'verified_today',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 97.2
  },
  {
    id: 'imz-deal-eva-oil-5l',
    product: {
      id: 'p-eva-5l',
      name: 'Eva Canola Cooking Oil 5L Bottle',
      brand: 'Generic',
      category: 'Cooking Oil',
      packageSize: 5,
      unit: 'L',
      normalizedQuantity: 5,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
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
      regularPrice: 3890,
      salePrice: 3350,
      savings: 540,
      discountPercent: 13.9,
      currency: 'PKR',
      unitPrice: 670.0,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'flyer',
      sourceUrl: 'https://www.imtiaz.com.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 94.5
  },

  // =========================================================================
  // 5. JALAL SONS OFFERS
  // =========================================================================
  {
    id: 'js-deal-fresh-chicken-1kg',
    product: {
      id: 'p-chicken-1kg',
      name: 'Fresh Whole Chicken Dressed Cut 1kg',
      brand: 'Generic',
      category: 'Meat',
      packageSize: 1,
      unit: 'kg',
      normalizedQuantity: 1,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'
    },
    store: {
      id: 'jalalsons-dha5',
      retailerId: 'jalal-sons',
      name: 'Jalal Sons',
      branch: 'DHA Phase 5 Branch',
      distanceKm: 2.1,
      address: 'Commercial Area, Phase 5, DHA, Lahore',
      latitude: 31.4679,
      longitude: 74.3965
    },
    pricing: {
      regularPrice: 680,
      salePrice: 585,
      savings: 95,
      discountPercent: 14.0,
      currency: 'PKR',
      unitPrice: 585.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-22',
      verificationStatus: 'verified_today',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 95.5
  },
  {
    id: 'js-deal-kashmir-ghee-5kg',
    product: {
      id: 'p-kashmir-5kg',
      name: 'Kashmir Banaspati Ghee 5kg Tin',
      brand: 'Kashmir',
      category: 'Cooking Oil',
      packageSize: 5,
      unit: 'kg',
      normalizedQuantity: 5,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
    },
    store: {
      id: 'jalalsons-dha5',
      retailerId: 'jalal-sons',
      name: 'Jalal Sons',
      branch: 'DHA Phase 5 Branch',
      distanceKm: 2.1,
      address: 'Commercial Area, Phase 5, DHA, Lahore',
      latitude: 31.4679,
      longitude: 74.3965
    },
    pricing: {
      regularPrice: 3650,
      salePrice: 3290,
      savings: 360,
      discountPercent: 9.9,
      currency: 'PKR',
      unitPrice: 658.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 91.0
  },
  {
    id: 'js-deal-lurpak-butter-200g',
    product: {
      id: 'p-lurpak-200g',
      name: 'Lurpak Pure Danish Salted Butter 200g',
      brand: 'Generic',
      category: 'Dairy',
      packageSize: 200,
      unit: 'g',
      normalizedQuantity: 0.2,
      normalizedUnit: 'kg',
      imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400'
    },
    store: {
      id: 'jalalsons-dha5',
      retailerId: 'jalal-sons',
      name: 'Jalal Sons',
      branch: 'DHA Phase 5 Branch',
      distanceKm: 2.1,
      address: 'Commercial Area, Phase 5, DHA, Lahore',
      latitude: 31.4679,
      longitude: 74.3965
    },
    pricing: {
      regularPrice: 950,
      salePrice: 820,
      savings: 130,
      discountPercent: 13.7,
      currency: 'PKR',
      unitPrice: 4100.0,
      unit: 'kg'
    },
    offer: {
      validUntil: '2026-08-28',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://jalalsons.com.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 92.5
  },

  // =========================================================================
  // 6. GREEN VALLEY HYPERMARKET OFFERS
  // =========================================================================
  {
    id: 'gv-deal-habib-oil-5l',
    product: {
      id: 'p-habib-5l',
      name: 'Habib Premium Cooking Oil 5L Bottle',
      brand: 'Generic',
      category: 'Cooking Oil',
      packageSize: 5,
      unit: 'L',
      normalizedQuantity: 5,
      normalizedUnit: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
    },
    store: {
      id: 'gv-mall-of-lahore',
      retailerId: 'green-valley',
      name: 'Green Valley Hypermarket',
      branch: 'Mall of Lahore, Cantt',
      distanceKm: 8.2,
      address: 'Mall of Lahore, 13 Tufail Road, Lahore Cantt, Lahore',
      latitude: 31.5424,
      longitude: 74.3758
    },
    pricing: {
      regularPrice: 3950,
      salePrice: 3450,
      savings: 500,
      discountPercent: 12.7,
      currency: 'PKR',
      unitPrice: 690.0,
      unit: 'L'
    },
    offer: {
      validUntil: '2026-08-26',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://greenvalley.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 93.5
  },
  {
    id: 'gv-deal-dove-soap',
    product: {
      id: 'p-dove-soap',
      name: 'Dove Beauty Moisture Bar (Pack of 3 x 135g)',
      brand: 'Generic',
      category: 'Personal Care',
      packageSize: 3,
      unit: 'pack',
      normalizedQuantity: 3,
      normalizedUnit: 'unit',
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'
    },
    store: {
      id: 'gv-mall-of-lahore',
      retailerId: 'green-valley',
      name: 'Green Valley Hypermarket',
      branch: 'Mall of Lahore, Cantt',
      distanceKm: 8.2,
      address: 'Mall of Lahore, 13 Tufail Road, Lahore Cantt, Lahore',
      latitude: 31.5424,
      longitude: 74.3758
    },
    pricing: {
      regularPrice: 850,
      salePrice: 699,
      savings: 151,
      discountPercent: 17.8,
      currency: 'PKR',
      unitPrice: 233.0,
      unit: 'unit'
    },
    offer: {
      validUntil: '2026-08-29',
      verificationStatus: 'verified_retailer',
      sourceType: 'web_catalog',
      sourceUrl: 'https://greenvalley.pk',
      lastVerified: new Date().toISOString()
    },
    dealScore: 96.5
  }
];

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodedLocation {
  address: string;
  formattedAddress: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface StoreLocation {
  id: string;
  retailerId: string;
  retailerName: string;
  branchName: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  phone?: string;
  openingHours?: string;
  isOpen?: boolean;
}

export type UnitType = 'L' | 'kg' | 'g' | 'ml' | 'unit' | 'pcs' | 'pack';

export interface NormalizedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  variant?: string;
  packageSize: number;
  unit: UnitType;
  normalizedQuantity: number; // in base units (L or kg)
  normalizedUnit: 'L' | 'kg' | 'unit';
  barcodeGtin?: string;
  imageUrl?: string;
}

export type VerificationStatus = 
  | 'verified_retailer' 
  | 'verified_today' 
  | 'promotional_catalog' 
  | 'price_may_have_changed'
  | 'unverified';

export interface OfferPricing {
  regularPrice: number;
  salePrice: number;
  savings: number;
  discountPercent: number;
  currency: string;
  unitPrice: number; // e.g. 699.80 (price per Litre/kg)
  unit: string;
}

export interface OfferDetails {
  validUntil?: string | null;
  verificationStatus: VerificationStatus;
  sourceType: 'api' | 'flyer' | 'web_catalog' | 'user';
  sourceUrl?: string;
  lastVerified: string;
}

export interface ProductDeal {
  id: string;
  product: NormalizedProduct;
  store: {
    id: string;
    retailerId: string;
    name: string;
    branch?: string;
    distanceKm: number;
    address: string;
    latitude: number;
    longitude: number;
    logoUrl?: string;
  };
  pricing: OfferPricing;
  offer: OfferDetails;
  dealScore: number;
}

export interface RawProductOffer {
  id?: string;
  retailerId?: string;
  storeId?: string;
  rawTitle: string;
  brand?: string;
  category: string;
  regularPrice: number;
  salePrice: number;
  packageSize?: number;
  unit?: UnitType;
  imageUrl?: string;
  validUntil?: string | null;
  sourceType: 'api' | 'flyer' | 'web_catalog' | 'user';
  sourceUrl?: string;
  verificationStatus: VerificationStatus;
}

export interface ShoppingListItem {
  name: string;
  quantity?: number;
  preferredBrand?: string;
}

export interface ShoppingOptimizationResult {
  location: {
    address?: string;
    latitude: number;
    longitude: number;
    radiusKm: number;
  };
  totalItemsRequested: number;
  singleStoreBest?: {
    retailerId: string;
    retailerName: string;
    storeAddress: string;
    distanceKm: number;
    totalCost: number;
    itemsFound: number;
    totalItems: number;
    missingItems: string[];
    itemBreakdown: Array<{
      item: string;
      productName: string;
      brand: string;
      price: number;
      regularPrice: number;
      savings: number;
    }>;
  };
  multiStoreOptimal: {
    totalCost: number;
    totalSavingsVsSingleStore: number;
    totalSavingsVsRegularPrice: number;
    storeCount: number;
    stores: Array<{
      retailerId: string;
      retailerName: string;
      storeAddress: string;
      distanceKm: number;
      subtotal: number;
      items: Array<{
        item: string;
        productName: string;
        brand: string;
        price: number;
        regularPrice: number;
        savings: number;
      }>;
    }>;
  };
  tradeoffRecommendation: string;
}

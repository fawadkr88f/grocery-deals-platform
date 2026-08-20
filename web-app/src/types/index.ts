export interface LocationState {
  address: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
}

export interface NormalizedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  variant?: string;
  packageSize: number;
  unit: string;
  normalizedQuantity: number;
  normalizedUnit: 'L' | 'kg' | 'unit';
  imageUrl?: string;
}

export interface OfferPricing {
  regularPrice: number;
  salePrice: number;
  savings: number;
  discountPercent: number;
  currency: string;
  unitPrice: number;
  unit: string;
}

export interface OfferDetails {
  validUntil?: string | null;
  verificationStatus: 
    | 'verified_retailer' 
    | 'verified_today' 
    | 'promotional_catalog' 
    | 'price_may_have_changed'
    | 'unverified';
  sourceType: string;
  sourceUrl?: string;
  lastVerified: string;
}

export interface StoreInfo {
  id: string;
  retailerId: string;
  name: string;
  branch?: string;
  distanceKm: number;
  address: string;
  latitude: number;
  longitude: number;
  logoUrl?: string;
}

export interface ProductDeal {
  id: string;
  product: NormalizedProduct;
  store: StoreInfo;
  pricing: OfferPricing;
  offer: OfferDetails;
  dealScore: number;
}

export interface FilterState {
  selectedRetailers: string[];
  minDiscount: number;
  sortBy: 'discount' | 'deal_score' | 'distance' | 'price_low' | 'price_high';
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
}

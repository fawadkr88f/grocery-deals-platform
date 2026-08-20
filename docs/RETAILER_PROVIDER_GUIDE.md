# Retailer Provider Development Guide

This guide explains how to add new supermarket and grocery retailer providers to the system without modifying core engine logic.

---

## 1. The `RetailerProvider` Contract

Every retailer provider implements the `RetailerProvider` interface defined in `backend/src/providers/types.ts`:

```typescript
export interface RetailerProvider {
  id: string;                      // e.g. 'rewe-de', 'tesco-uk', 'imtiaz-pk'
  name: string;                    // e.g. 'Rewe Supermarket'
  country: string;                 // ISO 2-letter country code, e.g. 'DE', 'GB', 'PK'
  website: string;
  currency: string;                // 'PKR', 'EUR', 'GBP', 'USD'

  // Search products matching search terms from this retailer
  searchProducts(query: string, category?: string): Promise<RawProductOffer[]>;

  // Fetch all active weekly promotional offers / flyer deals
  getOffers(): Promise<RawProductOffer[]>;

  // Fetch store branches and their spatial coordinates
  getStores(location?: Coordinates, radiusKm?: number): Promise<StoreLocation[]>;

  // Optional on-demand sync hook
  sync?(): Promise<SyncResult>;
}
```

---

## 2. Step-by-Step Implementation

### Step 1: Create Provider File
Create a new file in `backend/src/providers/` (e.g., `ReweGermanyProvider.ts` or `CarrefourPakistanProvider.ts`).

```typescript
import { RetailerProvider, RawProductOffer, StoreLocation, Coordinates } from './types';
import { calculateDistanceKm } from '../geolocation/distance';

export class ReweGermanyProvider implements RetailerProvider {
  id = 'rewe-de';
  name = 'REWE';
  country = 'DE';
  website = 'https://www.rewe.de';
  currency = 'EUR';

  private stores: StoreLocation[] = [
    {
      id: 'rewe-frankfurt-zeil',
      retailerId: 'rewe-de',
      retailerName: 'REWE City',
      branchName: 'Zeil 106, Frankfurt',
      address: 'Zeil 106, 60313 Frankfurt am Main',
      latitude: 50.1147,
      longitude: 8.6853,
      city: 'Frankfurt am Main',
      country: 'Germany'
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
    // Return structured promotional offers
    return [
      {
        rawTitle: 'Weihenstephan Frische Milch 1L',
        brand: 'Weihenstephan',
        category: 'Dairy',
        regularPrice: 1.79,
        salePrice: 1.19,
        packageSize: 1,
        unit: 'L',
        imageUrl: 'https://...',
        validUntil: '2026-08-30',
        sourceType: 'flyer',
        sourceUrl: 'https://www.rewe.de/angebote',
        verificationStatus: 'verified_retailer'
      }
    ];
  }

  async searchProducts(query: string): Promise<RawProductOffer[]> {
    const all = await this.getOffers();
    const q = query.toLowerCase();
    return all.filter(item => 
      item.rawTitle.toLowerCase().includes(q) || 
      item.brand?.toLowerCase().includes(q)
    );
  }
}
```

### Step 2: Register in Provider Registry
Open `backend/src/providers/index.ts` and add your provider:

```typescript
import { ProviderRegistry } from './registry';
import { ReweGermanyProvider } from './ReweGermanyProvider';

export function initializeProviders(registry: ProviderRegistry) {
  registry.register(new ReweGermanyProvider());
}
```

---

## 3. Product Normalization Pipeline Integration

When your provider returns `RawProductOffer`, the backend automatically:
1. Feeds the `rawTitle` through the **Product Normalizer** to extract brand, standard metric sizes, and clean titles.
2. Computes the **Unit Price** ($\text{Price}/L$ or $\text{Price}/kg$).
3. Calculates **Savings** & **Discount %**.
4. Attaches store proximity distance for the user's active coordinates.
5. Scores the deal using the **Deal Scoring Engine**.

---

## 4. Best Practices & Compliance
1. **No Bot Evasion**: Never incorporate code that attempts to crack CAPTCHAs, bypass Cloudflare bot mitigation, or forge fraudulent authentication headers.
2. **Graceful Failures**: If a public catalog endpoint fails or rate-limits, return cached or fallback records and log an error status to `data_sources` table.
3. **Respect robots.txt**: Follow crawl directives and cache heavily.

# System Architecture - Grocery Deals & Local Price Intelligence

## 1. High-Level Overview

The Local Grocery Discount & Price Finder is architected as a distributed, privacy-first local price intelligence system. The system separates the presentation layer (Browser Extension and Admin Web Portal) from the computational heavy-lifting (Backend Geocoding, Retailer Ingestion, Product Normalization, Distance Filtering, and Optimization).

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
│                                                             │
│  ┌───────────────────────────────┐  ┌────────────────────┐  │
│  │   Chrome / Chromium MV3       │  │ Admin Dashboard    │  │
│  │   Popup UI + Map + Optimizer  │  │ Management Portal  │  │
│  └──────────────┬────────────────┘  └─────────┬──────────┘  │
└─────────────────┼─────────────────────────────┼─────────────┘
                  │  HTTPS REST JSON            │
                  ▼                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API LAYER                         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Express / TypeScript Core Server                      │  │
│  │ ├─ Rate Limiting & Auth                              │  │
│  │ ├─ Geolocation & Spatial Clustering                  │  │
│  │ └─ Response Serializer & Cache                       │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│  ┌──────────────────────────┴────────────────────────────┐  │
│  │ Processing & Business Intelligence Engines            │  │
│  │ ├─ Product & Unit Normalization Engine                │  │
│  │ ├─ Haversine Spatial Distance Engine                  │  │
│  │ ├─ Deal Scoring & Value Ranker                        │  │
│  │ └─ Shopping List Multi-Store Basket Optimizer         │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│  ┌──────────────────────────┴────────────────────────────┐  │
│  │ Retailer Provider Ingestion Layer                     │  │
│  │ ├─ Provider Registry (Pluggable Architecture)         │  │
│  │ ├─ Official API Feeds                                 │  │
│  │ ├─ Public Digital Catalog / Flyer Parsers             │  │
│  │ └─ Provider Health & Verification Tracker             │  │
│  └──────────────────────────┬────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     STORAGE LAYER                           │
│                                                             │
│  ┌───────────────────────────────┐  ┌────────────────────┐  │
│  │ PostgreSQL + PostGIS (Prod)   │  │ In-Memory / SQLite │  │
│  │ Spatial indexes & migrations  │  │ Local Dev & Tests  │  │
│  └───────────────────────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Core Modules

### 2.1 Geolocation & Spatial Clustering
- **Address Resolution**: Converts human strings (`DHA Phase 6, Lahore`) into high-precision latitude/longitude coordinates via Nominatim (OpenStreetMap), Google Places, or fast-cached localized geocoders.
- **Haversine Distance**: Computes exact geodesic great-circle distances:
  $$d = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$
- **Radius Bounds**: Filters physical stores located within requested radii (1 km, 2 km, 5 km, 10 km, 15 km, 25 km, custom).

### 2.2 Product & Unit Normalization Engine
Different retailers represent the exact same SKU with diverse syntax:
- *Carrefour*: `Dalda Cooking Oil 5 Liter Can`
- *Metro*: `Dalda Pure Cooking Oil 5L Bottle`
- *Al-Fatah*: `Dalda Cooking Oil 5000 ml`

The Normalization Engine executes regex transformations to extract:
1. **Brand**: Canonical brand identification (`Dalda`, `Sufi`, `Meezan`, `Olper's`, `Tapal`, `Surf Excel`).
2. **Category**: Classification into primary food & household taxonomies.
3. **Quantity & Metric**: Normalizes volumetric (`ml`, `liters`, `L`) into standard litres ($L$), and mass (`g`, `grams`, `kg`) into kilograms ($kg$).
4. **Unit Price**: Calculates standard base comparison metrics ($\text{Price}/L$, $\text{Price}/kg$, $\text{Price}/\text{unit}$).

### 2.3 Deal Scoring & Value Ranker
Deals are evaluated through a multi-factor ranking algorithm:
$$\text{Score} = (\text{Relevance} \times 0.35) + (\text{Discount\%} \times 0.25) + (\text{Unit Savings} \times 0.20) + (\text{Proximity Score} \times 0.15) + (\text{Verification Bonus} \times 0.05)$$

This ensures that high savings on proximate stores are prioritized over distant or unverified offers.

### 2.4 Multi-Store Basket Optimizer
For grocery lists with multiple items:
1. Calculates **Single-Store Best**: Finds the single supermarket chain with the lowest total basket price.
2. Calculates **Multi-Store Optimal**: Aggregates cheapest prices across different stores, computing net potential savings against travel overhead.

---

## 3. Data Integrity & Legal Compliance
- Strictly operates on **publicly accessible promotional feeds**, official retailer endpoints, and verified promotional flyers.
- **Zero Captcha/Bypass**: Does not circumvent authentication walls or anti-bot protections.
- **Status Badging**: Every offer is tagged with its provenance:
  - `✓ Verified from retailer feed`
  - `✓ Verified today`
  - `ℹ Public promotional catalog`
  - `⚠ Price may have changed`

# Local Grocery Discount & Price Finder 🛒

> A modern Manifest V3 Browser Extension and Price Intelligence Platform that helps shoppers find the best supermarket deals, compare unit prices, and optimize grocery baskets across nearby stores.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?style=flat&logo=googlechrome&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind_css&logoColor=white)

---

## 🌟 Key Features

- 📍 **Intelligent Geolocation & Radius Filtering**: Search deals within 1 km, 2 km, 5 km, 10 km, 15 km, 25 km, or custom radii around any address (defaulting to Lahore, Pakistan: DHA Phase 6, Gulberg, Johar Town, etc., with global market support).
- 🏷️ **Real Grocery Deals & Price Comparison**: Regular price, sale price, absolute savings, discount percentage, and normalized price per unit ($\text{Rs.}/L$, $\text{Rs.}/kg$).
- 🏪 **Store Discovery**: Automatic distance calculation and directions to Carrefour, Metro Cash & Carry, Al-Fatah, Imtiaz Super Market, Jalal Sons, Green Valley, CSD, and more.
- 🗺️ **Interactive Store & Deal Map**: Dual List / Visual Map view with supermarket markers and offer counts.
- 🔥 **1-Click "Best Deals Near Me"**: Instant one-tap discovery for everyday essentials (Cooking Oil, Rice, Milk, Eggs, Tea, Sugar, Detergent).
- ⚖️ **Product Comparison Matrix**: Select and compare multiple products side-by-side.
- 📋 **Multi-Store Grocery List Optimizer**: Batch calculates total cost for your shopping list, comparing best single-store option vs. multi-store savings.
- 🛡️ **Verified Offer Badging**: Transparent verification status badges (`✓ Verified from retailer feed`, `ℹ Public catalog`, etc.).
- ⚙️ **Pluggable Retailer Provider Architecture**: Clean interface for adding new supermarket chains and global cities.

---

## 📂 Project Structure

```text
DiscounterExtension/
├── backend/                  # Node.js + TypeScript REST API Server
│   ├── src/
│   │   ├── api/              # Controllers & Express routes
│   │   ├── config/           # Currencies, countries, defaults
│   │   ├── database/         # Repositories & seed datasets
│   │   ├── geolocation/      # Geocoding & Haversine distance engine
│   │   ├── normalization/    # Brand, unit & price normalization engine
│   │   ├── providers/        # RetailerProvider implementations
│   │   ├── ranking/          # Multi-factor deal scoring algorithm
│   │   ├── services/         # Store discovery & multi-store optimizer
│   │   └── types/            # Domain TypeScript types
│   └── tests/                # Unit test suites (Vitest / Jest)
│
├── extension/                # Manifest V3 Chrome Extension (React + Vite)
│   ├── src/
│   │   ├── popup/            # Extension popup entry & components
│   │   ├── components/       # Search, Filter, ProductCard, MapView, Compare, ShoppingList
│   │   ├── services/         # API client & Chrome Storage
│   │   └── types/            # Extension UI models
│   ├── manifest.json         # MV3 Manifest
│   └── vite.config.ts
│
├── admin/                    # Admin Management Dashboard (React + Vite)
│   ├── src/
│   │   ├── pages/            # Retailers, Stores, Products, Offers, Sync
│   │   └── components/       # Metric cards & data grids
│   └── vite.config.ts
│
├── database/                 # PostgreSQL + PostGIS schema migrations
│   └── schema.sql
│
└── docs/                     # Full Technical Documentation
    ├── ARCHITECTURE.md
    ├── API.md
    ├── DATABASE.md
    ├── RETAILER_PROVIDER_GUIDE.md
    ├── DEPLOYMENT.md
    └── PRIVACY.md
```

---

## 🚀 Getting Started

### 1. Backend Server
```bash
cd backend
npm install
npm run dev
# Running on http://localhost:4000
```

### 2. Browser Extension
```bash
cd extension
npm install
npm run build
```
Load the `extension/dist` folder as an unpacked extension in Chrome (`chrome://extensions` $\to$ Developer mode $\to$ Load unpacked).

### 3. Admin Dashboard
```bash
cd admin
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 🧪 Running Tests
```bash
cd backend
npm test
```
Tests verify Haversine distance calculations, radius filtering, brand/size normalization, unit price calculations, deal ranking scoring, and multi-store basket optimizations.

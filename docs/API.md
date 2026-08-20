# REST API Documentation - Grocery Deals & Price Finder

Base URL: `http://localhost:4000/api`

---

## 1. Location & Geocoding

### `GET /api/location/search`
Resolves address strings into coordinates and suggests autocomplete matches.

**Query Parameters:**
- `query` (string, required): e.g. `DHA Phase 6, Lahore`

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "address": "DHA Phase 6, Lahore, Punjab, Pakistan",
      "city": "Lahore",
      "country": "Pakistan",
      "countryCode": "PK",
      "latitude": 31.4697,
      "longitude": 74.4107
    }
  ]
}
```

---

## 2. Store Discovery

### `GET /api/stores/nearby`
Finds all supermarket stores within a given radius of a latitude/longitude.

**Query Parameters:**
- `lat` (number, required): e.g. `31.4697`
- `lng` (number, required): e.g. `74.4107`
- `radius` (number, optional, default: 10): Search radius in km
- `retailerId` (string, optional): Filter by specific retailer ID

**Example Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "alfatah-dha6",
      "retailerId": "al-fatah",
      "retailerName": "Al-Fatah Supermarket",
      "branchName": "DHA Phase 6 Mall",
      "address": "Main Boulevard, DHA Phase 6, Lahore",
      "distanceKm": 1.42,
      "latitude": 31.4721,
      "longitude": 74.4215,
      "phone": "+92 42 111 253 282",
      "isOpen": true
    }
  ]
}
```

---

## 3. Offer & Deal Discovery

### `GET /api/offers/search`
Searches discounted offers matching a query or category within geographic proximity.

**Query Parameters:**
- `lat` (number, required)
- `lng` (number, required)
- `radius` (number, default: 10)
- `query` (string, optional): e.g. `cooking oil`, `dalda`, `milk`
- `category` (string, optional): e.g. `cooking_oil`, `dairy`, `rice_grains`
- `minDiscount` (number, optional): Minimum discount percentage (e.g. `10`, `20`)
- `sortBy` (string, optional): `deal_score`, `distance`, `discount`, `price_low`, `price_high`
- `retailers` (string, comma-separated, optional): Filter specific retailer IDs

**Example Response:**
```json
{
  "success": true,
  "location": {
    "address": "DHA Phase 6, Lahore",
    "latitude": 31.4697,
    "longitude": 74.4107,
    "radiusKm": 10
  },
  "totalStoresFound": 8,
  "totalOffersFound": 34,
  "results": [
    {
      "id": "off-dalda-5l-metro",
      "product": {
        "id": "prod-dalda-5l",
        "name": "Dalda Cooking Oil",
        "brand": "Dalda",
        "category": "Cooking Oil",
        "packageSize": 5,
        "unit": "L",
        "imageUrl": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"
      },
      "store": {
        "id": "metro-airport",
        "retailerId": "metro",
        "name": "Metro Cash & Carry",
        "branch": "Airport Road",
        "distanceKm": 4.8,
        "address": "Airport Road, Lahore"
      },
      "pricing": {
        "regularPrice": 3999,
        "salePrice": 3449,
        "savings": 550,
        "discountPercent": 13.75,
        "currency": "PKR",
        "unitPrice": 689.80,
        "unit": "L"
      },
      "offer": {
        "validUntil": "2026-08-25",
        "verificationStatus": "verified_retailer",
        "sourceType": "api",
        "sourceUrl": "https://www.metro.pk/promotions",
        "lastVerified": "2026-08-19T22:00:00Z"
      },
      "dealScore": 88.5
    }
  ]
}
```

### `GET /api/offers/best`
One-click "Best Deals Near Me" returning top discounted essentials around the user's location.

**Query Parameters:**
- `lat` (number, required)
- `lng` (number, required)
- `radius` (number, optional, default: 10)

---

## 4. Shopping List Optimizer

### `POST /api/shopping-list/optimize`
Computes cheapest single-store basket vs optimal multi-store savings across a user's grocery list.

**Request Body:**
```json
{
  "location": {
    "latitude": 31.4697,
    "longitude": 74.4107,
    "radiusKm": 10
  },
  "items": [
    { "name": "Cooking Oil 5L", "quantity": 1 },
    { "name": "Basmati Rice 5kg", "quantity": 1 },
    { "name": "Milk 1L", "quantity": 6 },
    { "name": "Tapal Tea 950g", "quantity": 1 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "singleStoreBest": {
    "retailer": "Metro Cash & Carry",
    "totalCost": 8450,
    "itemsFound": 4,
    "totalItems": 4
  },
  "multiStoreOptimal": {
    "totalCost": 7680,
    "totalSavingsVsSingleStore": 770,
    "breakdown": [
      {
        "store": "Metro Cash & Carry",
        "distanceKm": 4.8,
        "items": ["Cooking Oil 5L", "Tapal Tea 950g"],
        "subtotal": 4200
      },
      {
        "store": "Al-Fatah",
        "distanceKm": 1.4,
        "items": ["Basmati Rice 5kg", "Milk 1L x6"],
        "subtotal": 3480
      }
    ]
  }
}
```

---

## 5. Admin & Data Source Endpoints

- `GET /api/admin/retailers` - List all configured retailers, status, and health.
- `GET /api/admin/stores` - List physical store branches and coordinates.
- `GET /api/admin/sources` - List scraping/feed sync log and item counts.
- `POST /api/admin/sync` - Trigger on-demand sync for a provider.

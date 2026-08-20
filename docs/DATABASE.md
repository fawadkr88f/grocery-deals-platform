# Database & Data Model Architecture

The data architecture supports high-performance geographic spatial indexing, historical price tracking, and extensible multi-country grocery operations.

---

## 1. Production PostgreSQL + PostGIS

In production environments, spatial queries utilize PostGIS GIST indexes:
```sql
SELECT s.*, 
       ST_Distance(s.geom, ST_SetSRID(ST_MakePoint($lng, $lat), 4326)::geography) / 1000 AS distance_km
FROM stores s
WHERE ST_DWithin(s.geom, ST_SetSRID(ST_MakePoint($lng, $lat), 4326)::geography, $radius_meters)
ORDER BY distance_km ASC;
```

---

## 2. Entity Relational Model

```
 ┌─────────────┐       ┌─────────────┐
 │  Retailer   │◄──────┤    Store    │
 └──────┬──────┘       └──────┬──────┘
        │                     │
        │                     │
        ▼                     ▼
 ┌─────────────┐       ┌─────────────┐
 │ Data Source │       │    Offer    │◄──────┐
 └─────────────┘       └──────┬──────┘       │
                              │              │
                              ▼              │
                       ┌─────────────┐       │
                       │   Product   ├───────┘
                       └──────┬──────┘
                              │
                              ▼
                       ┌─────────────┐
                       │Price History│
                       └─────────────┘
```

---

## 3. Data Integrity & Verification
- `offers.verification_status`:
  - `verified_retailer`: Sourced from official digital feed / API.
  - `promotional_catalog`: Parsed from official weekly flyers.
  - `user_submitted`: Submitted by community, verified by admin.
  - `unverified`: Scraped without confirmation.
- `price_history`: Records all price observations to construct 30-day/90-day pricing moving averages.

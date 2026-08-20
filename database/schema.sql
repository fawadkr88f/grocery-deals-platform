-- Database Schema for Grocery Deals & Price Intelligence Platform
-- Compatible with PostgreSQL 13+ with PostGIS extension

-- Enable PostGIS extension for spatial queries
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Locations / Cities
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code VARCHAR(2) NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    city_name VARCHAR(100) NOT NULL,
    currency_code VARCHAR(3) NOT NULL,
    currency_symbol VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    geom GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_locations_geom ON locations USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_locations_city ON locations(city_name);

-- 2. Retailer Chains (e.g. Carrefour, Metro, Al-Fatah)
CREATE TABLE IF NOT EXISTS retailers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    country_code VARCHAR(2) NOT NULL,
    logo_url TEXT,
    website TEXT,
    provider_id VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    confidence_score DECIMAL(3, 2) DEFAULT 0.95,
    rate_limit_rpm INTEGER DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Individual Physical Stores
CREATE TABLE IF NOT EXISTS stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    retailer_id VARCHAR(50) REFERENCES retailers(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    branch_name VARCHAR(150),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    geom GEOMETRY(Point, 4326),
    phone VARCHAR(50),
    opening_hours JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stores_geom ON stores USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_stores_retailer ON stores(retailer_id);
CREATE INDEX IF NOT EXISTS idx_stores_city ON stores(city);

-- 4. Product Categories
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(20),
    parent_id VARCHAR(50) REFERENCES categories(id) ON DELETE SET NULL,
    display_order INTEGER DEFAULT 0
);

-- 5. Standardized Products Master
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE SET NULL,
    brand VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    normalized_name VARCHAR(255) NOT NULL,
    variant VARCHAR(100),
    package_size DECIMAL(10, 3),
    unit VARCHAR(20), -- 'L', 'kg', 'g', 'ml', 'pcs'
    normalized_quantity DECIMAL(10, 3), -- converted to base metric (L or kg)
    normalized_unit VARCHAR(10), -- 'L', 'kg', 'unit'
    barcode_gtin VARCHAR(50),
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_normalized_name ON products(normalized_name);
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode_gtin);

-- 6. Current Offers / Deals
CREATE TABLE IF NOT EXISTS offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    retailer_id VARCHAR(50) REFERENCES retailers(id) ON DELETE CASCADE,
    store_id UUID REFERENCES stores(id) ON DELETE SET NULL, -- NULL means chain-wide offer
    raw_title TEXT NOT NULL,
    regular_price DECIMAL(12, 2) NOT NULL,
    sale_price DECIMAL(12, 2) NOT NULL,
    savings DECIMAL(12, 2) GENERATED ALWAYS AS (regular_price - sale_price) STORED,
    discount_percentage DECIMAL(5, 2) GENERATED ALWAYS AS (ROUND(((regular_price - sale_price) / regular_price * 100)::numeric, 2)) STORED,
    unit_price DECIMAL(12, 2), -- Price per base unit (e.g. per Litre or per kg)
    currency VARCHAR(3) NOT NULL DEFAULT 'PKR',
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    verification_status VARCHAR(50) DEFAULT 'verified_retailer', 
    -- 'verified_retailer', 'promotional_catalog', 'user_submitted', 'unverified'
    source_type VARCHAR(50) NOT NULL, -- 'api', 'flyer', 'web_catalog', 'user'
    source_url TEXT,
    deal_score DECIMAL(5, 2) DEFAULT 0,
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_offers_product ON offers(product_id);
CREATE INDEX IF NOT EXISTS idx_offers_retailer ON offers(retailer_id);
CREATE INDEX IF NOT EXISTS idx_offers_store ON offers(store_id);
CREATE INDEX IF NOT EXISTS idx_offers_active ON offers(is_active, end_date);
CREATE INDEX IF NOT EXISTS idx_offers_discount ON offers(discount_percentage DESC);
CREATE INDEX IF NOT EXISTS idx_offers_deal_score ON offers(deal_score DESC);

-- 7. Price History Tracker
CREATE TABLE IF NOT EXISTS price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    retailer_id VARCHAR(50) REFERENCES retailers(id) ON DELETE CASCADE,
    store_id UUID REFERENCES stores(id) ON DELETE SET NULL,
    price DECIMAL(12, 2) NOT NULL,
    is_promotional BOOLEAN DEFAULT FALSE,
    currency VARCHAR(3) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_price_history_product_date ON price_history(product_id, recorded_at DESC);

-- 8. Data Sources & Ingest Sync Log
CREATE TABLE IF NOT EXISTS data_sources (
    id VARCHAR(50) PRIMARY KEY,
    retailer_id VARCHAR(50) REFERENCES retailers(id) ON DELETE CASCADE,
    provider_name VARCHAR(100) NOT NULL,
    feed_type VARCHAR(50) NOT NULL,
    feed_url TEXT,
    last_sync_start TIMESTAMP WITH TIME ZONE,
    last_sync_end TIMESTAMP WITH TIME ZONE,
    last_status VARCHAR(50), -- 'SUCCESS', 'FAILED', 'PARTIAL'
    items_synced INTEGER DEFAULT 0,
    offers_created INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Function to automatically update geometry point from lat/long
CREATE OR REPLACE FUNCTION update_geom_from_latlng()
RETURNS TRIGGER AS $$
BEGIN
    NEW.geom = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_stores_geom
BEFORE INSERT OR UPDATE OF latitude, longitude ON stores
FOR EACH ROW EXECUTE FUNCTION update_geom_from_latlng();

CREATE TRIGGER trg_locations_geom
BEFORE INSERT OR UPDATE OF latitude, longitude ON locations
FOR EACH ROW EXECUTE FUNCTION update_geom_from_latlng();

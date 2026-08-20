# Deployment & Operations Guide

## 1. Quick Start (Local Development)

### 1.1 Start Backend API Server
```bash
cd backend
npm install
npm run dev
# Starts API server on http://localhost:4000
```

### 1.2 Start Browser Extension (Dev Mode)
```bash
cd extension
npm install
npm run dev # or npm run build for production unpacked
```

### 1.3 Load Extension in Chrome / Brave / Edge
1. Open `chrome://extensions/` (or `edge://extensions/`).
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked**.
4. Select the `extension/dist` directory.
5. Click the extension puzzle icon in your browser toolbar and pin **Grocery Deals Near Me**!

### 1.4 Start Admin Dashboard
```bash
cd admin
npm install
npm run dev
# Starts Admin dashboard on http://localhost:5173
```

---

## 2. Docker Production Deployment

### `docker-compose.yml`
```yaml
version: '3.8'
services:
  postgres:
    image: postgis/postgis:15-3.3
    environment:
      POSTGRES_DB: grocery_deals
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secretpassword
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build: ./backend
    environment:
      PORT: 4000
      DATABASE_URL: postgres://postgres:secretpassword@postgres:5432/grocery_deals
      REDIS_URL: redis://redis:6379
      NODE_ENV: production
    ports:
      - "4000:4000"
    depends_on:
      - postgres
      - redis

volumes:
  pgdata:
```

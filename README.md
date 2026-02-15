# 🛒 KakiJimat - Community-Powered Price Intelligence

> **Built for Krackathon 2026** | A real-time price tracking platform that empowers shoppers to save money together.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://jimatkaki.vercel.app)
[![Backend API](https://img.shields.io/badge/API-Docs-blue)](https://jimatkaki.onrender.com/docs)

---

## 🎯 Overview

**KakiJimat** (Malay for "Save Money") is a community-driven platform where users report and track grocery prices in real-time. By crowdsourcing price data, we help shoppers find the best deals and make informed purchasing decisions.

### ✨ Key Features

- 🔍 **Smart Search & Filters** - Find items instantly with category-based filtering
- 📊 **Live Price Feed** - Real-time community price reports with freshness indicators
- 🏆 **Gamified Leaderboard** - Top contributors compete for recognition
- 📱 **Mobile-First Design** - Responsive cartoon-themed UI optimized for all devices
- ⚡ **Automated Data Pipeline** - dbt transformations running hourly via GitHub Actions
- 🔗 **Federated Queries** - Trino integration for cross-database analytics

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Deployed on Vercel

**Backend:**
- FastAPI (Python)
- PostgreSQL (Supabase)
- Deployed on Render

**Data Engineering:**
- dbt (Data Build Tool) - Medallion architecture
- Trino - Federated query engine
- GitHub Actions - CI/CD automation

### Data Pipeline (Medallion Architecture)

```
┌─────────────────────────────────────────┐
│  BRONZE (Raw Data)                      │
│  stg_price_reports                      │
│  - Raw user submissions                 │
└─────────────────────────────────────────┘
                 ↓ dbt transforms
┌─────────────────────────────────────────┐
│  SILVER (Cleaned Data)                  │
│  cleaned_price_reports                  │
│  - Data validation & string cleaning    │
│  - Case normalization (INITCAP)         │
└─────────────────────────────────────────┘
                 ↓ dbt aggregates
┌─────────────────────────────────────────┐
│  GOLD (Analytics / Marts)               │
│  price_feed_mart & hero_leaderboard     │
│  - Freshness logic (<3h, <12h)          │
│  - User rankings & statistics           │
└─────────────────────────────────────────┘
```

**How dbt Works:**
1. Users submit prices → FastAPI inserts into Bronze layer (`price_reports` table)
2. dbt reads from source → Create Silver mart (`cleaned_price_reports`) with normalized text
3. dbt creates Gold layer → `price_feed_mart` (with freshness status) and `hero_leaderboard`
4. Hybrid API logic → FastAPI joins Bronze (real-time) with Gold (freshness status)
5. Frontend displays instant updates with smart dbt-powered status badges

**How Trino Works:**
- Enables querying across multiple data sources (PostgreSQL, CSV, S3, etc.)
- Demonstrates data federation capabilities
- Used for advanced analytics and cross-database queries
- Runs locally for demo purposes

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL (or Supabase account)
- Docker (optional, for Trino)

### Local Development

#### 1. Clone Repository
```bash
git clone https://github.com/AnasHakimi/kakijimat.git
cd kakijimat
```

#### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=your_supabase_connection_string" > .env
echo "SUPABASE_URL=your_supabase_url" >> .env
echo "SUPABASE_KEY=your_supabase_key" >> .env

# Run backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run frontend
npm run dev
```

#### 4. dbt Setup (Optional)
```bash
cd dbt_project
pip install dbt-core dbt-postgres

# Configure profiles.yml with your database credentials
dbt debug  # Test connection
dbt run    # Run transformations
```

#### 5. Trino Setup (Optional)
```bash
cd trino
docker-compose up -d
# Access Trino at http://localhost:8080
```

---

## 📦 Deployment

### Production Stack

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase (PostgreSQL)
- **dbt**: GitHub Actions (automated hourly)

### Environment Variables

**Vercel (Frontend):**
```
VITE_API_URL=https://jimatkaki.onrender.com
```

**Render (Backend):**
```
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_KEY=...
```

**GitHub Secrets (dbt):**
```
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_PORT=6543
DB_NAME=postgres
```

---

## 🎨 Features Showcase

### 1. Live Feed with Search & Filters
- Grid-based card layout for easy scanning
- Real-time search by item name or store
- Category filtering (Bakery, Meat, Dairy, etc.)
- "Load More" pagination to prevent scroll fatigue

### 2. Smart Freshness Indicators
- **FRESH** (< 3 hours) - Green badge
- **STALE** (3-12 hours) - Yellow badge
- **EXPIRED** (> 12 hours) - Red badge

### 3. Gamified Leaderboard
- Top contributors ranked by submission count
- Encourages community participation
- Real-time updates

### 4. Custom Cartoon Modal
- Themed success popup on price submission
- Smooth animations and micro-interactions
- Consistent with app's playful aesthetic

---

## 🔧 API Endpoints

**Base URL**: `https://jimatkaki.onrender.com`

- `POST /api/report` - Submit a price report
- `GET /api/feed` - Get live price feed
- `GET /api/leaderboard` - Get top contributors
- `GET /docs` - Interactive API documentation (Swagger)

---

## 📊 Data Models

### Bronze Layer
```sql
CREATE TABLE price_reports (
    id UUID PRIMARY KEY,
    item_name TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    price FLOAT NOT NULL,
    store_name TEXT NOT NULL,
    reported_by TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Silver Layer (dbt Model)
```sql
SELECT
    id,
    INITCAP(TRIM(item_name)) as item_name,
    INITCAP(TRIM(category)) as category,
    price,
    INITCAP(TRIM(store_name)) as store_name,
    reported_by,
    created_at
FROM {{ ref('stg_price_reports') }}
WHERE price > 0 AND price < 10000;
```

### Gold Layer (dbt Marts)
```sql
-- price_feed_mart
SELECT
    *,
    CASE 
        WHEN created_at > NOW() - INTERVAL '3 hours' THEN 'FRESH'
        WHEN created_at > NOW() - INTERVAL '12 hours' THEN 'STALE'
        ELSE 'EXPIRED'
    END as freshness_status
FROM {{ ref('cleaned_price_reports') }};

-- hero_leaderboard
SELECT 
    reported_by, 
    COUNT(id) as total_reports
FROM {{ ref('cleaned_price_reports') }}
GROUP BY reported_by;
```

---

## 🧪 Testing

### Manual Testing
1. Visit the live app: https://kakijimat.vercel.app/
2. Submit a test price report
3. Verify it appears in the Live Feed
4. Check the Leaderboard for your entry

### Database Reset (for fresh testing)
```sql
-- In Supabase SQL Editor
TRUNCATE TABLE price_reports CASCADE;
```

---

## 🎯 Engineering Highlights

### Why This Architecture?

1. **Separation of Concerns**: App writes raw data, dbt handles analytics
2. **Automated Pipelines**: GitHub Actions runs dbt hourly without manual intervention
3. **Scalability**: Views (not materialized tables) keep queries fast as data grows
4. **Modern Stack**: Demonstrates proficiency in React, FastAPI, dbt, and cloud deployment
5. **Data Federation**: Trino shows ability to query across multiple data sources

### Performance Optimizations

- Frontend: Vite build optimization, lazy loading
- Backend: Database connection pooling, indexed queries
- Data: dbt incremental models (future enhancement)

---

## 👥 Team

**Anas Hakimi** - Full Stack Developer & Data Engineer

- [GitHub](https://github.com/AnasHakimi)
- [LinkedIn](https://www.linkedin.com/in/anashakimi)
- [KrackedDevs](https://krackeddevs.com/profile/naskimii)

---

## 📝 License

Built for **Krackathon 2026** - Educational purposes

---

## 🙏 Acknowledgments

- **Krackathon 2026** - For the hackathon opportunity
- **Supabase** - For the managed PostgreSQL database
- **Vercel & Render** - For free-tier hosting
- **dbt Labs** - For the amazing data transformation tool

---

**⭐ Star this repo if you find it helpful!**

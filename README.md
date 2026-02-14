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
│  price_reports table                    │
│  - User submissions via FastAPI         │
└─────────────────────────────────────────┘
                 ↓ dbt transforms
┌─────────────────────────────────────────┐
│  SILVER (Cleaned Data)                  │
│  silver_price_reports view              │
│  - Freshness calculations (FRESH/STALE) │
│  - Data validation & cleaning           │
└─────────────────────────────────────────┘
                 ↓ dbt aggregates
┌─────────────────────────────────────────┐
│  GOLD (Analytics)                       │
│  gold_leaderboard view                  │
│  - User rankings & statistics           │
│  - Business-ready insights              │
└─────────────────────────────────────────┘
```

**How dbt Works:**
1. Users submit prices → FastAPI inserts into Bronze layer
2. GitHub Actions triggers dbt every hour (or on push)
3. dbt creates Silver views with freshness logic
4. dbt creates Gold views with aggregated analytics
5. FastAPI reads from views → Frontend displays fresh data

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
git clone https://github.com/AnasHakimi/jimatkaki.git
cd jimatkaki
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
- **FRESH** (< 24 hours) - Green badge
- **STALE** (24-72 hours) - Yellow badge
- **OLD** (> 72 hours) - Red badge

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

### Silver Layer (dbt View)
```sql
CREATE VIEW silver_price_reports AS
SELECT 
    *,
    CASE 
        WHEN age < INTERVAL '24 hours' THEN 'FRESH'
        WHEN age < INTERVAL '72 hours' THEN 'STALE'
        ELSE 'OLD'
    END as freshness_status
FROM price_reports;
```

### Gold Layer (dbt View)
```sql
CREATE VIEW gold_leaderboard AS
SELECT 
    reported_by,
    COUNT(*) as report_count,
    RANK() OVER (ORDER BY COUNT(*) DESC) as rank
FROM price_reports
GROUP BY reported_by;
```

---

## 🧪 Testing

### Manual Testing
1. Visit the live app: https://jimatkaki.vercel.app
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

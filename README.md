JimatKaki: A Modular ELT-Driven Community Price Engine
JimatKaki is a digital community utility designed to combat the rising cost of living in Malaysia through a real-time, crowdsourced price governance architecture. By leveraging a modern data stack, it transforms raw community input into verified, actionable insights for hyper-local savings.

🏗️ Technical Architecture
Targeting the Best Architecture bounty, this project implements a Medallion (Bronze/Silver/Gold) Data Pipeline to ensure data integrity and scalability.

1. Ingestion Layer (Bronze)
Frontend: React (Vite) + Tailwind CSS for a high-performance, responsive UI.

API Gateway: FastAPI (Python) serving as a robust middleware to validate ingestion and prevent schema drift.

Identity: A low-friction Guest Identity system utilizing localStorage to maximize community participation while maintaining contributor attribution.

2. Transformation Layer (Silver)
Data Orchestration: Managed via Supabase (PostgreSQL).

Cleaning & Governance: Utilizes dbt (data build tool) principles to standardize raw store names and filter price outliers, ensuring the "Silver" tables are audit-ready and reliable.

3. Analytics & Consumption Layer (Gold)
Real-time Freshness: Materialized views calculate "Price Freshness" indicators (Green/Yellow/Red) based on created_at timestamps to ensure data reliability.

Gamification: A "Hero Leaderboard" logic that aggregates contributor volume to drive community engagement.

🛠️ Tech Stack
Language: Python (FastAPI), JavaScript (React).

Database: PostgreSQL via Supabase.

Data Modeling: dbt-inspired SQL transformations.

Deployment: Vercel (Frontend) & Render (Backend).

🚀 Deployment Plan
Phase 1: Standardize raw community submissions using dbt models to handle localized store naming variations.

Phase 2: Scale the access layer using Trino for federated queries across multiple data sources (e.g., government open data + community data).

Phase 3: Transition to a mobile-first PWA to reach B40 communities with limited device storage.JimatKaki: A Modular ELT-Driven Community Price Engine
JimatKaki is a digital community utility designed to combat the rising cost of living in Malaysia through a real-time, crowdsourced price governance architecture. By leveraging a modern data stack, it transforms raw community input into verified, actionable insights for hyper-local savings.

🏗️ Technical Architecture
Targeting the Best Architecture bounty, this project implements a Medallion (Bronze/Silver/Gold) Data Pipeline to ensure data integrity and scalability.

1. Ingestion Layer (Bronze)
Frontend: React (Vite) + Tailwind CSS for a high-performance, responsive UI.

API Gateway: FastAPI (Python) serving as a robust middleware to validate ingestion and prevent schema drift.

Identity: A low-friction Guest Identity system utilizing localStorage to maximize community participation while maintaining contributor attribution.

2. Transformation Layer (Silver)
Data Orchestration: Managed via Supabase (PostgreSQL).

Cleaning & Governance: Utilizes dbt (data build tool) principles to standardize raw store names and filter price outliers, ensuring the "Silver" tables are audit-ready and reliable.

3. Analytics & Consumption Layer (Gold)
Real-time Freshness: Materialized views calculate "Price Freshness" indicators (Green/Yellow/Red) based on created_at timestamps to ensure data reliability.

Gamification: A "Hero Leaderboard" logic that aggregates contributor volume to drive community engagement.

🛠️ Tech Stack
Language: Python (FastAPI), JavaScript (React).

Database: PostgreSQL via Supabase.

Data Modeling: dbt-inspired SQL transformations.

Deployment: Vercel (Frontend) & Render (Backend).

🚀 Deployment Plan
Phase 1: Standardize raw community submissions using dbt models to handle localized store naming variations.

Phase 2: Scale the access layer using Trino for federated queries across multiple data sources (e.g., government open data + community data).

Phase 3: Transition to a mobile-first PWA to reach B40 communities with limited device storage.
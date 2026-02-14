-- BRONZE: Raw Ingestion Table
CREATE TABLE price_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    price DECIMAL(10,2) NOT NULL,
    store_name TEXT NOT NULL,
    reported_by TEXT NOT NULL, -- Guest Username
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GOLD: Materialized View for "Jimat Heroes" (Best Architecture Flex)
CREATE OR REPLACE VIEW hero_leaderboard AS
SELECT 
    reported_by, 
    COUNT(id) as total_reports
FROM price_reports
GROUP BY reported_by
ORDER BY total_reports DESC
LIMIT 5;

-- GOLD: View for Price Feed with Freshness Logic
CREATE OR REPLACE VIEW price_feed AS
SELECT *,
    CASE 
        WHEN created_at > NOW() - INTERVAL '3 hours' THEN 'FRESH'
        WHEN created_at > NOW() - INTERVAL '12 hours' THEN 'STALE'
        ELSE 'EXPIRED'
    END as freshness_status
FROM price_reports
ORDER BY created_at DESC;
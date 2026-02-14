WITH silver AS (
    SELECT * FROM {{ ref('cleaned_price_reports') }}
)

SELECT
    *,
    CASE 
        WHEN created_at > NOW() - INTERVAL '3 hours' THEN 'FRESH'
        WHEN created_at > NOW() - INTERVAL '12 hours' THEN 'STALE'
        ELSE 'EXPIRED'
    END as freshness_status
FROM silver
ORDER BY created_at DESC

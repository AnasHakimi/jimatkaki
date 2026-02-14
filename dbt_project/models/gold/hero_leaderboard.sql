WITH silver AS (
    SELECT * FROM {{ ref('cleaned_price_reports') }}
)

SELECT 
    reported_by, 
    COUNT(id) as total_reports
FROM silver
GROUP BY reported_by
ORDER BY total_reports DESC
LIMIT 5

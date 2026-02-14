WITH bronze AS (
    SELECT * FROM {{ ref('stg_price_reports') }}
)

SELECT
    id,
    INITCAP(TRIM(item_name)) as item_name,
    INITCAP(TRIM(category)) as category,
    price,
    INITCAP(TRIM(store_name)) as store_name,
    reported_by,
    created_at
FROM bronze
WHERE price > 0 AND price < 10000

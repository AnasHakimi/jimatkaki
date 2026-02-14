WITH source AS (
    SELECT * FROM {{ source('public', 'price_reports') }}
)

SELECT
    id,
    item_name,
    category,
    price,
    store_name,
    reported_by,
    created_at
FROM source

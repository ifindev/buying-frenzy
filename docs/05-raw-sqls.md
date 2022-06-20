## Raw Sequels Queries used in Knex

All SQL Scripts used for exploring the best way to query the Db as per the requirements.

### `findOpenRestaurants`

```sql
SELECT
  b."restaurantName", a."dayOfWeek",
  a."openingHour", a."closingHour"
FROM api_dev."WorkingHours" a
JOIN api_dev."Restaurant" b
ON a."restaurantId" = b."restaurantId"
where a."openingHour" > 800
and a."closingHour" < 1200;
```

### `getRestaurantDishesWithinPriceRange`

```sql
SELECT "restaurantName" FROM api_dev."Restaurant" WHERE
"restaurantId" IN (
	SELECT "restaurantId" FROM (
		SELECT rs."restaurantId", count(rs."restaurantName") "countResto"
		FROM api_dev."Restaurant" rs
		INNER JOIN api_dev."RestaurantMenu" rm
		ON rs."restaurantId" = rm."restaurantId"
		WHERE rm."price" > 10.00 AND rm."price" < 12.00
		GROUP BY rs."restaurantId"
	) AS "RestoCountWithPriceRange"
	WHERE "countResto" >= 4
)
ORDER BY "restaurantName" ASC
LIMIT 15
```

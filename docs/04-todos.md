# API Todos

## Business Requirements

1. List all restaurants that are open at a certain datetime
2. List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically
3. Search for restaurants or dishes by name, ranked by relevance to search term
4. Process a user purchasing a dish from a restaurant

## Steps

### List All Restaurants that are open at certain time [✅]

Steps:

- Accepts API request with working day & hours (in AM/PM).
- Change working hours into 24-h format. Opening must be larger than closing hour.
- Change the working day & hours into integer equivalents.
  - Day : 1- 7
  - Hours : Minutes past midnight
- Query the DB for restaurant that are open at the chosen time range.
- Join working hours & restaurant tables
- Return response ok if there is no errors.

### List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically [✅]

Steps :

- Accepts API request with price range parameters (in USD) & minimum dish on the price range
- Parse price into float number
- Query DB for the price range in RestaurantMenu. Only get count dish with price range more or less than the minimum
- Join query result with Restaurant & Menu tables to get Restaurant & menu information
- Return response ok if there is no error

### Search for restaurants or dishes by name, ranked by relevance to search term

Steps :

- Accepts API request with search parameters of restaurant or dishname
- Query db for the request.
- Join table restaurant & menu where restaurant name like restaurant search param & menu name like search param
- Return query result
- Return response ok if there is no error

### Process a user purchasing a dish from a restaurant

Steps: (There are no food stocks to be considered for now...)

- Accepts API request with parameters:
  - restaurant_id
  - menu_id
  - user_id
  - price
- Query DB for creating user transaction. Only create if user balance is larger than dish's price. Return complete transaction data if success, and return null transaction data if failed. (We use DB Lock instead of manual lock from backend logic to read then update data)
- Check is transaction success or not. If success, then send full complete success response. Send error otherwise.

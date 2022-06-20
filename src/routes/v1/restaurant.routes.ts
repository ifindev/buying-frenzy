import { restaurant } from '../../controllers'
import { v1 as router } from '../../loaders'

router.get('/restaurants-open', restaurant.getOpenRestaurants)
router.get('/restaurants-filtered-dishprice', restaurant.getRestaurantWithDishesWithinPriceRange)

export default router

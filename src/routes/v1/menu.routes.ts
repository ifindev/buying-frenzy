import { menu } from '../../controllers'
import { v1 as router } from '../../loaders'

router.get('/open-restaurants', menu.getOpenRestaurants)

export default router

import db from '../db/db'
import { Database } from '../configs'

const findOpenRestaurants = async (
	openingHour: number,
	closingHour: number,
	dayOfWeek: number,
	limit: number,
	offset: number
) => {
	try {
		const data = await db(`${Database.schema}.WorkingHours`)
			.join(
				`${Database.schema}.Restaurant`,
				'WorkingHours.restaurantId',
				'=',
				'Restaurant.restaurantId'
			)
			.select(
				'Restaurant.restaurantName',
				'WorkingHours.dayOfWeek',
				'WorkingHours.openingHour',
				'WorkingHours.closingHour'
			)
			.where('WorkingHours.openingHour', '>', openingHour)
			.andWhere('WorkingHours.closingHour', '<', closingHour)
			.andWhere('WorkingHours.dayOfWeek', '=', dayOfWeek)
			.limit(limit)
			.offset(offset)

		return data
	} catch (err) {
		throw new Error('Error fetching data from DB')
	}
}

const getCountOpenRestaurants = async (
	openingHour: number,
	closingHour: number,
	dayOfWeek: number
): Promise<number> => {
	try {
		const data = await db(`${Database.schema}.WorkingHours`)
			.join(
				`${Database.schema}.Restaurant`,
				'WorkingHours.restaurantId',
				'=',
				'Restaurant.restaurantId'
			)
			.count('Restaurant.restaurantName')
			.where('WorkingHours.openingHour', '>', openingHour)
			.andWhere('WorkingHours.closingHour', '<', closingHour)
			.andWhere('WorkingHours.dayOfWeek', '=', dayOfWeek)

		return parseInt(`${data[0].count}`)
	} catch (err) {
		throw new Error('Error fetching data from DB')
	}
}

const getRestaurantWithDishesWithinPriceRange = async (
	minPrice: number,
	maxPrice: number,
	numDishes: number,
	numRestaurants: number
) => {
	try {
		// subquery to get count restaurant with dish within the specified price range
		const countResto = db(`${Database.schema}.Restaurant`)
			.join(
				`${Database.schema}.RestaurantMenu`,
				'Restaurant.restaurantId',
				'=',
				'RestaurantMenu.restaurantId'
			)
			.select('Restaurant.restaurantId')
			.count('Restaurant.restaurantId as countResto')
			.where('RestaurantMenu.price', '>=', minPrice)
			.andWhere('RestaurantMenu.price', '<=', maxPrice)
			.groupBy('Restaurant.restaurantId')
			.as('RestoCountWithPriceRange')

		// subquery to get restaurants with at least `numDishes` of dish
		// within the specified price range
		const getRestoID = db
			.select('restaurantId')
			.from(countResto)
			.where('countResto', '>=', numDishes)

		// get restaurant id & names
		const getRestoInfo = await db
			.select('Restaurant.restaurantId', 'Restaurant.restaurantName')
			.from(`${Database.schema}.Restaurant`)
			.where('Restaurant.restaurantId', 'in', getRestoID)
			.limit(numRestaurants)

		return getRestoInfo
	} catch (err) {
		throw new Error('Error fetching data from DB')
	}
}

export { findOpenRestaurants, getCountOpenRestaurants, getRestaurantWithDishesWithinPriceRange }

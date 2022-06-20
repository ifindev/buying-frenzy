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

export { findOpenRestaurants, getCountOpenRestaurants }

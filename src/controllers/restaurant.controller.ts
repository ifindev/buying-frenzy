import { Context } from 'koa'
import getOffsetLimitFromPage from '../services/pagination'
import { cvtDayOfWeekToInt, cvtTimeFromAMPM, cvtTimeToMinutes } from '../services/time/timeProcess'
import {
	findOpenRestaurants,
	getCountOpenRestaurants,
	getRestaurantWithDishesWithinPriceRange
} from '../repositories/restaurants'

export default class RestaurantController {
	public static async getOpenRestaurants(ctx: Context) {
		const page = parseInt(`${ctx.query.page}`)
		const count_per_page = parseInt(`${ctx.query.count_per_page}`)
		const { day, opening_hours, closing_hours } = ctx.query

		// check page for pagination
		if (!page) {
			ctx.response.status = 400
			ctx.body = {
				code: 400,
				status: 'Pagination Error',
				message: 'Minimum page number is 1!',
				data: null
			}
			return
		}

		// get limit & offset of pagination
		const { limit, offset } = getOffsetLimitFromPage(page, count_per_page)

		// convert day & working hours
		const dayOfWeek = cvtDayOfWeekToInt(`${day}`)
		const openHour = cvtTimeFromAMPM(`${opening_hours}`)
		const closeHour = cvtTimeFromAMPM(`${closing_hours}`)

		// Convert time to minutes past midnight
		const minutesOH = cvtTimeToMinutes(openHour)
		const minutesCH = cvtTimeToMinutes(closeHour)

		// check opening hour to closing hour
		if (minutesOH > minutesCH) {
			ctx.response.status = 400
			ctx.body = {
				code: 400,
				status: 'Error',
				message: 'Closing hour should be larger than opening hour!',
				data: null
			}
			return
		}

		// get data from DB
		try {
			const data = await findOpenRestaurants(minutesOH, minutesCH, dayOfWeek, limit, offset)
			const totalCount = await getCountOpenRestaurants(minutesOH, minutesCH, dayOfWeek)

			const response = {
				code: 200,
				status: 'Success',
				message: 'Success fetch data',
				data: {
					body: data,
					count: data.length,
					totalCount: totalCount
				}
			}

			ctx.response.status = 200
			ctx.body = response
		} catch (err) {
			ctx.response.status = 500
			ctx.body = {
				code: 500,
				status: 'Error',
				message: 'Error fetching data from Database',
				data: null
			}
		}
	}

	public static async getRestaurantWithDishesWithinPriceRange(ctx: Context) {
		const minPrice = parseFloat(`${ctx.query.min_price}`)
		const maxPrice = parseFloat(`${ctx.query.max_price}`)
		const numDishes = parseInt(`${ctx.query.num_dishes}`)
		const numRestaurants = parseInt(`${ctx.query.num_restaurants}`)

		if (!numDishes || !numRestaurants) {
			ctx.response.status = 400
			ctx.body = {
				code: 400,
				status: 'Error',
				message: 'Number of dishes & number of restaurants should be larger than zero!',
				data: null
			}
			return
		}

		try {
			const data = await getRestaurantWithDishesWithinPriceRange(
				minPrice,
				maxPrice,
				numDishes,
				numRestaurants
			)

			const response = {
				code: 200,
				status: 'Success',
				message: 'Success fetch data',
				data: {
					body: data,
					count: data.length,
					totalCount: data.length
				}
			}

			ctx.response.status = 200
			ctx.body = response
		} catch (err) {
			ctx.response.status = 500
			ctx.body = {
				code: 500,
				status: 'Error',
				message: 'Error fetching data from Database',
				data: null
			}
		}
	}
}

import { Context } from 'koa'
import getOffsetLimitFromPage from '../services/pagination'
import { cvtDayOfWeekToInt, cvtTimeFromAMPM, cvtTimeToMinutes } from '../services/time/timeProcess'
import { findOpenRestaurants, getCountOpenRestaurants } from '../repositories/restaurants'

export default class MenuController {
	public static async getOpenRestaurants(ctx: Context) {
		const page = parseInt(`${ctx.query.page}`)
		const countPerPage = parseInt(`${ctx.query.count_per_page}`)
		const { day, openingHours, closingHours } = ctx.query

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
		const { limit, offset } = getOffsetLimitFromPage(page, countPerPage)

		// convert day & working hours
		const dayOfWeek = cvtDayOfWeekToInt(`${day}`)
		const openHour = cvtTimeFromAMPM(`${openingHours}`)
		const closeHour = cvtTimeFromAMPM(`${closingHours}`)

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
}

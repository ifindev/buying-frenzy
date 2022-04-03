import {
	IRawMenu,
	IRawRestaurant,
	IRestaurant,
	IWorkingHours,
	IMenu,
	IRestaurantMenu,
	IRestoWithWorkingHours,
	RestaurantName,
	RestaurantId,
	MenuName,
	MenuId
} from '../../types/restaurant.types'

import { cvtDayOfWeekToInt, cvtTimeFromAMPM, cvtTimeToMinutes } from '../time/timeProcess'

/**
 *
 * @param restoId : Restaurant id on which the working hours belong to
 * @param day : Day between Monday-Sunday
 * @param time : Array of time containing opening hours & closing hours of the resto. Ex. const time1 = ['11:45AM', '4:45PM']
 * @returns : Object of IWorkingHours containing restaurantId, dayOfWeek on integer, also opening-closing hours in minutes pas miidnight
 */
function normalizeWorkingHoursData(restoId: number, day: string, time: string[]): IWorkingHours {
	const isValid =
		time.length === 2 &&
		(time[0].toLowerCase().includes('am') || time[0].toLowerCase().includes('pm'))
	if (!isValid) {
		throw new Error(
			'Parameter time should contain two elements of opening and closing hour in HH:MM AM/PM format'
		)
	}

	const opHour = time[0].toLowerCase()
	const clHour = time[1].toLowerCase()

	const normOH = cvtTimeFromAMPM(opHour)
	const normCH = cvtTimeFromAMPM(clHour)

	const finalDay = cvtDayOfWeekToInt(day)

	let minutesOH = cvtTimeToMinutes(normOH)
	let minutesCH = cvtTimeToMinutes(normCH)

	if (minutesOH > minutesCH) {
		// For now, assume that the times are somehow got switched
		const tempOH = minutesOH
		minutesOH = minutesCH
		minutesCH = tempOH
	}

	const wh: IWorkingHours = {
		restaurantId: restoId,
		dayOfWeek: finalDay,
		openingHour: minutesOH,
		closingHour: minutesCH
	}

	return wh
}

/**
 *
 * @param restoId (number) Restaurant id based on the restaurant data.
 * @param wh Working hours of the restaurant.Example input is
 * "Mon - Tues, Thurs, Sat 6:15 am - 3:15 am / Weds 9 am - 6:15 pm / Fri 5:15 am - 9:30 pm / Sun 4:45 pm - 5:45 pm"
 * @returns
 */
function extractWorkingHoursData(restoId: number, wh: string): IWorkingHours[] {
	const workingHours: IWorkingHours[] = []

	wh.split('/').forEach((dat) => {
		const day = [...dat.matchAll(/[A-Z][a-z]+/g)].map((i) => i[0])
		const time = [...dat.matchAll(/\d+(:\d+)?\s*(am|pm)?/g)].map((i) => i[0])

		day.forEach((d) => {
			const normalized = normalizeWorkingHoursData(restoId, d, time)
			workingHours.push(normalized)
		})
	})

	return workingHours
}

/**
 * @description Function to extract and transform raw restaurant data
 *
 * @param data : Array of restaurant data object containing restaurantName, cashBalance, openingHours, and array of menu
 * @returns : Object containing transformed restaurants and working hours data
 */
function etRestaurantData(data: IRawRestaurant[]): IRestoWithWorkingHours {
	const restoMap = new Map<RestaurantName, RestaurantId>()

	let whData: IWorkingHours[] = []
	const restoData: IRestaurant[] = []

	data.forEach((resto, idx) => {
		const restoName = resto.restaurantName.trim()
		if (!restoMap.has(restoName)) {
			const restoId = idx + 1

			restoData.push({
				restaurantId: restoId,
				restaurantName: restoName,
				cashBalance: resto.cashBalance
			})

			const wh = extractWorkingHoursData(restoId, resto.openingHours)
			whData = [...whData, ...wh]

			restoMap.set(restoName, restoId)
		}
	})

	const transformed: IRestoWithWorkingHours = {
		restoData: restoData,
		workingHours: whData
	}

	return transformed
}

/**
 * @description : Function to get distinct menu in all the restaurants
 *
 * @param rawResto : Restaurant raw data containing restaurantName, cashBalance, openingHours, and array of menu
 * @returns : Array of menu object containing menuId and dishname
 */
function etAllMenuData(rawResto: IRawRestaurant[]): IMenu[] {
	const menuMap = new Map<MenuName, MenuId>()

	const menu: IMenu[] = []
	let menuId = 0

	rawResto.forEach((dat) => {
		dat.menu.forEach((item) => {
			const dishname = item.dishName.trim()
			if (!menuMap.has(dishname.toLowerCase())) {
				menuId += 1
				menu.push({
					menuId: menuId,
					dishname: dishname
				})
				menuMap.set(dishname.toLowerCase(), menuId)
			}
		})
	})

	return menu
}

/**
 * @description Function to get menu item that belongs to each restaurant
 *
 * @param menu : Array of transformed menu data
 * @param resto : Array of transformed restaurant data
 * @param rawResto : Array of raw restaurant data
 * @returns : Array of menu item mapped to each restaurant and menu list
 */
function etRestaurantMenuData(
	menu: IMenu[],
	resto: IRestaurant[],
	rawResto: IRawRestaurant[]
): IRestaurantMenu[] {
	let id = 0
	const restoMenu: IRestaurantMenu[] = []

	rawResto.forEach((dat) => {
		dat.menu.forEach((men) => {
			id += 1
			const menuItem = menu.filter(
				(x) => x.dishname.toLowerCase().trim() === men.dishName.toLowerCase().trim()
			)
			const restoData = resto.filter(
				(x) => x.restaurantName.toLowerCase().trim() === dat.restaurantName.toLowerCase().trim()
			)

			if (menuItem.length > 0 && restoData.length > 0) {
				restoMenu.push({
					restaurantMenuId: id,
					restaurantId: restoData[0].restaurantId,
					menuId: menuItem[0].menuId,
					price: men.price
				})
			}
		})
	})

	return restoMenu
}

export {
	etAllMenuData,
	etRestaurantData,
	etRestaurantMenuData,
	extractWorkingHoursData,
	normalizeWorkingHoursData
}

import { readJsonFile, writeJsonFile } from './readWriteJson'
import { cvtDayOfWeekToInt, cvtTimeFromAMPM, cvtTimeToMinutes } from '../time/timeProcess'

import {
	IRawMenu,
	IRawRestaurant,
	IRestaurant,
	IWorkingHours,
	IMenu,
	IRestaurantMenu
} from '../../types/restaurant.types'

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

	return workingHours
}

export { extractWorkingHoursData, normalizeWorkingHoursData }

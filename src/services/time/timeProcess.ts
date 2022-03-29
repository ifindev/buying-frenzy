import { errMessages } from '../../constants/errorMessages'

/**
 * @description Function to convert time of 12h format to 24h format
 *
 *
 * @param time (string) : Time in 12h AM/PM such as 1PM, 3:02AM, or 12:51AM
 * @returns finalTime (string) : Converted time in 24h format such as 13:12, 01:30
 */
function cvtTimeFromAMPM(time: string): string {
	const validData = time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')
	if (!validData) {
		throw new Error('Error! Parameter time should be followed by AM/am or PM/pm identification.')
	}

	// Get time Hours, Minutes, and AM/PM
	let hourData = [...time.matchAll(/\d*(:)?(\d+)/g)].map((i) => i[0])[0]
	const hourUnit = [...time.toLowerCase().matchAll(/(am|pm)+/g)].map((i) => i[0])[0]

	const splitTime = hourData.split(':')
	const tempValueLen = splitTime.length
	const tempHour = parseInt(splitTime[0])
	const tempMinute = tempValueLen === 2 ? parseInt(splitTime[1]) : 0

	if (tempHour < 0 || tempHour > 12 || tempMinute < 0 || tempMinute > 59) {
		throw new Error(
			'Error. Input hour should be in range of 0-12 and minutes should be in range of 0-59'
		)
	}

	let finalTime = ''

	if (hourUnit === 'am') {
		if (tempHour < 10 && tempMinute < 10) {
			finalTime = `0${tempHour}:0${tempMinute}`
		} else if (tempHour < 10 && tempMinute >= 10) {
			finalTime = `0${tempHour}:${tempMinute}`
		} else if (tempHour >= 10 && tempHour !== 12 && tempMinute < 10) {
			finalTime = `${tempHour}:0${tempMinute}`
		} else if (tempHour >= 10 && tempHour !== 12 && tempMinute >= 10) {
			finalTime = `${tempHour}:${tempMinute}`
		} else if (tempHour === 12 && tempMinute < 10) {
			finalTime = `00:0${tempMinute}`
		} else {
			finalTime = `00:${tempMinute}`
		}
	} else {
		const pmHour = tempHour === 12 ? tempHour : `${tempHour + 12}`
		if (tempMinute < 10) {
			finalTime = `${pmHour}:0${tempMinute}`
		} else {
			finalTime = `${pmHour}:${tempMinute}`
		}
	}

	return finalTime
}

/**
 * @description
 * Function to convert HH:MM (24-h) time
 * into total minutes after midnight
 *
 * @param time (string): time in 24-hours base with HH:MM format
 * @returns timeMinutes (number) : time in minutes past midnight format
 */
function cvtTimeToMinutes(time: string): number {
	// Check Data
	const check = time.includes(':') && time.length > 2
	if (!check) {
		throw new Error(`${errMessages.ErrConvertTimeToMinutes}`)
	}

	// Split time to hours and minutes
	const splitTime = time.split(':')
	const hours = parseInt(splitTime[0])
	const minutes = parseInt(splitTime[1])

	// Calculate total minutes past midnight
	const timeMinutes = hours * 60 + minutes

	// return
	return timeMinutes
}

/**
 * @description
 * Function to convert time from minutes past
 * midnight format into 24-h HH:MM
 *
 * @param timeMinutes (number)
 * @returns hhmm : Time in 24-h HH:MM format
 */
function cvtMinutesToTime(timeMinutes: number): string {
	if (timeMinutes >= 1440) {
		throw new Error(errMessages.ErrConvertMinutesToTime)
	}

	const hours = Math.floor(timeMinutes / 60)
	const minutes = timeMinutes % 60

	const hoursTime = hours < 10 ? `0${hours}` : `${hours}`
	const minutesTime = minutes === 0 ? '00' : `${minutes}`

	const hhmm = `${hoursTime}:${minutesTime}`
	return hhmm
}

export { cvtTimeToMinutes, cvtMinutesToTime, cvtTimeFromAMPM }

import { errMessages } from '../../constants/errorMessages'

function cvtTimeFromAMPM(time: string): string {
	const result = ''

	const validTime = time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')
	if (!validTime) {
		throw new Error(errMessages.ErrConvertTimeFromAMPM)
	}

	return result
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

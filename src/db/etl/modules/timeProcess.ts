import { errMessages } from '../../../constants/errorMessages'

/**
 * Function to convert HH:MM (24-h) time
 * into total minutes after midnight
 *
 * @param time (string): time in 24-hours base with HH:MM format
 */
function cvtTimeToMinutes(time: string): number {
	// Check Data
	const check = time.includes(':') && time.length > 2
	if (!check) {
		throw new Error(`${errMessages.ConvertTimeToMinutesErr}`)
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

function cvtMinutesToTime(timeMinutes: number): string {
	return ''
}

export { cvtTimeToMinutes, cvtMinutesToTime }

import { expect } from 'chai'
import {
	cvtTimeToMinutes,
	cvtMinutesToTime,
	cvtTimeFromAMPM,
	cvtDayOfWeekToInt
} from '../../../src/services/time/timeProcess'

describe('Time Processor Modules', () => {
	describe('Convert time of 24-hours HH:MM to integer minutes past midnight', () => {
		// Several test inputs
		const input1 = '00:00'
		const input2 = '01:00'
		const input3 = '01:45'

		// Expected output result from each input
		const expOut1 = 0
		const expOut2 = 60
		const expOut3 = 105

		// Real result from cvtTimeToMinute function
		const realRes1 = cvtTimeToMinutes(input1)
		const realRes2 = cvtTimeToMinutes(input2)
		const realRes3 = cvtTimeToMinutes(input3)

		it('Should convert time HH:MM to an integer number of minutes', (done) => {
			// Test output should be a number
			expect(realRes1).to.be.a('number')
			expect(realRes2).to.be.a('number')
			expect(realRes3).to.be.a('number')

			done()
		})

		it('Minutes value should have an exactly same output as the expected output', (done) => {
			// Test output should be equal to expected
			expect(realRes1).to.equal(expOut1)
			expect(realRes2).to.equal(expOut2)
			expect(realRes3).to.equal(expOut3)

			done()
		})

		it('Should throw an error if time input is not formatted as HH:MM', (done) => {
			const invalidInput = '01PM'

			expect(() => cvtTimeToMinutes(invalidInput)).to.throw()
			done()
		})
	})

	describe('Convert time from minutes past midnight into HH:MM of 24-hours', () => {
		it('Should return time in HH:MM of 24-hours format', (done) => {
			// Input params
			const input1 = 60
			const input2 = 105
			const input3 = 1223
			const input4 = 933

			// Expected output
			const output1 = '01:00'
			const output2 = '01:45'
			const output3 = '20:23'
			const output4 = '15:33'

			// Exec functions
			const res1 = cvtMinutesToTime(input1)
			const res2 = cvtMinutesToTime(input2)
			const res3 = cvtMinutesToTime(input3)
			const res4 = cvtMinutesToTime(input4)

			// Run tests
			expect(res1).to.equal(output1)
			expect(res2).to.equal(output2)
			expect(res3).to.equal(output3)
			expect(res4).to.equal(output4)
			done()
		})

		it('Should throw an error if minutes to be converted is >= 1440 minutes', (done) => {
			const input = 1440
			expect(() => cvtMinutesToTime(input)).to.throw()
			done()
		})
	})

	describe('Convert time from 12-h AM/PM into 24-h HH:MM', () => {
		it('Should throw an error if input time have no AM/PM or am/pm', (done) => {
			const input = '01:10'
			expect(() => cvtTimeFromAMPM(input)).to.throw()
			done()
		})

		it('Should not throw error if input time have either uppercase AM/PM or lowecase am/pm', (done) => {
			// Inputs
			const input1 = '08:43 AM'
			const input2 = '08:43 am'
			const input3 = '09:37 PM'
			const input4 = '09:37 pm'

			// Tests
			const test1 = () => cvtTimeFromAMPM(input1)
			const test2 = () => cvtTimeFromAMPM(input2)
			const test3 = () => cvtTimeFromAMPM(input3)
			const test4 = () => cvtTimeFromAMPM(input4)

			// Check test
			expect(test1).to.not.throw()
			expect(test2).to.not.throw()
			expect(test3).to.not.throw()
			expect(test4).to.not.throw()
			done()
		})

		it('Should throw an Error if hour input is larger than 12 and not throw if less than 12', (done) => {
			const input1 = '13:43 PM'
			const input2 = '18:59 PM'
			const input3 = '06:50 PM'

			// test
			const test1 = () => cvtTimeFromAMPM(input1)
			const test2 = () => cvtTimeFromAMPM(input2)
			const test3 = () => cvtTimeFromAMPM(input3)

			// Check test
			expect(test1).to.throw()
			expect(test2).to.throw()
			expect(test3).to.not.throw()

			done()
		})

		it('Should return converted time value in HH:MM format with length of 5 characters', (done) => {
			const input1 = '4:01 PM'
			const input2 = '1:59 AM'
			const input3 = '2 PM'
			const input4 = '02 PM'

			// test
			const out1 = cvtTimeFromAMPM(input1)
			const out2 = cvtTimeFromAMPM(input2)
			const out3 = cvtTimeFromAMPM(input3)
			const out4 = cvtTimeFromAMPM(input4)

			// Check test
			expect(out1).to.have.lengthOf(5)
			expect(out2).to.have.lengthOf(5)
			expect(out3).to.have.lengthOf(5)
			expect(out4).to.have.lengthOf(5)

			done()
		})

		it('Should return hours < 12 if time is in AM', (done) => {
			const input1 = '08:43 AM'
			const input2 = '09:37 AM'

			const output1 = '08:43'
			const output2 = '09:37'

			const result1 = cvtTimeFromAMPM(input1)
			const result2 = cvtTimeFromAMPM(input2)

			expect(result1).to.equal(output1)
			expect(result2).to.equal(output2)

			done()
		})

		it('Should throw an Error if minute input is larger than 59', (done) => {
			const input1 = '08:62 AM'
			expect(() => cvtTimeFromAMPM(input1)).to.throw()
			done()
		})

		it('Should return hours > 12 if time is in PM', (done) => {
			const input1 = '08:43 PM'
			const input2 = '09:37 PM'

			const output1 = '20:43'
			const output2 = '21:37'

			const result1 = cvtTimeFromAMPM(input1)
			const result2 = cvtTimeFromAMPM(input2)

			expect(result1).to.equal(output1)
			expect(result2).to.equal(output2)

			done()
		})

		it('Should return a normal HH:MM time for hour-only input', (done) => {
			const input1 = '1 PM'
			const input2 = '03 AM'

			const output1 = '13:00'
			const output2 = '03:00'

			const result1 = cvtTimeFromAMPM(input1)
			const result2 = cvtTimeFromAMPM(input2)

			expect(result1).to.equal(output1)
			expect(result2).to.equal(output2)

			done()
		})
	})

	describe('Convert day of week to integer number equivalent', () => {
		const days = ['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
		const daysIntEq = [1, 2, 3, 4, 5, 6, 7]

		it('Should throw error if day input is not in English language of Monday through Sunday', (done) => {
			const input1 = 'Senin'
			const input2 = 'Selasa'

			expect(() => cvtDayOfWeekToInt(input1)).to.throw()
			expect(() => cvtDayOfWeekToInt(input2)).to.throw()

			done()
		})

		it('Should not throw error if day input is in English language of Monday through Sunday', (done) => {
			expect(() => cvtDayOfWeekToInt(days[0])).to.not.throw()
			expect(() => cvtDayOfWeekToInt(days[1])).to.not.throw()
			expect(() => cvtDayOfWeekToInt(days[2])).to.not.throw()
			expect(() => cvtDayOfWeekToInt(days[3])).to.not.throw()
			expect(() => cvtDayOfWeekToInt(days[4])).to.not.throw()
			expect(() => cvtDayOfWeekToInt(days[5])).to.not.throw()
			expect(() => cvtDayOfWeekToInt(days[6])).to.not.throw()

			done()
		})

		it('Should return day of week as an integer number between 1-7', (done) => {
			expect(cvtDayOfWeekToInt(days[0])).to.be.greaterThan(0).and.to.be.lessThan(7)
			expect(cvtDayOfWeekToInt(days[1])).to.be.greaterThan(0).and.to.be.lessThan(7)
			expect(cvtDayOfWeekToInt(days[2])).to.be.greaterThan(0).and.to.be.lessThan(7)
			expect(cvtDayOfWeekToInt(days[3])).to.be.greaterThan(0).and.to.be.lessThan(7)
			expect(cvtDayOfWeekToInt(days[4])).to.be.greaterThan(0).and.to.be.lessThan(7)
			expect(cvtDayOfWeekToInt(days[5])).to.be.greaterThan(0).and.to.be.lessThan(7)
			expect(cvtDayOfWeekToInt(days[6])).to.be.greaterThan(0).and.to.be.lessThan(7)

			done()
		})

		it('Should return dayOfInt starting from 1 for Monday and end at 7 for Sunday', (done) => {
			expect(cvtDayOfWeekToInt(days[0])).to.equal(daysIntEq[0])
			expect(cvtDayOfWeekToInt(days[1])).to.equal(daysIntEq[1])
			expect(cvtDayOfWeekToInt(days[2])).to.equal(daysIntEq[2])
			expect(cvtDayOfWeekToInt(days[3])).to.equal(daysIntEq[3])
			expect(cvtDayOfWeekToInt(days[4])).to.equal(daysIntEq[4])
			expect(cvtDayOfWeekToInt(days[5])).to.equal(daysIntEq[5])
			expect(cvtDayOfWeekToInt(days[6])).to.equal(daysIntEq[6])

			done()
		})
	})
})

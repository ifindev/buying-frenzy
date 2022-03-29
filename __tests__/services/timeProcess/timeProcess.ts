import { expect } from 'chai'
import {
	cvtTimeToMinutes,
	cvtMinutesToTime,
	cvtTimeFromAMPM
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
	})
})

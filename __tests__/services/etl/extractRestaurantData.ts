import { expect, assert } from 'chai'
import {
	extractWorkingHoursData,
	normalizeWorkingHoursData
} from '../../../src/services/etl/extractRestaurantData'

describe('Test the function used to normalize and extract restaurant working hours data', () => {
	describe('Normalize resto working hours data', () => {
		it("Should throw error if time input array doesn't contain two elements", (done) => {
			const restoId = 1
			const day = 'Sunday'
			const input1 = ['01AM']
			const input2 = ['02AM']

			expect(() => normalizeWorkingHoursData(restoId, day, input1)).to.throw()
			expect(() => normalizeWorkingHoursData(restoId, day, input2)).to.throw()

			done()
		})

		it('Should return an object containing restaurantId, dayOfWeek, openingHour, and closingHour', (done) => {
			const restoId = 1
			const day = 'Sunday'
			const input1 = ['2:30 pm', '8pm']
			const input2 = ['10:45 am', '5 pm']

			const out1 = normalizeWorkingHoursData(restoId, day, input1)
			const out2 = normalizeWorkingHoursData(restoId, day, input2)

			// Return value must be an object
			assert.isObject(out1, 'Output 1 should be an object')
			assert.isObject(out2, 'Output 2 should be an object')

			// Return value must have a property of restaurantId
			expect(out1).to.have.own.property('restaurantId')
			expect(out2).to.have.own.property('restaurantId')

			// Return value must have a property of dayOfWeek
			expect(out1).to.have.own.property('dayOfWeek')
			expect(out2).to.have.own.property('dayOfWeek')

			// Return value must have a property of dayOfWeek
			expect(out1).to.have.own.property('openingHour')
			expect(out2).to.have.own.property('openingHour')

			// Return value must have a property of dayOfWeek
			expect(out1).to.have.own.property('closingHour')
			expect(out2).to.have.own.property('closingHour')

			done()
		})

		it('Object returned should include a correct dayOfWeek data in range of 0-7', (done) => {
			const restoId = 1
			const day1 = 'Sunday'
			const day2 = 'Friday'
			const time = ['10:00AM', '11:23PM']

			const out1 = normalizeWorkingHoursData(restoId, day1, time)
			const out2 = normalizeWorkingHoursData(restoId, day2, time)

			assert.include(out1, { dayOfWeek: 7 }, 'Include day of week 7 for Sunday')
			assert.include(out2, { dayOfWeek: 5 }, 'Include day of week 5 for Friday')

			done()
		})

		it('Should return normalized data where closing hours is larger than opening hours for same day working hour', (done) => {
			const restoId = 1
			const day = 'Sunday'
			const time1 = ['11:45AM', '4:45PM']
			const time2 = ['7:45 am', '2 am']
			const time3 = ['5:45 pm', '12 am']
			const time4 = ['6am', '9am']

			const out1 = normalizeWorkingHoursData(restoId, day, time1)
			const out2 = normalizeWorkingHoursData(restoId, day, time2)
			const out3 = normalizeWorkingHoursData(restoId, day, time3)
			const out4 = normalizeWorkingHoursData(restoId, day, time4)

			expect(out1.closingHour).to.be.greaterThan(out1.openingHour)
			expect(out2.closingHour).to.be.greaterThan(out2.openingHour)
			expect(out3.closingHour).to.be.greaterThan(out3.openingHour)
			expect(out4.closingHour).to.be.greaterThan(out4.openingHour)

			done()
		})

		it('Should return closing & opening hours in an equivalent minutes past midnight', (done) => {
			const restoId = 1
			const day = 'Sunday'
			const time1 = ['10:00AM', '4:00PM']
			const time2 = ['7:40am', '2PM']

			const expOut1 = { oh: 600, ch: 960 }
			const expOut2 = { oh: 460, ch: 840 }

			const out1 = normalizeWorkingHoursData(restoId, day, time1)
			const out2 = normalizeWorkingHoursData(restoId, day, time2)

			expect(out1.openingHour).to.equal(expOut1.oh)
			expect(out1.closingHour).to.equal(expOut1.ch)
			expect(out2.openingHour).to.equal(expOut2.oh)
			expect(out2.closingHour).to.equal(expOut2.ch)
			done()
		})
	})

	describe('Get restaurant working hours data for the entire week', () => {
		const restoId = 1
		const OH1 =
			'Mon, Fri 2:30 pm - 8 pm / Tues 11 am - 2 pm / Weds 1:15 pm - 3:15 am / Thurs 10 am - 3:15 am / Sat 5 am - 11:30 am / Sun 10:45 am - 5 pm'
		const OH2 =
			'Mon, Weds 11:45 am - 4:45 pm / Tues 7:45 am - 2 am / Thurs 5:45 pm - 12 am / Fri, Sun 6 am - 9 pm / Sat 10:15 am - 9 pm'

		const out1 = extractWorkingHoursData(restoId, OH1)
		const out2 = extractWorkingHoursData(restoId, OH2)

		it('Should return restaurant working hours data in an array', (done) => {
			expect(out1).to.be.an('array')
			expect(out2).to.be.an('array')

			done()
		})

		it('Should return array of length seven for a week opening hours data', (done) => {
			expect(out1).to.have.lengthOf(7)
			expect(out2).to.have.lengthOf(7)

			done()
		})

		it('Should return an array with IWorkingHours data as its element', (done) => {
			const elm = out1[0]
			expect(elm).to.have.property('restaurantId')
			expect(elm).to.have.property('dayOfWeek')
			expect(elm).to.have.property('openingHour')
			expect(elm).to.have.property('closingHour')
			done()
		})
	})
})

import { expect } from 'chai'

describe('Sample Test', () => {
	describe('Hello World', () => {
		it('should return hello world', () => {
			const result = 'Hello World!'
			expect(result).to.equal('Hello World!')
		})
	})

	describe('Comparing deep equality', () => {
		it('should check deep equality', () => {
			const result = { a: 1 }
			expect(result).to.equal({ a: 2 })
		})
	})
})

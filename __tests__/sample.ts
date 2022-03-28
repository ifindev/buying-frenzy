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
			const result = 'Hello World!'
			expect(result).to.equal('Hello World!')
		})
	})
})

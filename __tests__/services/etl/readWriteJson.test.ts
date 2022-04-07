import { expect } from 'chai'
import { readJsonFile, writeJsonFile } from '../../../src/services/etl/readWriteJson'

describe('Test read JSON File from a given directory using readJsonFile', () => {
	it('Read data successfully if file exists in the file directory', (done) => {
		const filepath = process.cwd() + '/__tests__/services/etl/test.json'
		const read = () => readJsonFile(filepath)
		expect(read).to.not.throw()
		done()
	})

	it('Throws error if file is not exists in the file directory', async (done) => {
		done()
	})
})

describe('Test write JSON data with a given filename to the target directory using writeJsonFile', () => {
	it('Should return error if file to be write is not .json', (done) => {
		done()
	})

	it('Should write write file successfully to the given filedir', (done) => {
		done()
	})
})

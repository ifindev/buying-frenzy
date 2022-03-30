import * as fs from 'fs'

function readJsonFile<TReturn>(filePath: string): Promise<TReturn> {
	return new Promise((resolve, reject) => {
		if (!filePath.includes('.json')) {
			reject('Error! Can only read JSON file in .json')
		} else {
			fs.readFile(filePath, 'utf8', (error, jsonString) => {
				if (error != null) {
					reject('Error while reading the file!')
					return
				}

				try {
					const returnData: TReturn = JSON.parse(jsonString)
					resolve(returnData)
				} catch (err) {
					reject('Error parsing JSON data from file!')
					return
				}
			})
		}
	})
}

function writeJsonFile(filepath: string, filename: string, jsonString: string): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!filename.includes('.json')) {
			reject('Error! Can only save json data into .json file')
		} else {
			const file = filepath + filename
			fs.writeFile(file, jsonString, 'utf8', function (err) {
				if (err) {
					reject('An error occured while writing JSON Object to File.')
				}
				resolve('Success writing the file!')
			})
		}
	})
}

export { readJsonFile, writeJsonFile }

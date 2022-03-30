import * as fs from 'fs'

/**
 * @description Function for reading json file in the given filepath
 *
 * @param filePath (string) : directory + filename
 * @returns Promise (TReturn) : Return promised data with TReturn type
 */
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

/**
 * @description Function to write json data into an output file directory
 *
 *
 * @param filepath (string): Absolute filepath directory
 * @param filename (string): Filename of the output file
 * @param jsonString (string): Stringified json data
 * @returns Promise (string) : Promise with success message if success
 */

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

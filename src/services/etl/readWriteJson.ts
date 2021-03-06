import * as fs from 'fs'

/**
 * @description Function for reading json file in the given filepath
 *
 * @param filePath (string) : directory + filename
 * @returns Promise (TReturn) : Return promised data with TReturn type
 */
function readJsonFile<TReturn>(filePath: string): Promise<TReturn> {
	return new Promise((resolve) => {
		if (!filePath.includes('.json')) {
			throw new Error('Error! Can only read JSON file in .json')
		} else {
			fs.readFile(filePath, 'utf8', (error, jsonString) => {
				if (error != null) {
					throw new Error('Error while reading the file!')
				}

				try {
					const returnData: TReturn = JSON.parse(jsonString)
					resolve(returnData)
				} catch (err) {
					throw new Error('Error parsing JSON data from file!')
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
	return new Promise((resolve) => {
		if (!filename.includes('.json')) {
			throw new Error('Error! Can only save json data into .json file')
		} else {
			const file = filepath + filename
			fs.writeFile(file, jsonString, 'utf8', function (err) {
				if (err) {
					throw new Error('An error occured while writing JSON Object to File.')
				}
				resolve('Success writing the file!')
			})
		}
	})
}

export { readJsonFile, writeJsonFile }

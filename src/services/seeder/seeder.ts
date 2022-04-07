import { readJsonFile } from '../etl/readWriteJson'

export const getSeedData = <TSeed>(filename: string): Promise<TSeed> => {
	return new Promise<TSeed>(async (resolve) => {
		const filePath = process.cwd() + '/etl/extracted_data/'
		const path = filePath + filename
		const data: TSeed = await readJsonFile(path)
		resolve(data)
	})
}

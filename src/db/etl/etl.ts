import { IMenu, IRawRestaurant, IRestaurant, IRestaurantMenu } from '../../types/restaurant.types'

import {
	etAllMenuData,
	etRestaurantData,
	etRestaurantMenuData
} from '../../services/etl/extractRestaurantData'
import { readJsonFile, writeJsonFile } from '../../services/etl/readWriteJson'
import { etUserData, etPurchaseHistory } from '../../services/etl/extractUserData'
import { IRawUser, IUser } from '../../types/users.types'

function getFilePath(type: 'rawpath' | 'outpath'): string {
	const absPath = process.cwd()
	const rawDataPath = '/src/db/etl/source_data/'
	const outDataPath = '/src/db/etl/extracted_data/'

	const rawFilepath = absPath + rawDataPath
	const outFilePath = absPath + outDataPath

	if (type === 'rawpath') {
		return rawFilepath
	} else {
		return outFilePath
	}
}

// ETL: Restaurant Data & Working Hours. Load to New JSON
async function etlResto() {
	const rawFile = 'restaurants.json'
	const whFile = 'workingHours.json'
	const restoFile = 'restaurants.json'

	const rawPath = getFilePath('rawpath')
	const outPath = getFilePath('outpath')

	const rawDataPath = rawPath + rawFile

	try {
		console.log('Reading restaurants data...')
		const data: IRawRestaurant[] = await readJsonFile(rawDataPath)
		console.log('Success reading restaurant data!\n')

		console.log('Start extracting restaurant & working hours data')
		const extractTransform = etRestaurantData(data)
		console.log('Success extracting and transforming data!\n')

		console.log('Start converting JSON data to string...')
		const whContent = JSON.stringify(extractTransform.workingHours)
		const restoContent = JSON.stringify(extractTransform.restoData)
		console.log('Success converting JSON data to string!\n')

		console.log('Start writing extracted data to the output directory...\n')
		const writeWh = await writeJsonFile(outPath, whFile, whContent)
		const writeRd = await writeJsonFile(outPath, restoFile, restoContent)

		const succesMsgWH =
			writeWh +
			' Working hours data extracted, transformed, and loaded to new json file successfully!'
		const succesMsgRd =
			writeRd +
			' Restaurants data extracted, transformed, and loaded to new json file successfully!\n'

		console.log(succesMsgWH)
		console.log(succesMsgRd)
	} catch (err) {
		console.error(err)
		throw new Error('Error extracting and transforming restaurants data!')
	}
}

async function etlMenu() {
	const menuFile = 'menu.json'
	const rawFile = 'restaurants.json'

	const rawPath = getFilePath('rawpath')
	const outPath = getFilePath('outpath')

	const rawDataPath = rawPath + rawFile

	try {
		console.log('Reading restaurants data...')
		const data: IRawRestaurant[] = await readJsonFile(rawDataPath)
		console.log('Success reading restaurant data!\n')

		console.log('Start extracting menu data...')
		const extractTransform = etAllMenuData(data)
		console.log('Success extracting and transforming menu data!\n')

		console.log('Start converting JSON data to string...')
		const menuContent = JSON.stringify(extractTransform)
		console.log('Success converting JSON data to string!\n')

		console.log('Start writing extracted data to the output directory...\n')
		const writeMenu = await writeJsonFile(outPath, menuFile, menuContent)

		const succesMsgMenu =
			writeMenu + ' Menu data extracted, transformed, and loaded to new json file successfully\n'
		console.log(succesMsgMenu)
	} catch (err) {
		console.log(err)
		throw new Error('Error extracting and transforming restaurants data')
	}
}

async function etlRestoMenu() {
	const restoMenuFile = 'restaurantsMenu.json'

	const menuFile = 'menu.json'
	const restoFile = 'restaurants.json'

	const rawPath = getFilePath('rawpath')
	const outPath = getFilePath('outpath')

	const menuPath = outPath + menuFile
	const restoPath = outPath + restoFile
	const restoRawPath = rawPath + restoFile

	try {
		console.log('Reading restaurants, menu, and raw restaurants data...')
		const menu: IMenu[] = await readJsonFile(menuPath)
		const resto: IRestaurant[] = await readJsonFile(restoPath)
		const rawResto: IRawRestaurant[] = await readJsonFile(restoRawPath)
		console.log('Reading all data successfully completed!\n')

		console.log('Start extracting restaurant menu data...')
		const extractTransform = etRestaurantMenuData(menu, resto, rawResto)
		console.log('Success extracting and transforming restaurants menu data!\n')

		console.log('Start converting JSON data to string...')
		const restoMenuContent = JSON.stringify(extractTransform)
		const writeRestoMenu = await writeJsonFile(outPath, restoMenuFile, restoMenuContent)
		console.log('Success converting JSON data to string!\n')

		const succesMsgMenu =
			writeRestoMenu +
			" Restaurants' Menu data extracted, transformed, and loaded to new json file successfully\n"
		console.log(succesMsgMenu)
	} catch (err) {
		console.log(err)
		throw new Error('Error extracting and transforming restaurants data')
	}
}

async function etlUserData() {
	const userFile = 'users.json'

	const rawPath = getFilePath('rawpath')
	const outPath = getFilePath('outpath')

	const userPath = rawPath + userFile

	try {
		console.log('Reading restaurants data...')
		const data: IRawUser[] = await readJsonFile(userPath)
		console.log('Success reading restaurant data!\n')

		console.log('Start extracting menu data...')
		const extractTransform = etUserData(data)
		console.log('Success extracting and transforming menu data!\n')

		console.log('Start converting JSON data to string...')
		const usersContent = JSON.stringify(extractTransform)
		console.log('Success converting JSON data to string!\n')

		console.log('Start writing extracted data to the output directory...\n')
		const writeUser = await writeJsonFile(outPath, userFile, usersContent)

		const succesMsgUser =
			writeUser + ' Users data extracted, transformed, and loaded to new json file successfully\n'
		console.log(succesMsgUser)
	} catch (err) {
		console.log(err)
		throw new Error('Error extracting and transforming users data')
	}
}

async function etlPurchaseHistory() {
	const phFile = 'purchaseHistory.json'

	const menuFile = 'menu.json'
	const userFile = 'users.json'
	const restoFile = 'restaurants.json'
	const restoMenuFile = 'restaurantsMenu.json'

	const rawPath = getFilePath('rawpath')
	const outPath = getFilePath('outpath')

	const menuPath = outPath + menuFile
	const restoPath = outPath + restoFile
	const userRawPath = rawPath + userFile
	const restoMenuPath = outPath + restoMenuFile

	try {
		console.log('Reading restaurants, menu, and raw restaurants data...')
		const menu: IMenu[] = await readJsonFile(menuPath)
		const users: IRawUser[] = await readJsonFile(userRawPath)
		const rawResto: IRestaurant[] = await readJsonFile(restoPath)
		const restoMenu: IRestaurantMenu[] = await readJsonFile(restoMenuPath)
		console.log('Reading all data successfully completed!\n')

		console.log("Start extracting users' purchase history data...")
		const extractTransform = etPurchaseHistory(users, menu, rawResto, restoMenu)
		console.log('Success extracting and transforming restaurants menu data!\n')

		console.log('Start converting JSON data to string...')
		const phContent = JSON.stringify(extractTransform)
		const writePH = await writeJsonFile(outPath, phFile, phContent)
		console.log('Success converting JSON data to string!\n')

		const succesMsgMenu =
			writePH +
			" Restaurants' Menu data extracted, transformed, and loaded to new json file successfully\n"
		console.log(succesMsgMenu)
	} catch (err) {
		console.log(err)
		throw new Error('Error extracting and transforming purchase history data')
	}
}

export async function processRelevantData() {
	console.log(
		'########### Begin Extraction & Process Restaurants & Working Hours Data ###########\n'
	)
	await etlResto()

	console.log('########### Begin Extraction & Process Menu Data ###########\n')
	await etlMenu()

	console.log('########### Begin Extraction & Processing Restaurant Menu Data ###########\n')
	await etlRestoMenu()

	console.log('########### Begin Extraction & Processing Users Data ###########\n')
	await etlUserData()

	console.log(
		"########### Begin Extraction & Processing Users' Purchase History Data ###########\n"
	)
	etlPurchaseHistory()
}

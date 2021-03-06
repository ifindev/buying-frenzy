import { Knex } from 'knex'
import { Database } from '../../configs'
import { getSeedData } from '../../services/seeder/seeder'
import { IWorkingHours } from '../../types/restaurant.types'

export async function seed(knex: Knex): Promise<void> {
	try {
		// Number of data in each batch
		const chunkSize = 1000

		// get data
		const data = await getSeedData<IWorkingHours[]>('workingHours.json')

		// Deletes ALL existing entries
		await knex(`${Database.schema}.WorkingHours`).del()

		// Inserts seed entries using batch insert
		await knex.batchInsert(`${Database.schema}.WorkingHours`, data, chunkSize)

		console.log('Seeding working hours data success')
	} catch (err) {
		console.error('Seeding working hours data error')
	}
}

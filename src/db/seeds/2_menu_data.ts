import { Knex } from 'knex'
import { Database } from '../../configs'
import { getSeedData } from '../../services/seeder/seeder'
import { IMenu } from '../../types/restaurant.types'

export async function seed(knex: Knex): Promise<void> {
	try {
		// Number of data in each batch
		const chunkSize = 1000

		const data = await getSeedData<IMenu[]>('menu.json')

		// Deletes ALL existing entries
		await knex(`${Database.schema}.Menu`).del()

		// Inserts seed entries using batch insert
		await knex.batchInsert(`${Database.schema}.Menu`, data, chunkSize)

		console.log('Seeding menu data success')
	} catch (err) {
		console.error(err)
		console.error('Seeding menu error')
	}
}

import { Knex } from 'knex'
import { Database } from '../../configs'
import { getSeedData } from '../../services/seeder/seeder'
import { IRestaurant } from '../../types/restaurant.types'

export async function seed(knex: Knex): Promise<void> {
	try {
		// Number of data in each batch
		const chunkSize = 3000

		// get data
		const data = await getSeedData<IRestaurant[]>('restaurants.json')

		// Deletes ALL existing entries
		await knex(`${Database.schema}.Restaurant`).del()

		// Inserts seed entries
		await knex.batchInsert(`${Database.schema}.Restaurant`, data, chunkSize)

		console.log('Seeding restaurants data success')
	} catch (err) {
		console.error('Seeding restaurant data error')
	}
}

import { Knex } from 'knex'
import { getSeedData } from '../../services/seeder/seeder'
import { IMenu } from '../../types/restaurant.types'

export async function seed(knex: Knex): Promise<void> {
	try {
		// Number of data in each batch
		const chunkSize = 1000

		const data = await getSeedData<IMenu[]>('menu.json')

		// Deletes ALL existing entries
		await knex('Menu').del()

		// Inserts seed entries using batch insert
		await knex.batchInsert('Menu', data, chunkSize)

		console.log('Seeding menu data success')
	} catch (err) {
		console.error(err)
		console.error('Seeding menu error')
	}
}

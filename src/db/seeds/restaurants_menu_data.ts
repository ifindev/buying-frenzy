import { Knex } from 'knex'
import { getSeedData } from '../../services/seeder/seeder'
import { IRestaurantMenu } from '../../types/restaurant.types'

export async function seed(knex: Knex): Promise<void> {
	try {
		// Number of data in each batch
		const chunkSize = 1000

		// get data
		const data = await getSeedData<IRestaurantMenu[]>('restaurantsMenu.json')

		// Deletes ALL existing entries
		await knex('RestaurantMenu').del()

		// Inserts seed entries using batch insert
		await knex.batchInsert('RestaurantMenu', data, chunkSize)

		console.log('Seeding restaurant menu data success')
	} catch (err) {
		console.error(err)
		console.error("Seeding restaurant's menu data error")
	}
}

import { Knex } from 'knex'
import { getSeedData } from '../../services/seeder/seeder'
import { IUser } from '../../types/users.types'

export async function seed(knex: Knex): Promise<void> {
	try {
		// Number of data in each batch
		const chunkSize = 1000

		// get data
		const data = await getSeedData<IUser[]>('users.json')

		// Deletes ALL existing entries
		await knex('User').del()

		// Inserts seed entries using batch insert
		await knex.batchInsert('User', data, chunkSize)

		console.log('Seeding users data success')
	} catch (err) {
		console.error('Seeding user data error')
	}
}

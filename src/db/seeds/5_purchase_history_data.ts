import { Knex } from 'knex'
import { getSeedData } from '../../services/seeder/seeder'
import { IPurchaseHistory } from '../../types/users.types'

export async function seed(knex: Knex): Promise<void> {
	try {
		// Number of data in each batch
		const chunkSize = 1000

		// get data
		const data = await getSeedData<IPurchaseHistory[]>('purchaseHistory.json')

		// Deletes ALL existing entries
		await knex('PurchaseHistory').del()

		// Inserts seed entries using batch insert
		await knex.batchInsert('PurchaseHistory', data, chunkSize)

		console.log('Seeding purchase history data success')
	} catch (err) {
		console.error(err)
		console.error('Seeding purchase history error')
	}
}

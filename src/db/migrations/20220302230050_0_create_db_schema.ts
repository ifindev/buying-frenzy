import { Knex } from 'knex'
import { Database } from '../../configs'

export async function up(knex: Knex): Promise<void> {
	await knex.raw(`CREATE SCHEMA ${Database.schema};`)
}

export async function down(knex: Knex): Promise<void> {}

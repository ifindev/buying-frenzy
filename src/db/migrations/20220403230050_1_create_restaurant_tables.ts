import { Knex } from 'knex'
import { Database } from '../../configs'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.withSchema(Database.schema).createTable('Restaurant', function (table) {
		table.increments('restaurantId').primary().notNullable()
		table.string('restaurantName', 255)
		table.decimal('cashBalance', 8, 3).comment('Cash balance owned by the restaurant')
	})

	await knex.schema.withSchema(Database.schema).createTable('WorkingHours', function (table) {
		table.increments('workingHoursId').primary().notNullable()
		table
			.bigInteger('restaurantId')
			.unsigned()
			.references('restaurantId')
			.inTable(`${Database.schema}.Restaurant`)
		table.integer('dayOfWeek')
		table.integer('openingHour')
		table.integer('closingHour')
	})
}

export async function down(knex: Knex): Promise<void> {}

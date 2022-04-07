import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('Restaurant', function (table) {
			table.increments('restaurantId').primary().notNullable()
			table.string('restaurantName', 255)
			table.decimal('cashBalance', 8, 3).comment('Cash balance owned by the restaurant')
		})

		.createTable('WorkingHours', function (table) {
			table.increments('workingHoursId').primary().notNullable()
			table.bigInteger('restaurantId').unsigned().references('restaurantId').inTable('Restaurant')
			table.integer('dayOfWeek')
			table.integer('openingHour')
			table.integer('closingHour')
		})
}

export async function down(knex: Knex): Promise<void> {}

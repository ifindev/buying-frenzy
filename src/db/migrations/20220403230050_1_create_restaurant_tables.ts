import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('Restaurant', function (table) {
			table.increments('RestaurantID').primary().notNullable()
			table.string('RestaurantName', 255)
			table.decimal('CashBalance', 8, 3).comment('Cash balance owned by the restaurant')
			table.timestamps(true, true)
		})

		.createTable('WorkingHours', function (table) {
			table.increments('WorkingHoursID').primary().notNullable()
			table.bigInteger('RestaurantID').unsigned().references('RestaurantID').inTable('Restaurant')
			table.integer('DayOfWeek')
			table.integer('OpenTime')
			table.integer('CloseTime')
			table.timestamps(true, true)
		})
}

export async function down(knex: Knex): Promise<void> {}

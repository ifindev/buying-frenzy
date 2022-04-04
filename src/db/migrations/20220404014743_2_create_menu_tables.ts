import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('Menu', function (table) {
			table.increments('MenuID').primary().notNullable()
			table.string('Dishname')
			table.timestamps(true, true)
		})

		.createTable('RestaurantMenu', function (table) {
			table.increments('RestaurantMenuID').primary().notNullable()
			table.bigInteger('RestaurantID').unsigned().references('RestaurantID').inTable('Restaurant')
			table.bigInteger('MenuID').unsigned().references('MenuID').inTable('Menu')
			table.decimal('Price', 8, 3)
			table.timestamps(true, true)
		})
}

export async function down(knex: Knex): Promise<void> {}

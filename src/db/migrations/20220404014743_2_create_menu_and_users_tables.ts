import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('Menu', function (table) {
			table.increments('menuId').primary().notNullable()
			table.string('dishname', 1000)
		})

		.createTable('RestaurantMenu', function (table) {
			table.increments('restaurantMenuId').primary().notNullable()
			table.bigInteger('restaurantId').unsigned().references('restaurantId').inTable('Restaurant')
			table.bigInteger('menuId').unsigned().references('menuId').inTable('Menu')
			table.decimal('price', 8, 3)
		})
}

export async function down(knex: Knex): Promise<void> {}

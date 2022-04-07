import { Knex } from 'knex'
import { Database } from '../../configs'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.withSchema(Database.schema).createTable('Menu', function (table) {
		table.increments('menuId').primary().notNullable()
		table.string('dishname', 1000)
	})

	await knex.schema.withSchema(Database.schema).createTable('RestaurantMenu', function (table) {
		table.increments('restaurantMenuId').primary().notNullable()
		table
			.bigInteger('restaurantId')
			.unsigned()
			.references('restaurantId')
			.inTable(`${Database.schema}.Restaurant`)
		table.bigInteger('menuId').unsigned().references('menuId').inTable(`${Database.schema}.Menu`)
		table.decimal('price', 8, 3)
	})
}

export async function down(knex: Knex): Promise<void> {}

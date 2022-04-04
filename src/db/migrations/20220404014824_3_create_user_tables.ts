import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema

		.createTable('User', function (table) {
			table.increments('UserID').primary().notNullable()
			table.string('Name', 255)
			table.decimal('CashBalance', 8, 3).comment('Cash balance owned by the user')
			table.timestamps(true, true)
		})

		.createTable('PurchaseHistory', function (table) {
			table.increments('PurchaseHistoryID').primary().notNullable()
			table.bigInteger('RestaurantMenuID').references('RestaurantMenuID').inTable('RestaurantMenu')
			table.bigInteger('UserID').references('UserID').inTable('User')
			table.decimal('TransactionAmount', 8, 3)
			table.datetime('TransactionDate', { useTz: false })
			table.timestamps(true, true)
		})

		.createTable('RestaurantBalanceSheet', function (table) {
			table.increments('RestaurantBalanceSheetID').primary().notNullable()
			table
				.bigInteger('PurchaseHistoryID')
				.references('PurchaseHistoryID')
				.inTable('PurchaseHistory')
			table.decimal('CashIn', 8, 3)
			table.decimal('RemainingCashBalance', 8, 3)
			table.timestamps(true, true)
		})

		.createTable('UserBalanceSheet', function (table) {
			table.increments('UserBalanceSheetID').primary().notNullable()
			table.bigInteger('UserID').references('UserID').inTable('User')
			table
				.bigInteger('PurchaseHistoryID')
				.references('PurchaseHistoryID')
				.inTable('PurchaseHistory')
			table.decimal('CashOut', 8, 3)
			table.decimal('RemainingCashBalance')
			table.timestamps(true, true)
		})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTable('UserBalanceSheet')
		.dropTable('RestaurantBalanceSheet')
		.dropTable('PurchaseHistory')
		.dropTable('User')
		.dropTable('RestaurantMenu')
		.dropTable('Menu')
		.dropTable('WorkingHours')
		.dropTable('Restaurant')
}

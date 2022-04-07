import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('User', function (table) {
			table.increments('userId').primary().notNullable()
			table.string('name', 255)
			table.decimal('cashBalance', 8, 3).comment('Cash balance owned by the user')
			table.timestamps(true, true)
		})

		.createTable('PurchaseHistory', function (table) {
			table.increments('purchaseHistoryId').primary().notNullable()
			table.bigInteger('restaurantMenuId').references('restaurantMenuId').inTable('RestaurantMenu')
			table.bigInteger('userId').references('userId').inTable('User')
			table.decimal('transactionAmount', 8, 3)
			table.datetime('transactionDate', { useTz: false })
			table.timestamps(true, true)
		})

		.createTable('RestaurantBalanceSheet', function (table) {
			table.increments('restaurantBalanceSheetId').primary().notNullable()
			table
				.bigInteger('purchaseHistoryId')
				.references('purchaseHistoryId')
				.inTable('PurchaseHistory')
			table.decimal('cashIn', 8, 3)
			table.decimal('remainingCashBalance', 8, 3)
			table.timestamps(true, true)
		})

		.createTable('UserBalanceSheet', function (table) {
			table.increments('userBalanceSheetId').primary().notNullable()
			table.bigInteger('userId').references('userId').inTable('User')
			table
				.bigInteger('purchaseHistoryId')
				.references('purchaseHistoryId')
				.inTable('PurchaseHistory')
			table.decimal('cashOut', 8, 3)
			table.decimal('remainingCashBalance')
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

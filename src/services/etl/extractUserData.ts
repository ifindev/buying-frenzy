import { IMenu, IRestaurant, IRestaurantMenu } from '../../types/restaurant.types'
import { IPurchaseHistory, IRawUser, IUser } from '../../types/users.types'

function etUserData(users: IRawUser[]): IUser[] {
	const tranformedUser: IUser[] = []

	users.forEach((user) => {
		tranformedUser.push({
			userId: user.id,
			name: user.name,
			cashBalance: user.cashBalance
		})
	})

	return tranformedUser
}

function etPurchaseHistory(
	users: IRawUser[],
	menu: IMenu[],
	restaurants: IRestaurant[],
	restoMenu: IRestaurantMenu[]
): IPurchaseHistory[] {
	let phID = 0
	const history: IPurchaseHistory[] = []

	users.map((user) => {
		user.purchaseHistory.forEach((ph) => {
			const dishName = ph.dishName
			const restoName = ph.restaurantName

			const resto = restaurants.filter(
				(resto) => resto.restaurantName.toLowerCase() === restoName.trim().toLowerCase()
			)
			const menuItem = menu.filter(
				(men) => men.dishname.toLowerCase() === dishName.trim().toLowerCase()
			)

			if (resto.length > 0 && menuItem.length > 0) {
				const mnResto = restoMenu.filter(
					(item) =>
						item.menuId === menuItem[0].menuId && item.restaurantId === resto[0].restaurantId
				)

				if (mnResto.length > 0) {
					phID += 1
					history.push({
						purchaseHistoryId: phID,
						restaurantMenuId: mnResto[0].restaurantMenuId,
						userId: user.id,
						transactionAmount: ph.transactionAmount,
						transactionDate: ph.transactionDate
					})
				}
			}
		})
	})

	return history
}

export { etUserData, etPurchaseHistory }

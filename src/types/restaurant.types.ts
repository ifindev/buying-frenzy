//  Type Aliases
type MenuId = number
type MenuName = string
type RestaurantId = number
type RestaurantName = string

// Interfaces
interface IRawMenu {
	dishName: string
	price: number
}

interface IRawRestaurant {
	restaurantName: string
	cashBalance: number
	openingHours: string
	menu: IRawMenu[]
}

interface IRestaurant {
	restaurantId: number
	restaurantName: string
	cashBalance: number
}

interface IWorkingHours {
	restaurantId: number
	dayOfWeek: number
	openingHour: number
	closingHour: number
}

interface IMenu {
	menuId: number
	dishname: string
}

interface IRestaurantMenu {
	restaurantMenuId: number
	restaurantId: number
	menuId: number
	price: number
}

export {
	MenuId,
	MenuName,
	RestaurantId,
	RestaurantName,
	IRawMenu,
	IRawRestaurant,
	IRestaurant,
	IWorkingHours,
	IMenu,
	IRestaurantMenu
}

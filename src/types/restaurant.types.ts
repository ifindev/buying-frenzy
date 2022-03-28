interface MenuRaw {
	dishName: string
	price: number
}

interface RawRestaurant {
	cashBalance: number
	openingHours: string
	restaurantName: string
	menu: MenuRaw
}

interface Restaurant {
	restaurantId: number
	restaurantName: string
	cashBalance: number
}

interface Menu {
	menuId: number
	dishname: string
}

interface RestaurantMenu {
	restaurantMenuId: number
	restaurantId: number
	menuId: number
	price: number
}

interface OpeningHours {
	restaurantId: number
	dayOfWeek: number
	openTime: number
	closeTime: number
}

export { MenuRaw, RawRestaurant, Restaurant, Menu, RestaurantMenu, OpeningHours }

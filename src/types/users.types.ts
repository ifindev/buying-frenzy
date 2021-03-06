interface IRawPurchaseHistory {
	dishName: string
	restaurantName: string
	transactionAmount: number
	transactionDate: string
}

interface IRawUser {
	id: number
	name: string
	cashBalance: number
	purchaseHistory: IRawPurchaseHistory[]
}

interface IUser {
	userId: number
	name: string
	cashBalance: number
}

interface IPurchaseHistory {
	purchaseHistoryId: number
	restaurantMenuId: number
	userId: number
	transactionAmount: number
	transactionDate: string
}

export { IRawPurchaseHistory, IRawUser, IUser, IPurchaseHistory }

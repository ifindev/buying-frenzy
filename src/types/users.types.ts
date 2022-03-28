type TRawPurchaseHistory = {
	dishname: string
	restaurantName: string
	transactionAmount: number
	transactionDate: string
}

type TRawUser = {
	id: number
	name: string
	purchaseHistory: TRawPurchaseHistory
}

type TUser = {
	userId: number
	name: string
	cashBalance: number
}

type TPurchaseHistory = {
	purchaseHistoryId: number
	restaurantMenuId: number
	userId: number
	transactionAmount: number
	transactionDate: string
}

export { TRawPurchaseHistory, TRawUser, TUser, TPurchaseHistory }

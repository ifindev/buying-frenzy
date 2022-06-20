const DEFAULT_RECORD_NUMBER_PER_PAGE = 15

const getOffsetLimitFromPage = (
	page: number,
	per_page: number | null | undefined
): { limit: number; offset: number } => {
	let limit = DEFAULT_RECORD_NUMBER_PER_PAGE
	if (per_page) {
		limit = per_page
	}

	const offset = page < 0 ? 0 : (page - 1) * limit

	return { limit, offset }
}

export default getOffsetLimitFromPage

import { Context } from 'koa'

export default class MenuController {
	public static getAll(ctx: Context) {
		ctx.body = { message: 'All Menu' }
	}
}

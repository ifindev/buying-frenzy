import db from './db/db'
import { Database } from './configs'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import configs from './configs'

import { menuRouter } from './routes'

// const Koa = require('koa');
const app = new Koa()
const router = new Router()

const PORT = configs.Server.port

router.get('/', (ctx, next) => {
	ctx.body = { message: 'Hello World!' }
	next()
})

router.get('/test', async (ctx) => {
	try {
		const data = await db.select('*').from(`${Database.schema}.Menu`).limit(10).offset(0)
		ctx.body = { data: data }
	} catch (err) {
		ctx.body = { message: err }
	}
})

app.use(router.routes()).use(router.allowedMethods())
app.use(menuRouter.routes()).use(menuRouter.allowedMethods())

const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`)
})

export default server

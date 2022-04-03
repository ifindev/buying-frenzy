import * as Koa from 'koa'
import * as Router from 'koa-router'

// const Koa = require('koa');
const app = new Koa()
const router = new Router()

const PORT = 1337

router.get('/', (ctx, next) => {
	ctx.body = { message: 'Hello World! This is running in docker' }
	next()
})

app.use(router.routes()).use(router.allowedMethods())

const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`)
})

export default server

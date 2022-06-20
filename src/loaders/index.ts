import * as Koa from 'koa'
import * as Router from 'koa-router'
import { ApiVersion } from '../configs'

const app = new Koa()

const v1 = new Router({
	prefix: ApiVersion.v1
})

export { app, v1 }

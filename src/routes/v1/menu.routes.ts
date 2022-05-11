import * as Router from 'koa-router'
import { menu } from '../../controllers'
import { ApiVersion } from '../../configs'

const router = new Router({
	prefix: ApiVersion.v1
})

router.get('/menus', menu.getAll)

export default router

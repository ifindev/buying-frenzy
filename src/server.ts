import { app, v1 } from './loaders'
import configs from './configs'
import { menuRouter } from './routes'

const PORT = configs.Server.port

// routes
app.use(menuRouter.routes())

const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`)
})

export default server

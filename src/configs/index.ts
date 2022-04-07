import * as dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const nodeEnv = process.env.NODE_ENV

const envFound = dotenv.config({ path: `${__dirname}/../../.env` })
if (envFound.error) {
	// Crash the whole process
	throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export namespace Database {
	export const schema =
		nodeEnv === 'development'
			? process.env.DB_SCHEMA_DEV!
			: nodeEnv === 'test'
			? process.env.DB_SCHEMA_TEST!
			: process.env.DB_SCHEMA_PROD!
	export const url = process.env.DB_URL
	export const host = process.env.DB_HOST
	export const user = process.env.DB_USER
	export const database = process.env.DATABASE
	export const password = process.env.DB_PASSWORD
	export const minPoolSize = parseInt(process.env.DB_MIN_POOL_SIZE!)
	export const maxPoolSize = parseInt(process.env.DB_MAX_POOL_SIZE!)
	export const port = parseInt(process.env.DB_PORT!, 10)
}

export namespace Server {
	export const port =
		process.env.NODE_ENV === 'docker' ? 1337 : parseInt(process.env.PORT || '3001', 10)
	export const isDev = process.env.NODE_ENV === 'development'
}

export namespace KnexCfg {
	export const schema = 'resto'

	export const config = {
		client: 'postgresql',
		connection: {
			host: Database.host,
			database: Database.database,
			user: Database.user,
			password: Database.password,
			port: Database.port,
			schema: Database.schema
		},
		pool: {
			min: Database.minPoolSize,
			max: Database.maxPoolSize
		},
		migrations: {
			tableName: 'KnexMigrations'
		},
		seeds: {
			directory: './seeds'
		}
	}
}

export namespace ApiVersion {
	export const v1 = '/api/v1'
}

export default { Database, Server, KnexCfg, ApiVersion }

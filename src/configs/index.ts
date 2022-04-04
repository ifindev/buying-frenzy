import * as dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config({ path: `${__dirname}/../../.env` })
if(envFound.error) {
  // Crash the whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export namespace Database {
  export const schema = 'api'
  export const url= process.env.DB_URL
  export const host = process.env.DB_HOST
  export const user = process.env.DB_USER
  export const database = process.env.DATABASE
  export const password = process.env.DB_PASSWORD
  export const minPoolSize = parseInt(process.env.DB_MIN_POOL_SIZE!)
  export const maxPoolSize = parseInt(process.env.DB_MAX_POOL_SIZE!)
  export const port = parseInt(process.env.DB_PORT!, 10)
}

export namespace Server {
   export const port = parseInt(process.env.PORT || '1337', 10)
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
      port: Database.port
    },
    pool: {
      min: Database.minPoolSize,
      max: Database.maxPoolSize
    },
    migrations: {
      tableName: 'KnexMigrations'
    }
  }
}

export default {Database, Server, KnexCfg}
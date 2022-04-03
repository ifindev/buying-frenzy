import * as dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if(envFound.error) {
  // Crash the whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Server port
   */
  port: parseInt(process.env.PORT || '1337', 10),

  /**
   * DB Configs
   */
  db: {
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    poolSize: process.env.POOL_SIZE,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  }
}
import knex from 'knex'
import { KnexCfg } from '../configs'

const db = knex(KnexCfg.config)

export default db

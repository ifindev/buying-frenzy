import knex from "knex";
import { KnexCfg } from "../configs";

const dbConnect = knex(KnexCfg.config)

export default dbConnect
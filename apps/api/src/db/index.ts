import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { resolve } from 'path'
import { mkdirSync } from 'fs'

const dbPath = resolve(process.env.DATABASE_URL || './data/cyberlab.db')
mkdirSync(resolve(dbPath, '..'), { recursive: true })

const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, { schema })
export { schema }

import { Pool } from 'pg'
// or `import * as Cursor from 'pg-cursor'` depending on your tsconfig
import Cursor from 'pg-cursor'
import { DatabaseConnection, Kysely, PostgresDialect  } from 'kysely'
import { Database } from './interfaces/Database'



const db = new Kysely<Database>({
  dialect : new PostgresDialect({
    pool : new Pool({
      host : 'business-management-db.cbsjx2xbocfb.eu-north-1.rds.amazonaws.com',
      database : 'business-management-db',
      user : 'postgres',
      password : 'postgres123',
      port : 5432
    })
  })
}) 




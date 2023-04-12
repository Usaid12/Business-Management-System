import { Pool } from 'pg';
import Cursor from 'pg-cursor';
import { CompiledQuery, Kysely, PostgresDialect } from 'kysely';

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      database: 'kysely_test',
    }),
    cursor: Cursor,
    onCreateConnection(connection) {
      connection.executeQuery(CompiledQuery.raw('SELECT 1 + 1'));
    },
  }),
})
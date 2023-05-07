import { Kysely } from 'kysely';
import { createTable } from '../base-create-table';

const tableName = 'roles';

export async function up(db: Kysely<any>): Promise<void> {
  const query = createTable(db, tableName, (db) => {
    return db.addColumn('name', 'varchar(255)', (col) => col.notNull());
  });
  await query.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(tableName).execute();
}
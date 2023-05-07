import { Kysely } from 'kysely';
import { createTable } from '../base-create-table';

const tableName = 'users';

export async function up(db: Kysely<any>): Promise<void> {
  const query = createTable(db, tableName, (db) => {
    return db
      .addColumn('first_name', 'varchar(255)', (col) => col.notNull())
      .addColumn('last_name', 'varchar(255)')
      .addColumn('gender', 'varchar(50)', (col) => col.notNull())
      .addColumn('phone_number', 'varchar(255)', (col) =>
        col.notNull(),
      )
      .addColumn('password', 'varchar(255)', (col) => col.notNull())
      .addColumn('email', 'varchar(255)', (col) => col.notNull())
      .addColumn('role_id', 'integer', (col) => col.notNull())
      .addForeignKeyConstraint(
        'user_role_id_fk',
        ['role_id'],
        'roles',
        ['id'],
        (cb) => cb.onDelete('cascade'),
      );
  });

  await query.execute();

  await db.schema
    .createIndex('user_role_id_fk')
    .on('users')
    .column('role_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(tableName).execute();
}

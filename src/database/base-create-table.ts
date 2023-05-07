import { CreateTableBuilder, Kysely, sql } from 'kysely';


type CreateTableCallBack<T extends string, R extends string> = (builder: CreateTableBuilder<T, 'id'>) => CreateTableBuilder<T, 'id' | R>

export const createTable = <T extends string, R extends string>(db: Kysely<any>, tableName: T, cb: CreateTableCallBack<T, R>) => {
  const table = db.schema
    .createTable<T>(tableName)
    .addColumn('id', 'serial', (col) => col.primaryKey());
  return cb(table)
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`NOW()`),
    )
    .addColumn('updated_at', 'timestamptz')
    .addColumn('deleted_at', 'timestamptz');
};

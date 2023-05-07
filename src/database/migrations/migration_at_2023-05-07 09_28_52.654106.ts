import { Kysely , sql } from "kysely";

export async function up(db : Kysely<any>) : Promise<void> {
    await db.schema
    .createTable('OrderTable')
    .addColumn('orderid' , 'serial' , (col) => col.primaryKey())
    .addColumn('date' , 'date' , (col) => col.notNull())
    .addColumn('status' , 'varchar(33.33)' , (col) => col.notNull())
    .addColumn('total_price' , 'integer' , (col) => col.notNull())
    .addColumn('shipping_address' , 'varchar' , (col) => col.notNull())
    .addColumn('billing_address' , 'varchar' , (col) => col.notNull())
    .addColumn('user_id' , 'integer' , (col) => col.notNull())
    .addColumn('company_id' , 'integer' , (col) => col.notNull())
    .execute()
}


export async function down(db : Kysely<any>)  : Promise<void>{
    await db.schema.dropTable('OrderTable').execute()
}
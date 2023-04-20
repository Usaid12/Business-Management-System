import { Pool } from 'pg'
import {
  Kysely, PostgresDialect, Generated, ColumnType, Selectable, Insertable, Updateable,
} from 'kysely';

export interface OrderTable {
    orderid : Generated<Number>
    date : Date
    status : 'Completed' | 'Pending' | 'Cancelled'
    total_price : Number
    shipping_address : string
    billing_address : string
    user_id : Number
    company_id : Number
}

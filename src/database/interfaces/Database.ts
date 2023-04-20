import { Pool } from 'pg'
import {
  Kysely, PostgresDialect, Generated, ColumnType, Selectable, Insertable, Updateable,
} from 'kysely';
import { OrderTable } from './Order';

export interface Database {
    order : OrderTable
  }

  
import { Generated } from "kysely";

interface BaseTable {
  id: Generated<number>;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted_at?: string | Date;
}

interface UserTable extends BaseTable {
  first_name: string;
  last_name: string;
  role_id: number;
  email: string;
  password: string;
  gender: 'male' | 'female'
  phone_number: string;
}

interface RoleTable extends BaseTable {
  name: string;
}

export interface Database {
  users: UserTable
  roles: RoleTable
}


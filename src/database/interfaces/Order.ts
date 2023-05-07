import { Generated } from 'kysely';

export interface OrderTable {
  orderid: Generated<number>
  date: Date
  status: 'Completed' | 'Pending' | 'Cancelled'
  total_price: number
  shipping_address: string
  billing_address: string
  user_id: number
  company_id: number
}

import { BaseEntity } from '@src/util/BaseEntity';
import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ShippingDetails } from './shipping_details.entity';
import { User } from './user.entity';
import { ORDER_TABLE } from '@src/constants/db';
import { OrderItem } from './order_items.entity';

@Entity({ name: ORDER_TABLE })
export class Order extends BaseEntity {
  @Column({ name: 'user_id', type: 'integer', nullable: false })
  public userId: number;

  @Column({ name: 'quantity', type: 'integer', nullable: false })
  public quantity: number;

  @Column({ name: 'total_price', type: 'integer', nullable: false })
  public total: number;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  public status: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'user_order_fk' })
  public user: User;

  @OneToOne(() => ShippingDetails, (shippingDetails) => shippingDetails.order)
  public shippingDetails: ShippingDetails;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  public orderItems: Array<OrderItem>;
}
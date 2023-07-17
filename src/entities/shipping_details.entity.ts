import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { SHIPPING_DETAIL_TABLE } from '@src/constants/db';

@Entity({ name: SHIPPING_DETAIL_TABLE })
export class ShippingDetails extends BaseEntity {
  @Column({ name: 'carrier', type: 'varchar', nullable: false })
  public carrier: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  public address: string;

  @Column({ name: 'city', type: 'varchar', nullable: false })
  public city: string;

  @Column({ name: 'country', type: 'varchar', nullable: false })
  public country: string;

  @Column({ name: 'state', type: 'varchar', nullable: false })
  public state: string;

  @Column({ name: 'postal_code', type: 'varchar', nullable: false })
  public postalCode: string;

  @Column({ name: 'fee', type: 'integer', nullable: false })
  public fee: number;

  @Column({ name: 'delivery_date', type: 'date', nullable: false })
  public deliveryDate: Date;

  @Column({ name: 'order_id', type: 'integer', nullable: false })
  public orderId: number;

  @OneToOne(() => Order, (order) => order.shippingDetails)
  @JoinColumn({ name: 'order_id', foreignKeyConstraintName: 'order_shipment_fk', referencedColumnName: 'id' })
  public order: Order;
}


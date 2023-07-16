import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { SHIPPING_DETAIL_TABLE } from '@src/constants/db';



@Entity({ name: SHIPPING_DETAIL_TABLE })
export class ShippingDetails extends BaseEntity {
  @Column({ name: 'carrier', type: 'varchar', nullable: false  })
  public carrier: string;

  @Column({ name: 'order_id', type: 'integer', nullable: false })
  public orderId: number;

  @Column({ name: 'shipping_address', type: 'varchar', nullable: false })
  public shippingAddress: string;

  @Column({name:'shipping_cost' , type:'integer', nullable:false})
  public shippingCost: number;

  @Column({name:'shipping_date' , type:'date', nullable:false})
  public shippingDate: Date;

  @Column({ name:'delivery_date' , type:'date', nullable:false})
  public deliveryDate: Date;

  @OneToOne(() => Order, (order) => order.shippingDetails)
  @JoinColumn({ name: 'order_id', foreignKeyConstraintName: 'order_shipment_fk', referencedColumnName: 'id'  })
  public order: Order;
}


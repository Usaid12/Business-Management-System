import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { ORDER_ITEM_TABLE } from '@src/constants/db';
import { Product } from './product.entity';

@Entity({ name: ORDER_ITEM_TABLE })
export class OrderItem extends BaseEntity {
  @Column({ name: 'order_id', nullable: false, type: 'integer' })
  public orderId: number;

  @Column({ name: 'product_id', nullable: false, type: 'integer' })
  public productId: number;

  @Column({ name: 'quantity', nullable: false, type: 'integer' })
  public quantity: number;

  @Column({ name: 'price_per_unit', nullable: false, type: 'integer' })
  public pricePerUnit: number;

  @Column({ name: 'sub_total_price', nullable: false, type: 'integer' })
  public subTotalPrice: number;
  
  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({
    name: 'order_id',
    foreignKeyConstraintName: 'order_item_order_fk',
    referencedColumnName: 'id',
  })
  public order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'order_item_product_fk',
    referencedColumnName: 'id',
  })
  public product: Product;
}
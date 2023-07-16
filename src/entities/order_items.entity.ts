import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ name: 'order_items' })
export class OrderItems extends BaseEntity {
  @Column({ name: 'order_id', nullable: false, type: 'integer' })
  public orderId: number;

  @Column({ name: 'product_id', nullable: false, type: 'integer' })
  public productId: number;

  @ManyToMany(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id', foreignKeyConstraintName: 'product_orderItem_fk' })
  public product: Product;

  @ManyToMany(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id', foreignKeyConstraintName: 'order_orderItem_fk' })
  public order: Order;
}
import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'order_items' })
export class ProductImages extends BaseEntity {
  @Column({ name: 'order_id', nullable: false, type: 'integer' })
  public orderId: number;

  @Column({ name: 'product_id', nullable: false, type: 'integer' })
  public productId: number;
}
import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, OneToOne, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ShippingDetails } from './shipping_details.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({ name: 'user_id', type: 'integer', nullable: false })
  public userId: number;

  @Column({ name: 'product_id', type: 'integer', nullable: false })
  public productId: number;

  @Column({ name: 'quantity', type: 'integer', nullable: false })
  public quantity: number;

  @Column({ name: 'total_price', type: 'integer', nullable: false })
  public total: number;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  public status: string;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id', foreignKeyConstraintName: 'product_order_fk' })
  public product: Product;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'user_order_fk' })
  public user: User;

  @OneToOne(() => ShippingDetails, (shippingDetails) => shippingDetails.order)
  public shippingDetails: ShippingDetails;
}
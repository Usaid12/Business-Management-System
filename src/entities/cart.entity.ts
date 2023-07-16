import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { CART_TABLE } from '@src/constants/db';

@Entity({ name: CART_TABLE })
export class Cart extends BaseEntity {
  @Column({ name: 'user_id', nullable: false, type: 'integer' })
  public userId: number;

  @Column({ name: 'product_id', nullable: false, type: 'integer' })
  public productId: number;

  @Column({ name: 'quantity', nullable: false, type: 'integer' })
  public quantity: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id',  foreignKeyConstraintName: 'cart_product_fk_id'  })
  public product: Product;

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id',  foreignKeyConstraintName: 'user_cart_fk_id'  })
  public user: User;
}
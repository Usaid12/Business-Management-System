import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'carts' })
export class Cart extends BaseEntity {
  @Column({ name: 'user_id', nullable: false, type: 'integer' })
  public userId: number;

  @Column({ name: 'product_id', nullable: false, type: 'integer' })
  public product_id: number;

  @Column({ name: 'price', nullable: false, type: 'decimal' })
  public price: number;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'product_id',  foreignKeyConstraintName: 'cart_product_fk_id'  })
  public product: Product;

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id',  foreignKeyConstraintName: 'user_cart_fk_id'  })
  public user: User;
}
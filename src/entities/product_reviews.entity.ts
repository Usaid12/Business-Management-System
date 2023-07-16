import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { PRODUCT_REVIEW_TABLE } from '@src/constants/db';

@Entity({ name: PRODUCT_REVIEW_TABLE })
export class ProductReviews extends BaseEntity {
  @Column({ name: 'product_id', nullable: false, type: 'integer' })
  public productId: number;

  @Column({ name: 'user_id', nullable: false, type: 'integer' })
  public userId: number;

  @Column({ name: 'comments', nullable: false, type: 'text' })
  public comments: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id',  foreignKeyConstraintName: 'product_review_fk_id'  })
  public product: Product;

  @ManyToOne(() => User, (user) => user.productReviews)
  @JoinColumn({ name: 'user_id',  foreignKeyConstraintName: 'user_review_fk_id'  })
  public user: User;
}
import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { PRODUCT_IMAGE_TABLE } from '@src/constants/db';

@Entity({ name: PRODUCT_IMAGE_TABLE })
export class ProductImages extends BaseEntity {
  @Column({ name: 'product_id', nullable: false, type: 'integer' })
  public productId: number;

  @Column({ name: 'image_url', nullable: false, type: 'text' })
  public imageUrl: string;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id',  foreignKeyConstraintName: 'product_image_fk_id'  })
  public product: Product;
}
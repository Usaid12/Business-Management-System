import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity({name: 'productImages'})
export class ProductImage extends BaseEntity {
    @Column({name : 'product_id', type: 'integer'})
    public product_id: number;

    @Column({name : 'img_loc' , type: 'varchar'})
    public img_loc : string;

    @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id', foreignKeyConstraintName: 'product_product.image_fk' })
  public product: Product;
}

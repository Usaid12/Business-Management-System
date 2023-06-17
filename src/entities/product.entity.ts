import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Business } from './business.entity';
import { Category } from './category.entity';
import { ProductImages } from './product_images.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  public name: string;
  
  @Column({ name: 'description', type: 'text' })
  public description: string;
  
  @Column({ name: 'price', type: 'integer' })
  public price: number;  

  @Column({ name: 'business_id', type: 'integer' })
  public businessId: number;

  @Column({ name: 'category_id', type: 'integer' })
  public categoryId: number;

  @ManyToOne(() => Business, (business) => business.products)
  @JoinColumn({ name: 'business_id', foreignKeyConstraintName: 'product_business_fk' })
  public business: Business;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id', foreignKeyConstraintName: 'product_category_fk' })
  public category: Category;

  @OneToMany(() => ProductImages, (productImages) => productImages.product)
  public images: Array<ProductImages>;
}
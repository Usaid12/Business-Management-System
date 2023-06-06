import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Business } from './business.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  public name: string;
  
  @Column({ name: 'description', type: 'text' })
  public description: string;
  
  @Column({ name: 'price', type: 'integer' })
  public price: number;  

  @Column({ name: 'business_id', type: 'integer' })
  public business_id: number;

  @ManyToOne(() => Business, (business) => business.products)
  @JoinColumn({ name: 'business_id', foreignKeyConstraintName: 'product_business_fk' })
  public business: Business;
}
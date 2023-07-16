import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { INVENTORY_TABLE } from '@src/constants/db';

@Entity({ name: INVENTORY_TABLE })
export class Inventory extends BaseEntity {
  @Column({ name: 'quantity', type: 'integer' })
  public quantity: number;

  @Column({ name: 'price_per_unit', type: 'decimal' })
  public pricePerUnit: number;

  @Column({ name: 'arrived_at', type: 'date' })
  public arrivedAt: Date;

  @Column({ name: 'product_id', type: 'int8' })
  public productId: number;

  @ManyToOne(() => Product, product => product.inventory)
  @JoinColumn({ name: 'product_id', foreignKeyConstraintName: 'inventory_parent_fk' })
  public product: Product;
}
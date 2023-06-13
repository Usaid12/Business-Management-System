import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', unique: true })
  public name: string;

  @Column({ name: 'parent_id', type: 'int8', nullable: true })
  public parentId: number;

  @ManyToOne(() => Category, category => category.children)
  @JoinColumn({ name: 'parent_id', foreignKeyConstraintName: 'category_parent_fk' })
  public parent: Category;

  @OneToMany(() => Category, category => category.parent)
  public children: Category[];

  @OneToMany(() => Product, product => product.category)
  public products: Product[];
}
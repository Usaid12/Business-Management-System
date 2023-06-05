import { User } from "@src/entities/user.entity";
import { BaseEntity } from "@src/util/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'products' })
export class Role extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  public name: string;
  
  @Column({ name: 'description', type: 'text' })
  public description: string;
  
  @Column({ name: 'price', type: 'integer' })
  public integer: number;
}
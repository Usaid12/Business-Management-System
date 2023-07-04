import { User } from '@src/entities/user.entity';
import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @OneToMany(() => User, (user) => user.role, { eager: true })
  public users: User[];
}
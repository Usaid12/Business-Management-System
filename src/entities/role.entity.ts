import { ROLE_TABLE } from '@src/constants/db';
import { User } from '@src/entities/user.entity';
import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: ROLE_TABLE })
export class Role extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  public name: string;

  @OneToMany(() => User, (user) => user.role, { eager: true })
  public users: User[];
}
import { Gender } from '@src/constants/enum';
import { BaseEntity } from '@src/util/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Column({ name: 'first_name', type: 'varchar' })
	public firstName: string;

	@Column({ name: 'last_name', type: 'varchar' })
	public lastName: string;

	@Column({ name: 'gender', type: 'varchar', enum: Gender, enumName: 'geneder_enum', default: Gender.MALE })
	public gender: string;

	@Column({ name: 'phone_number', type: 'varchar' })
	public phoneNumber: string;

	@Column({ name: 'email', type: 'varchar' })
	public email: string;

	@Column({ name: 'password', type: 'varchar' })
	public password: string;

	@Column({ name: 'role_id', type: 'integer' })
	public roleId: string;

	@ManyToOne(() => Role, (role: Role) => role.users)
	@JoinColumn({ name: 'role_id', foreignKeyConstraintName: 'user_role_fk' })
	public role: Role;
}

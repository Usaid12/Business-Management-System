import { Gender } from '@src/constants/enum';
import { BaseEntity } from '@src/util/BaseEntity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Business } from './business.entity';
import { ProductReviews } from './product_reviews.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { USER_TABLE } from '@src/constants/db';

@Entity({ name: USER_TABLE })
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
	public roleId: number;

	@ManyToOne(() => Role, (role: Role) => role.users)
	@JoinColumn({ name: 'role_id', foreignKeyConstraintName: 'user_role_fk' })
	public role: Role;

	@OneToMany(() => Business, (business) => business.owner)
	public businesses: Array<Business>;

	@OneToMany(() => ProductReviews, (productReviews) => productReviews.user)
	public productReviews: Array<ProductReviews>;

	@OneToMany(() => Cart, (cart) => cart.user)
	public cartItems: Array<Cart>;

	@OneToMany(() => Order, (order) => order.user)
	public orders: Array<Order>;

}

import { BaseEntity } from '@src/util/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity({ name: 'businesses' })
export class Business extends BaseEntity {
	@Column({ name: 'name', type: 'varchar' })
  public name: string;

	@Column({ name: 'address_line_1', type: 'varchar' })
	public addressLine1: string;

	@Column({ name: 'address_line_2', type: 'varchar', nullable: true })
	public addressLine2: string;

	@Column({ name: 'city', type: 'varchar' })
	public city: string;

	@Column({ name: 'country', type: 'varchar' })
	public country: string;

	@Column({ name: 'email', type: 'varchar' })
	public email: string;

	@Column({ name: 'contact_no', type: 'varchar' })
	public contactNo: string;

	@Column({ name: 'postal_code', type: 'varchar' })
	public postalCode: string;

	@Column({ name: 'owner_id', type: 'integer' })
	public owner_id: number;

	@ManyToOne(() => User, (owner: User) => owner.businesses)
	@JoinColumn({ name: 'owner_id', foreignKeyConstraintName: 'business_owner_fk_id' })
	public owner: User;

	@OneToMany(() => Product, (product) => product.business)
	products: Product[];
}
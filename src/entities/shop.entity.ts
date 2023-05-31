import { BaseEntity } from "@src/util/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'shops' })
export class Shop extends BaseEntity {
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

	@Column({ name: 'owner_id', type: 'integer' })
	public owner_id: number;

	@ManyToOne(() => User, (owner: User) => owner.shops)
	@JoinColumn({ name: 'owner_id', foreignKeyConstraintName: 'shop_owner_fk_id' })
	public owner: User;
}
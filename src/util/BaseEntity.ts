import { CreateDateColumn, DeleteDateColumn, BaseEntity as ORMBaseEntity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity extends ORMBaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  public deletedAt: Date;
}